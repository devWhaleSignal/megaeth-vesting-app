import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

export const megaethTestnet = defineChain({
  id: 6342,
  name: 'MegaETH Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://carrot.megaeth.com/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'MegaETH Explorer', url: 'https://megaexplorer.xyz' },
  },
})

export const config = createConfig({
  chains: [megaethTestnet],
  transports: {
    [megaethTestnet.id]: http(),
  },
})

// Contract address - UPDATE THIS after deployment
export const VESTING_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`
