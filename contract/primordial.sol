// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrimordialMVP {
    // Constants
    uint8 constant GRID_SIZE = 20;
    uint8 constant EMPTY = 0;
    uint8 constant FIRE = 1;
    uint8 constant WATER = 2;
    uint8 constant PLANT = 3;
    
    // State
    uint8[GRID_SIZE][GRID_SIZE] public grid;
    mapping(address => uint8) public playerTeam; // 0=none, 1=Fire, 2=Water, 3=Plant
    mapping(address => uint256) public lastAction;
    uint256 public lastTick;
    uint256 constant TICK_INTERVAL = 60; // 60 seconds
    uint256 constant ACTION_COOLDOWN = 10; // 10 seconds between placements
    
    // Stats
    mapping(uint8 => uint256) public teamCellCount;
    
    event CellPlaced(address player, uint8 x, uint8 y, uint8 team);
    event TickExecuted(uint256 timestamp, uint256 fireCount, uint256 waterCount, uint256 plantCount);
    event TeamJoined(address player, uint8 team);
    
    constructor() {
        lastTick = block.timestamp;
    }
    
    // Join a team (one-time choice)
    function joinTeam(uint8 team) external {
        require(playerTeam[msg.sender] == 0, "Already on team");
        require(team >= 1 && team <= 3, "Invalid team");
        playerTeam[msg.sender] = team;
        emit TeamJoined(msg.sender, team);
    }
    
    // Place a cell
    function placeCell(uint8 x, uint8 y) external {
        require(x < GRID_SIZE && y < GRID_SIZE, "Out of bounds");
        require(playerTeam[msg.sender] > 0, "Not on team");
        require(block.timestamp >= lastAction[msg.sender] + ACTION_COOLDOWN, "Cooldown");
        require(grid[x][y] == EMPTY || grid[x][y] == playerTeam[msg.sender], "Cell occupied");
        
        uint8 team = playerTeam[msg.sender];
        
        // Only increment if placing in empty cell
        if (grid[x][y] == EMPTY) {
            teamCellCount[team]++;
        }
        
        grid[x][y] = team;
        lastAction[msg.sender] = block.timestamp;
        
        emit CellPlaced(msg.sender, x, y, team);
    }
    
    // Execute tick (anyone can call) - FIXED VERSION
    function tick() external {
        require(block.timestamp >= lastTick + TICK_INTERVAL, "Too soon");
        
        // Create temporary grid for next state (fixes simultaneous update bug)
        uint8[GRID_SIZE][GRID_SIZE] memory newGrid;
        
        // Reset counts
        teamCellCount[FIRE] = 0;
        teamCellCount[WATER] = 0;
        teamCellCount[PLANT] = 0;
        
        for (uint8 x = 0; x < GRID_SIZE; x++) {
            for (uint8 y = 0; y < GRID_SIZE; y++) {
                uint8 cell = grid[x][y]; // Read from CURRENT state
                uint8[3] memory neighbors = countNeighbors(x, y);
                
                if (cell == EMPTY) {
                    // Birth rule with tie-breaking
                    uint8 maxCount = 0;
                    uint8 winner = 0;
                    uint8 tieCount = 0;
                    
                    for (uint8 i = 0; i < 3; i++) {
                        if (neighbors[i] > maxCount) {
                            maxCount = neighbors[i];
                            winner = i + 1;
                            tieCount = 1;
                        } else if (neighbors[i] == maxCount && neighbors[i] > 0) {
                            tieCount++;
                        }
                    }
                    
                    // Only birth if one type has clear majority (3+) and no tie
                    if (maxCount >= 3 && tieCount == 1) {
                        newGrid[x][y] = winner;
                    } else {
                        newGrid[x][y] = EMPTY; // Contested or insufficient neighbors
                    }
                } else {
                    // Combat rule: killed by 3+ counters
                    uint8 counter = getCounter(cell);
                    if (neighbors[counter - 1] >= 3) {
                        newGrid[x][y] = counter; // Converted
                    } else {
                        newGrid[x][y] = cell; // Survived
                    }
                }
                
                // Count cells in NEW state
                if (newGrid[x][y] > 0) {
                    teamCellCount[newGrid[x][y]]++;
                }
            }
        }
        
        // Atomic swap to new state
        grid = newGrid;
        lastTick = block.timestamp;
        
        emit TickExecuted(block.timestamp, teamCellCount[FIRE], teamCellCount[WATER], teamCellCount[PLANT]);
    }
    
    // Helper: count neighbors by type
    function countNeighbors(uint8 x, uint8 y) internal view returns (uint8[3] memory) {
        uint8[3] memory counts;
        
        for (int8 dx = -1; dx <= 1; dx++) {
            for (int8 dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue;
                
                int16 nx = int16(int8(x)) + dx;
                int16 ny = int16(int8(y)) + dy;
                
                // Cast GRID_SIZE to int16 via uint16 intermediate
                if (nx >= 0 && nx < int16(uint16(GRID_SIZE)) && ny >= 0 && ny < int16(uint16(GRID_SIZE))) {
                    uint8 neighbor = grid[uint8(int8(nx))][uint8(int8(ny))];
                    if (neighbor > 0) counts[neighbor - 1]++;
                }
            }
        }
        
        return counts;
    }
    
    // Helper: get counter element (Fire > Plant > Water > Fire)
    function getCounter(uint8 element) internal pure returns (uint8) {
        if (element == FIRE) return WATER;
        if (element == WATER) return PLANT;
        if (element == PLANT) return FIRE;
        return 0;
    }
    
    // View: get full grid
    function getGrid() external view returns (uint8[GRID_SIZE][GRID_SIZE] memory) {
        return grid;
    }
    
    // View: get time until next tick is available
    function timeUntilNextTick() external view returns (uint256) {
        uint256 nextTickTime = lastTick + TICK_INTERVAL;
        if (block.timestamp >= nextTickTime) {
            return 0;
        }
        return nextTickTime - block.timestamp;
    }
    
    // View: get player cooldown
    function getPlayerCooldown(address player) external view returns (uint256) {
        uint256 nextActionTime = lastAction[player] + ACTION_COOLDOWN;
        if (block.timestamp >= nextActionTime) {
            return 0;
        }
        return nextActionTime - block.timestamp;
    }
}