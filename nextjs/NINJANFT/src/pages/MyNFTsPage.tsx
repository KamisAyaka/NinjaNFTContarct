import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";

interface MyNFTsPageProps {
  address: string;
  isConnected: boolean;
}

function MyNFTsPage({ address, isConnected }: MyNFTsPageProps) {
  const [myNFTs, setMyNFTs] = useState<any[]>([]);

  useEffect(() => {
    if (isConnected && address) {
      // 这里应该调用合约查询用户拥有的NFT
      // 模拟数据
      const mockMyNFTs = [
        {
          id: 1,
          name: "Ninja 1",
          image: "/test.png",
          owner: address,
          level: "white" as const,
        },
        {
          id: 5,
          name: "Ninja 5",
          image: "/test.png",
          owner: address,
          level: "purple" as const,
        },
        {
          id: 8,
          name: "Ninja 8",
          image: "/test.png",
          owner: address,
          level: "orange" as const,
        },
      ];
      setMyNFTs(mockMyNFTs);
    } else {
      setMyNFTs([]);
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="page-wrapper section">
        <div className="container">
          <div className="text-center mb-lg">
            <h1 className="title title-xl mb-md">我的 NFT</h1>
            <p className="text-lg text-secondary">
              请先连接钱包查看您的NFT收藏
            </p>
          </div>
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔌</div>
            <p>未连接钱包</p>
          </div>
        </div>
      </div>
    );
  }

  if (myNFTs.length === 0) {
    return (
      <div className="page-wrapper section">
        <div className="container">
          <div className="text-center mb-lg">
            <h1 className="title title-xl mb-md">我的 NFT</h1>
            <p className="text-base text-secondary font-mono">
              地址: {address.slice(0, 10)}...{address.slice(-8)}
            </p>
          </div>
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
            <p>您还没有任何NFT</p>
            <p className="text-secondary">前往铸造页面获取您的第一个NFT！</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1 className="title title-xl mb-md">我的 NFT</h1>
          <p className="text-base text-secondary font-mono mb-sm">
            地址: {address.slice(0, 10)}...{address.slice(-8)}
          </p>
          <p className="text-lg text-primary font-semibold">
            拥有 {myNFTs.length} 个 NFT
          </p>
        </div>

        <div className="nft-grid">
          {myNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              level={nft.level}
              owner={nft.owner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNFTsPage;
