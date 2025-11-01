import { createPublicClient, http } from 'viem'
import CONTRACT_ABI from './lib/abi.json' assert { type: 'json' }

// Monad Testnet configuration
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
  },
}

const CONTRACT_ADDRESS = '0xeA7A96e1a4c58Ff73a80b3a1603ec6290ee31bbf'

// Create clients
const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
})

async function testContract() {
  try {
    console.log('🔍 Testing contract at:', CONTRACT_ADDRESS)
    console.log('🌐 Network:', monadTestnet.name)
    
    // Test 1: Check if contract exists
    const code = await publicClient.getBytecode({
      address: CONTRACT_ADDRESS,
    })
    
    if (!code || code === '0x') {
      console.log('❌ Contract not found at address!')
      return
    }
    
    console.log('✅ Contract exists')
    
    // Test 2: Read contract state
    console.log('\n📊 Reading contract state...')
    
    const lastTick = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'lastTick',
    })
    
    const timeUntilNextTick = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'timeUntilNextTick',
    })
    
    const fireCount = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'teamCellCount',
      args: [1],
    })
    
    console.log('Last tick:', Number(lastTick))
    console.log('Current timestamp:', Math.floor(Date.now() / 1000))
    console.log('Time until next tick:', Number(timeUntilNextTick), 'seconds')
    console.log('Fire cells:', Number(fireCount))
    
    // Test 3: Check if tick can be called
    const canTick = Number(timeUntilNextTick) === 0
    console.log('Can call tick?', canTick ? '✅ YES' : '❌ NO')
    
    if (canTick) {
      console.log('\n⚡ Attempting to simulate tick call...')
      
      // Simulate the call (won't actually execute)
      try {
        const result = await publicClient.simulateContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'tick',
        })
        console.log('✅ Tick simulation successful!')
        console.log('Gas estimate:', result.request.gas?.toString())
      } catch (error) {
        console.log('❌ Tick simulation failed:', error.message)
        
        // Check specific revert reasons
        if (error.message.includes('Too soon')) {
          console.log('💡 Reason: Tick cooldown not expired')
        } else if (error.message.includes('gas')) {
          console.log('💡 Reason: Gas estimation failed')
        }
      }
    }
    
    // Test 4: Get grid state
    console.log('\n🎮 Reading grid state...')
    try {
      const grid = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getGrid',
      })
      
      // Count non-empty cells
      let totalCells = 0
      for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
          if (Number(grid[x][y]) > 0) {
            totalCells++
          }
        }
      }
      
      console.log('Total cells on grid:', totalCells)
    } catch (error) {
      console.log('❌ Failed to read grid:', error.message)
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message)
    console.log('Full error:', error)
  }
}

testContract()