// NFT 项目配置文件
export const config = {
  // 网络类型：'local' | 'testnet' | 'mainnet'
  networkType: "local" as "local" | "testnet" | "mainnet",

  // 本地测试链配置
  localChain: {
    enabled: true, // 启用本地测试链
    rpcUrl: "http://localhost:8545",
    chainId: 31337, // Anvil 默认 chainId
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // 部署的合约地址
  },

  // NFT 合约配置
  nft: {
    // 你的合约地址 - 部署后需要更新这个地址
    contractAddress: "inj1...", // Injective CW721 合约地址（如果使用 Injective）

    // 合约配置参数
    maxSupply: 10000,
    maxPerWallet: 10,

    // 代币信息
    name: "Ninja NFT",
    symbol: "NINJA",
    description: "Ninja NFT collection",
  },

  // Injective 链配置 (根据官方文档)
  chain: {
    // 主网 (Mainnet)
    mainnet: {
      chainId: "injective-1",
      evmChainId: 1776, // EVM Chain ID
      node: "https://sentry.tm.injective.network:443",
      name: "Injective Mainnet",
      explorer: "https://explorer.injective.network",
    },
    // 测试网 (Testnet)
    testnet: {
      chainId: "injective-888",
      evmChainId: 1439, // EVM Chain ID
      node: "https://testnet.sentry.tm.injective.network:443",
      name: "Injective Testnet",
      explorer: "https://testnet.explorer.injective.network",
    },
    // 开发网 (Devnet)
    devnet: {
      chainId: "injective-777",
      node: "https://devnet.sentry.tm.injective.network:443",
      name: "Injective Devnet",
      explorer: "https://devnet.explorer.injective.network",
    },
  },

  // 应用配置
  app: {
    name: "Ninja Labs NFT",
    description: "Ninja Labs NFT Collection on Injective",
    links: {
      twitter: "https://x.com/ninjalabscn",
      discord: "https://discord.gg/ninjalabs",
      github: "https://github.com/Ninja-Labs-CN",
    },
  },
};

export default config;
