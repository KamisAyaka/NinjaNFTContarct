import { useState } from "react";
import NFTPreview from "../components/MintPage/NFTPreview";
import StatsGrid from "../components/MintPage/StatsGrid";
import MintSection from "../components/MintPage/MintSection";
import Message from "../components/MintPage/Message";

interface MintPageProps {
  isConnected: boolean;
  address: string;
  onMint: () => Promise<void>;
}

function MintPage({ isConnected, address, onMint }: MintPageProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalMinted, setTotalMinted] = useState(0);
  const [userMinted, setUserMinted] = useState(0);
  const maxSupply = 10000;
  const maxPerWallet = 10;

  const handleMint = async (quantity: number) => {
    if (!isConnected) {
      setMessage("请先连接钱包");
      return;
    }

    // 打印当前连接的地址（用于调试）
    console.log("Minting from address:", address);

    if (quantity < 1 || quantity > maxPerWallet) {
      setMessage(`请输入1到${maxPerWallet}之间的数量`);
      return;
    }

    if (userMinted + quantity > maxPerWallet) {
      setMessage(`超出每个钱包的铸造限制(${maxPerWallet}个)`);
      return;
    }

    try {
      setLoading(true);
      setMessage("正在铸造NFT...");

      await onMint();

      setUserMinted(userMinted + quantity);
      setTotalMinted(totalMinted + quantity);
      setMessage(`成功铸造 ${quantity} 个 NFT!`);
    } catch (error) {
      console.error("铸造失败:", error);
      setMessage("铸造失败: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper section">
      <div className="container-md">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: "100px" }}>
            <NFTPreview />
          </div>

          <div className="flex-col gap-lg">
            <div className="mb-md">
              <h1 className="title title-xl mb-md">Mint Your Ninja</h1>
              <p
                className="text-lg text-secondary"
                style={{ lineHeight: "1.7" }}
              >
                铸造你的专属忍者 NFT，成为 Ninja Labs 社区的一员。
                <br />
                每个钱包最多可铸造 {maxPerWallet} 个。
              </p>
            </div>

            <StatsGrid
              totalMinted={totalMinted}
              maxSupply={maxSupply}
              userMinted={userMinted}
              maxPerWallet={maxPerWallet}
            />

            <MintSection
              isConnected={isConnected}
              loading={loading}
              maxPerWallet={maxPerWallet}
              onMint={handleMint}
            />

            {message && <Message message={message} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintPage;
