import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { WalletStrategy } from "@injectivelabs/wallet-strategy";
import { Wallet } from "@injectivelabs/wallet-base";
import { ChainId, EvmChainId } from "@injectivelabs/ts-types";

export type WalletType = "metamask" | "keplr" | null;

interface InjectiveWalletContextType {
  wallet: WalletType;
  address: string;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: (walletType: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  walletStrategy: WalletStrategy | null;
}

const InjectiveWalletContext = createContext<
  InjectiveWalletContextType | undefined
>(undefined);

export function InjectiveWalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletType>(null);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletStrategy, setWalletStrategy] = useState<WalletStrategy | null>(
    null
  );

  // 初始化 Wallet Strategy
  useEffect(() => {
    const strategy = new WalletStrategy({
      chainId: ChainId.Testnet, // 使用测试网，如需主网改为 ChainId.Mainnet
      strategies: {}, // 空对象，策略会在 setWallet 时按需创建
      // EVM 选项 - 支持 MetaMask 等 EVM 钱包
      evmOptions: {
        evmChainId: EvmChainId.Sepolia, // 测试网使用 Sepolia
        // 如果使用主网，改为 EvmChainId.Mainnet
      },
    });

    setWalletStrategy(strategy);
  }, []);

  const connectWallet = useCallback(
    async (walletType: WalletType) => {
      if (!walletType || !walletStrategy) {
        console.error("❌ 钱包类型无效或 WalletStrategy 未初始化");
        return;
      }

      setIsConnecting(true);

      try {
        let selectedWallet: Wallet;

        // 根据选择的钱包类型设置
        if (walletType === "metamask") {
          selectedWallet = Wallet.Metamask;
        } else if (walletType === "keplr") {
          selectedWallet = Wallet.Keplr;
        } else {
          throw new Error("不支持的钱包类型");
        }

        console.log(`🔄 正在连接到 ${walletType}...`);

        // 设置钱包类型
        walletStrategy.setWallet(selectedWallet);

        // 启用钱包并获取地址 - 这会触发钱包授权弹窗
        const addresses = await walletStrategy.enableAndGetAddresses();

        if (addresses && addresses.length > 0) {
          const walletAddress = addresses[0];
          setAddress(walletAddress);
          setWallet(walletType);
          setIsConnected(true);
          console.log(`✅ 已成功连接到 ${walletType}`);
          console.log(`📍 钱包地址: ${walletAddress}`);

          // 监听账户变化
          walletStrategy.onAccountChange((accounts) => {
            console.log("🔄 账户已更改:", accounts);
            if (Array.isArray(accounts) && accounts.length > 0) {
              setAddress(accounts[0]);
            } else if (typeof accounts === "string") {
              setAddress(accounts);
            }
          });

          // 监听链 ID 变化
          walletStrategy.onChainIdChange(() => {
            console.log("🔄 链 ID 已更改，请重新连接钱包");
            // 可以选择自动断开连接或提示用户
          });
        } else {
          throw new Error("未获取到钱包地址");
        }
      } catch (error: any) {
        console.error("❌ 连接钱包失败:", error);

        // 友好的错误提示
        let errorMessage = "连接失败: 未知错误";

        if (
          error.message?.includes("User rejected") ||
          error.message?.includes("user rejected") ||
          error.message?.includes("User denied")
        ) {
          errorMessage = "您取消了钱包连接请求";
        } else if (
          error.message?.includes("not installed") ||
          error.message?.includes("not available")
        ) {
          const walletName = walletType === "metamask" ? "MetaMask" : "Keplr";
          errorMessage = `请先安装 ${walletName} 钱包插件`;
        } else if (error.message?.includes("not enabled")) {
          errorMessage = "钱包未启用，请检查钱包设置";
        } else if (error.message) {
          errorMessage = `连接失败: ${error.message}`;
        }

        alert(errorMessage);

        // 连接失败时重置状态
        setWallet(null);
        setAddress("");
        setIsConnected(false);
      } finally {
        setIsConnecting(false);
      }
    },
    [walletStrategy]
  );

  const disconnectWallet = useCallback(async () => {
    try {
      if (walletStrategy) {
        // 断开钱包连接
        await walletStrategy.disconnect();
      }

      setWallet(null);
      setAddress("");
      setIsConnected(false);

      console.log("✅ 已断开钱包连接");
    } catch (error) {
      console.error("❌ 断开连接时出错:", error);
      // 即使出错也重置状态
      setWallet(null);
      setAddress("");
      setIsConnected(false);
    }
  }, [walletStrategy]);

  return (
    <InjectiveWalletContext.Provider
      value={{
        wallet,
        address,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        walletStrategy,
      }}
    >
      {children}
    </InjectiveWalletContext.Provider>
  );
}

export function useInjectiveWallet() {
  const context = useContext(InjectiveWalletContext);
  if (context === undefined) {
    throw new Error(
      "useInjectiveWallet must be used within InjectiveWalletProvider"
    );
  }
  return context;
}

// 全局类型声明
declare global {
  interface Window {
    ethereum?: any;
    keplr?: any;
    leap?: any;
    Buffer?: typeof Buffer;
  }
}
