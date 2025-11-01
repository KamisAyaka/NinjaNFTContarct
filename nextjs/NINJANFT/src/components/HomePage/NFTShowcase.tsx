import { Link } from "react-router-dom";
import { useMemo } from "react";

type NFTLevel = "white" | "purple";

interface NFT {
  id: number;
  name: string;
  level: NFTLevel;
}

interface NFTShowcaseProps {
  count?: number;
  totalNFTs?: number;
}

function NFTShowcase({ count = 30, totalNFTs = 100 }: NFTShowcaseProps) {
  // 生成所有可能的 NFT
  const allNFTs: NFT[] = useMemo(() => {
    return Array.from({ length: totalNFTs }, (_, i) => {
      let level: NFTLevel = "white";
      if (i < Math.floor(totalNFTs * 0.3)) level = "purple";
      else level = "white";

      return {
        id: i + 1,
        name: `Ninja #${i + 1}`,
        level,
      };
    });
  }, [totalNFTs]);

  // 随机选择指定数量的 NFT
  const showcaseNFTs: NFT[] = useMemo(() => {
    const shuffled = [...allNFTs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [allNFTs, count]);

  return (
    <div className="nft-showcase">
      <div className="nft-showcase-header">
        <h2 className="title title-lg text-center mb-md">All Ninja NFTs</h2>
        <Link to="/gallery" className="btn btn-outline btn-sm">
          See all NFTs →
        </Link>
      </div>
      <div className="nft-showcase-grid">
        {showcaseNFTs.map((nft) => (
          <Link
            key={nft.id}
            to={`/nft/${nft.id}`}
            className={`nft-showcase-item level-${nft.level}`}
            title={nft.name}
          >
            <img src="/test.png" alt={nft.name} />
            <span className="nft-showcase-id">#{nft.id}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NFTShowcase;

