import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import { evmContractService } from "../utils/evmContract";

interface MyNFTsPageProps {
  address: string;
  isConnected: boolean;
}

function MyNFTsPage({ address, isConnected }: MyNFTsPageProps) {
  const [myNFTs, setMyNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMyNFTs = async () => {
      if (isConnected && address) {
        try {
          setLoading(true);
          console.log("🔍 开始加载用户的 NFT...");

          // 初始化合约服务
          await evmContractService.init();

          // 查询用户拥有的所有 NFT token IDs
          const tokenIds = await evmContractService.getUserNFTs(address);

          console.log(`✅ 找到 ${tokenIds.length} 个 NFT`);

          if (tokenIds.length === 0) {
            setMyNFTs([]);
            setLoading(false);
            return;
          }

          // 为每个 token ID 获取详细信息
          const nftDetails = await Promise.all(
            tokenIds.map(async (tokenId) => {
              try {
                // 获取 token URI
                const tokenURI = await evmContractService.getTokenURI(tokenId);

                // 解析 metadata (这里假设 URI 返回的是 JSON)
                // 如果 URI 是完整的 URL，可能需要 fetch
                let metadata = {
                  name: `Ninja #${tokenId}`,
                  image: "/test.png",
                  level: "white" as const,
                };

                // 如果有实际的 tokenURI，可以尝试获取 metadata
                if (tokenURI && tokenURI !== "") {
                  try {
                    // 这里可以添加从 IPFS 或其他地方获取 metadata 的逻辑
                    // const response = await fetch(tokenURI);
                    // metadata = await response.json();
                    console.log(`Token #${tokenId} URI:`, tokenURI);
                  } catch (error) {
                    console.error(
                      `获取 token #${tokenId} metadata 失败:`,
                      error
                    );
                  }
                }

                return {
                  id: tokenId,
                  name: metadata.name,
                  image: metadata.image,
                  owner: address,
                  level: metadata.level,
                };
              } catch (error) {
                console.error(`处理 token #${tokenId} 失败:`, error);
                return null;
              }
            })
          );

          // 过滤掉 null 值
          const validNFTs = nftDetails.filter((nft) => nft !== null);
          setMyNFTs(validNFTs);
        } catch (error) {
          console.error("加载用户 NFT 失败:", error);
          setMyNFTs([]);
        } finally {
          setLoading(false);
        }
      } else {
        setMyNFTs([]);
      }
    };

    loadMyNFTs();
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

  if (loading) {
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
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>⏳</div>
            <p>加载中...</p>
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
