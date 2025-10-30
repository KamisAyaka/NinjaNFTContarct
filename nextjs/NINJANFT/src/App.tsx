import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useInjectiveWallet } from "./hooks/useInjectiveWallet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WalletModal from "./components/WalletModal";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import MyNFTsPage from "./pages/MyNFTsPage";
import MintPage from "./pages/MintPage";
import NFTDetailPage from "./pages/NFTDetailPage";

function App() {
  const { address, isConnected } = useInjectiveWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Mint NFT 函数
  const handleMint = async () => {
    if (!isConnected || !address) {
      alert("请先连接钱包");
      return;
    }

    try {
      // 这里添加实际的 Injective 合约 mint 逻辑
      console.log("Minting NFT for address:", address);
      // TODO: 调用 Injective 智能合约的 mint 函数
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("NFT 铸造成功！");
    } catch (error) {
      console.error("铸造失败:", error);
      alert("铸造失败: " + (error as Error).message);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <WalletModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
        />

        <Header onOpenWalletModal={() => setShowWalletModal(true)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/nft/:id" element={<NFTDetailPage />} />
            <Route
              path="/my-nfts"
              element={
                <MyNFTsPage address={address} isConnected={isConnected} />
              }
            />
            <Route
              path="/mint"
              element={
                <MintPage
                  isConnected={isConnected}
                  address={address}
                  onMint={handleMint}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
