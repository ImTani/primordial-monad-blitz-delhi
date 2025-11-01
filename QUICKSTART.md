# 🚀 Quick Start Guide

## Setup Complete! ✅

Your Primordial MVP frontend is now configured and ready to run.

**Contract Address**: `0xeA7A96e1a4c58Ff73a80b3a1603ec6290ee31bbf`
**Network**: Monad Testnet (Chain ID: 41454)

## Running the App

```bash
cd frontend
pnpm dev
```

Then open http://localhost:3000

## MetaMask Setup

### Add Monad Testnet to MetaMask

1. Open MetaMask
2. Click the network dropdown
3. Click "Add Network" → "Add network manually"
4. Enter these details:

```
Network Name:    Monad Testnet
RPC URL:         https://testnet-rpc.monad.xyz
Chain ID:        41454
Currency Symbol: MON
Block Explorer:  https://testnet.monadexplorer.com
```

5. Click "Save"

### Get Testnet Tokens

Visit the Monad testnet faucet to get test tokens for transactions.

## Testing the Game

### Step 1: Connect Wallet
- Click "Connect MetaMask"
- Approve the connection
- Make sure you're on Monad Testnet

### Step 2: Join a Team
- Choose Fire 🔥, Water 💧, or Plant 🌱
- Approve the transaction
- Wait for confirmation

### Step 3: Place Cells
- Click any empty cell on the grid
- Approve the transaction
- Wait 10 seconds for cooldown

### Step 4: Execute Tick
- Wait 60 seconds
- Click "Execute Tick"
- Watch the cellular automaton evolve!

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx          # Main game UI
│   ├── layout.tsx        # Root layout
│   ├── providers.tsx     # Wagmi + React Query
│   └── globals.css       # Global styles
├── components/
│   ├── Grid.tsx          # Interactive game grid
│   ├── TeamSelection.tsx # Team picker
│   ├── GameControls.tsx  # Stats & controls
│   └── WalletConnect.tsx # Wallet UI
├── hooks/
│   └── useGameState.ts   # Contract integration
└── lib/
    ├── wagmi.ts          # Wagmi config
    └── contract.ts       # Contract constants
```

## Troubleshooting

### "Cannot find module" errors
```bash
pnpm install
```

### TypeScript errors
All TypeScript errors have been resolved. If you see any:
```bash
# Clear .next cache
rm -rf .next
pnpm dev
```

### Wallet won't connect
- Make sure MetaMask is installed
- Check you're on Monad Testnet
- Try refreshing the page

### Transactions failing
- Make sure you have testnet tokens
- Check MetaMask is on the right network
- Verify contract address is correct

## Next Steps

### For Development
- Customize colors in `lib/contract.ts`
- Modify UI in `components/`
- Add new features in `hooks/useGameState.ts`

### For Deployment
```bash
# Build
pnpm build

# Deploy to Vercel
vercel --prod
```

## Game Rules

### Element Combat
- 🔥 Fire > 🌱 Plant
- 💧 Water > 🔥 Fire  
- 🌱 Plant > 💧 Water

### Cellular Automaton
- **Birth**: 3+ neighbors → new cell spawns
- **Combat**: 3+ counters → cell converts
- **Survival**: Otherwise → cell lives

### Cooldowns
- **Place Cell**: 10 seconds
- **Execute Tick**: 60 seconds

## Have Fun! 🎮

You're all set to play Primordial MVP. May the best element win! 🔥💧🌱
