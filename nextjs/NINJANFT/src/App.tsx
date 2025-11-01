import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAccount } from "wagmi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import MyNFTsPage from "./pages/MyNFTsPage";
import MintPage from "./pages/MintPage";
import NFTDetailPage from "./pages/NFTDetailPage";
import { evmContractService } from "./utils/evmContract";

function App() {
  const { address, isConnected } = useAccount();
  const addressString = address || "";

  // Mint NFT 函数
  const handleMint = async (quantity: number) => {
    if (!isConnected || !address) {
      throw new Error("请先连接钱包");
    }

    console.log(`🔄 Minting ${quantity} NFT(s) for address:`, address);
    
    // 调用合约 mint 函数（内部会自动初始化）
    const receipt = await evmContractService.mint(quantity);
    
    console.log("✅ Mint 成功:", receipt);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/nft/:id" element={<NFTDetailPage />} />
            <Route
              path="/my-nfts"
              element={
                <MyNFTsPage address={addressString} isConnected={isConnected} />
              }
            />
            <Route
              path="/mint"
              element={
                <MintPage
                  isConnected={isConnected}
                  address={addressString}
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
