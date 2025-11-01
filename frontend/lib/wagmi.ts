import { http, createConfig } from 'wagmi'
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors'

// Monad Testnet configuration
export const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
} as const

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected(), // Any injected wallet (MetaMask, Rabby, etc.)
    metaMask(),
    coinbaseWallet({
      appName: 'Primordial MVP',
    }),
  ],
  transports: {
    [monadTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
