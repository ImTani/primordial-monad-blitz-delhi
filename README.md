# 🔥 PRIMORDIAL - Cellular Automaton Battle Arena

**A strategic multiplayer game built on Monad where players compete through cellular automaton warfare**

## 🏆 Hackathon Submission - Monad Blitz Delhi

**Team:** Tani / Primordial
**Category:** DeFi/Gaming  
**Chain:** Monad Testnet  

---

## 🎯 Project Overview

Primordial is an innovative on-chain strategy game that combines:
- **Cellular Automaton Rules** inspired by Conway's Game of Life
- **Rock-Paper-Scissors Combat** (Fire burns Plant, Water quenches Fire, Plant absorbs Water)
- **Strategic Territory Control** on a 20x20 grid
- **Real-time Blockchain Gaming** with optimized RPC management

### 🎮 Core Gameplay

1. **Choose Your Element:** Join Team Fire 🔥, Water 💧, or Plant 🌱
2. **Place Cells:** Strategic placement with 10-second cooldowns
3. **Execute Ticks:** Community-driven evolution every 60 seconds
4. **Watch Evolution:** Cells spawn, fight, and spread according to automaton rules

---

## 🔧 Technical Architecture

### Smart Contract (`primordial.sol`)
- **Language:** Solidity ^0.8.0
- **Network:** Monad Testnet (Chain ID: 10143)
- **Contract:** `0xeA7A96e1a4c58Ff73a80b3a1603ec6290ee31bbf`

**Key Features:**
- Fixed cellular automaton with simultaneous updates
- Gas-optimized 20x20 grid operations
- Role-based permissions (any player can execute ticks)
- Real-time cooldown management

### Frontend (`Next.js 14 + TypeScript`)
- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS with retro gaming aesthetics
- **Web3:** Wagmi + Viem for blockchain interactions
- **Optimization:** Intelligent RPC polling (reduced from 200+ to ~30 calls/minute)

**Performance Optimizations:**
- Adaptive polling intervals based on data criticality
- Automatic refresh after transactions
- Minimized redundant RPC calls
- Responsive design for mobile/desktop

---

## 🎲 Game Rules & Mechanics

### Cellular Automaton Rules

**Birth Rule:**
- Empty cells spawn if they have **3+ neighbors of the same type**
- Must have clear majority (no ties)

**Combat Rule:**  
- Cells are converted if surrounded by **3+ counter-element neighbors**
- Fire → Water, Water → Plant, Plant → Fire

**Survival:**
- Cells survive if they don't meet combat conditions

### Strategic Elements

- **Cooldowns:** 10-second placement, 60-second tick intervals
- **Territory Control:** Team with most cells wins territory
- **Cluster Strategy:** Dense formations enable growth
- **Counter-Play:** Strategic placement to disrupt enemy clusters

---

## 🚀 Innovation & Technical Achievements

### 1. **On-Chain Cellular Automaton**
- First implementation of Conway-style rules on Monad
- Fixed simultaneous update bug with atomic grid swapping
- Optimized neighbor counting for gas efficiency

### 2. **RPC Optimization**
- Identified and solved 200+ RPC calls/second issue
- Implemented intelligent polling with stale time management
- 90%+ reduction in network calls while maintaining responsiveness

### 3. **Real-Time Gaming UX**
- Seamless wallet integration with network auto-switching
- Live cooldown timers and transaction feedback
- Mobile-responsive retro gaming interface

### 4. **Community-Driven Mechanics**
- Any player can execute ticks (decentralized game progression)
- Transparent on-chain state with verifiable rules
- Strategic depth through cellular automaton emergence

---

## 🎨 User Experience

### Onboarding Flow
1. **Connect Wallet** - Auto-detects and switches to Monad Testnet
2. **Choose Team** - One-time team selection with visual feedback  
3. **Strategic Play** - Intuitive grid interface with hover previews
4. **Watch Evolution** - Real-time updates as the cellular world evolves

### Visual Design
- **Retro Gaming Theme** with scanline effects and pixel borders
- **Team Colors** with emoji representations (🔥💧🌱)
- **Responsive Layout** optimized for both desktop and mobile
- **Loading States** with transaction progress indicators

### Accessibility
- Clear visual feedback for all game states
- Cooldown timers and restriction explanations  
- Network status indicators
- Error handling with user-friendly messages

---

## 🎯 Demo & Testing

### Live Demo
[🎮 Play Primordial](https://primordial-blitz.vercel.app)

### Test Scenarios

1. **Connect Wallet** - Use MetaMask with Monad Testnet
2. **Join Team Fire** - Experience team selection flow
3. **Place Strategic Cells** - Create 3+ cell clusters for growth
4. **Execute Tick** - Watch cellular automaton evolution
5. **Observe Growth** - See new cells spawn from clusters

### Contract Verification
- Contract Address: `0xeA7A96e1a4c58Ff73a80b3a1603ec6290ee31bbf`
- Source Code: Available in `/contract/primordial.sol`
- ABI: Available in `/frontend/lib/abi.json`

---

## 🎖 Hackathon Achievements

### Technical Innovation
- ✅ **Novel Game Mechanics** - First cellular automaton battle arena on Monad
- ✅ **Performance Optimization** - 90% reduction in RPC calls
- ✅ **Gas Efficiency** - Optimized grid operations for cost-effective gameplay
- ✅ **Real-Time UX** - Seamless blockchain gaming experience

### Code Quality
- ✅ **TypeScript** - Type-safe frontend development
- ✅ **Solidity Best Practices** - Secure smart contract patterns
- ✅ **Responsive Design** - Mobile-first responsive interface  
- ✅ **Error Handling** - Comprehensive error states and recovery

### User Experience
- ✅ **Intuitive Onboarding** - Smooth wallet connection flow
- ✅ **Visual Feedback** - Clear game state communication
- ✅ **Strategic Depth** - Emergent gameplay through cellular rules
- ✅ **Community Engagement** - Decentralized tick execution

---

## 🔮 Future Roadmap

### Phase 1: Enhanced Gameplay
- Multiple grid sizes and game modes
- Tournament system with prize pools
- Player statistics and leaderboards

### Phase 2: Advanced Features  
- NFT integration for unique cell types
- Cross-chain expansion beyond Monad
- AI opponents and training modes

### Phase 3: Ecosystem Growth
- Developer SDK for custom automaton rules
- Community-created game modes
- Integration with DeFi protocols

---

## 📞 Contact & Resources

**Developer:** ImTani  
**GitHub:** [primordial-monad-blitz-delhi](https://github.com/ImTani/primordial-monad-blitz-delhi)  
**Demo:** [Live Application](https://primordial-blitz.vercel.app)  

### Resources
- [Smart Contract Code](/contract/primordial.sol)
- [Frontend Code](/frontend)

---

**Built with ❤️ for Monad Blitz Delhi Hackathon**

*Primordial: Where strategy meets cellular evolution on the blockchain*