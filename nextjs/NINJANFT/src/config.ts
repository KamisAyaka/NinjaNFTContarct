import { Network } from '@injectivelabs/networks'

// NFT 项目配置文件 - Injective 网络
// 参考: https://docs.injective.network/developers/network-information

export const config = {
  // 网络配置 - 选择测试网或主网
  network: Network.Testnet, // 或 Network.Mainnet
  
  // NFT 合约配置
  nft: {
    // 你的合约地址 - 部署后需要更新这个地址
    contractAddress: 'inj1...', // 替换为你的 Injective CW721 合约地址
    
    // 合约配置参数
    maxSupply: 100,
    maxPerWallet: 10,
    
    // 代币信息
    name: 'Ninja Labs NFT',
    symbol: 'NINJA',
    description: 'Ninja Labs NFT collection on Injective',
  },
  
  // Injective 链配置 (根据官方文档)
  chain: {
    // 主网 (Mainnet)
    mainnet: {
      chainId: 'injective-1',
      evmChainId: 1776, // EVM Chain ID
      node: 'https://sentry.tm.injective.network:443',
      name: 'Injective Mainnet',
      explorer: 'https://explorer.injective.network',
    },
    // 测试网 (Testnet)
    testnet: {
      chainId: 'injective-888',
      evmChainId: 1439, // EVM Chain ID
      node: 'https://testnet.sentry.tm.injective.network:443',
      name: 'Injective Testnet',
      explorer: 'https://testnet.explorer.injective.network',
    },
    // 开发网 (Devnet)
    devnet: {
      chainId: 'injective-777',
      node: 'https://devnet.sentry.tm.injective.network:443',
      name: 'Injective Devnet',
      explorer: 'https://devnet.explorer.injective.network',
    },
  },
  
  // 应用配置
  app: {
    name: 'Ninja Labs NFT',
    description: 'Ninja Labs NFT Collection on Injective',
    links: {
      twitter: 'https://x.com/ninjalabscn',
      discord: 'https://discord.gg/ninjalabs',
      github: 'https://github.com/Ninja-Labs-CN',
    },
  },
}

export default config

