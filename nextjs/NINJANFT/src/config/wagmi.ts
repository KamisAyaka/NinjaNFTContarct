import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { defineChain } from "viem";
import config from "../config";

// 定义本地链
export const localhost = defineChain({
  id: config.localChain.chainId,
  name: "Localhost 8545",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [config.localChain.rpcUrl],
    },
  },
});

// 定义 Injective EVM 测试网
export const injectiveTestnet = defineChain({
  id: 1439,
  name: "Injective EVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Injective",
    symbol: "INJ",
  },
  rpcUrls: {
    default: {
      http: ["https://k8s.testnet.json-rpc.injective.network/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Injective Explorer",
      url: "https://testnet.blockscout.injective.network",
    },
  },
});

// 定义 Injective EVM 主网
export const injectiveMainnet = defineChain({
  id: 1776,
  name: "Injective EVM",
  nativeCurrency: {
    decimals: 18,
    name: "Injective",
    symbol: "INJ",
  },
  rpcUrls: {
    default: {
      http: ["https://k8s.mainnet.json-rpc.injective.network/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Injective Explorer",
      url: "https://blockscout.injective.network",
    },
  },
});

// 根据配置选择链
const chains = config.localChain.enabled
  ? ([localhost] as const)
  : ([injectiveTestnet, injectiveMainnet] as const);

// 创建 wagmi 配置
export const wagmiConfig = getDefaultConfig({
  appName: "Ninja NFT",
  projectId: "3a8170812b534d0ff9d794f19a901d64", // 需要从 https://cloud.walletconnect.com/ 获取
  chains: chains as any, // RainbowKit 类型要求，实际运行时是正确的
  ssr: false, // 如果是 Next.js SSR，设置为 true
  transports: config.localChain.enabled
    ? {
        [localhost.id]: http(),
      }
    : {
        [injectiveTestnet.id]: http(),
        [injectiveMainnet.id]: http(),
      },
});
