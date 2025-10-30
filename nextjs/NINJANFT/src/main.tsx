import { Buffer } from "buffer";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import App from "./App.tsx";
import { InjectiveWalletProvider } from "./hooks/useInjectiveWallet";

// 添加 Buffer 到全局对象（Injective 钱包需要）
if (!window.Buffer) {
  window.Buffer = Buffer;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InjectiveWalletProvider>
      <App />
    </InjectiveWalletProvider>
  </StrictMode>
);
