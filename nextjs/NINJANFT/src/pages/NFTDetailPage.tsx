import { useParams, Link } from "react-router-dom";

type NFTLevel = "white" | "purple" | "orange";

// 模拟NFT数据（实际应该从合约或API获取）
const mockNFTs = Array.from({ length: 100 }, (_, i) => {
  let level: NFTLevel = "white";
  if (i < 10) level = "orange";
  else if (i < 30) level = "purple";
  else level = "white";

  return {
    id: i + 1,
    name: `Ninja #${i + 1}`,
    image: "/test.png",
    owner: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`,
    level,
    attributes: [
      { trait_type: "Background", value: level },
      { trait_type: "Type", value: "Cyber Ninja" },
      {
        trait_type: "Rarity",
        value:
          level === "orange"
            ? "Legendary"
            : level === "purple"
            ? "Rare"
            : "Common",
      },
    ],
  };
});

function NFTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nft = mockNFTs.find((n) => n.id === Number(id));

  if (!nft) {
    return (
      <div className="page-wrapper section">
        <div className="container text-center">
          <h1 className="title title-xl mb-md">NFT Not Found</h1>
          <Link to="/gallery" className="btn btn-primary">
            返回画廊
          </Link>
        </div>
      </div>
    );
  }

  const getLevelLabel = (level: NFTLevel) => {
    switch (level) {
      case "orange":
        return "顶级贡献者";
      case "purple":
        return "资深贡献者";
      case "white":
        return "普通贡献者";
    }
  };

  return (
    <div className="page-wrapper section">
      <div className="container">
        {/* 返回按钮 */}
        <div className="mb-lg">
          <Link
            to="/gallery"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: "600",
            }}
          >
            ← 返回画廊
          </Link>
        </div>

        {/* 主要内容 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* 左侧：NFT图片 */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              className="card"
              style={{
                padding: "0",
                aspectRatio: "1",
                overflow: "hidden",
              }}
            >
              <img
                src={nft.image}
                alt={nft.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* 右侧：NFT信息 */}
          <div className="flex-col gap-lg">
            {/* 标题 */}
            <div
              style={{
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "24px",
              }}
            >
              <h1 className="title title-xl mb-sm">{nft.name}</h1>
              <p className="text-lg text-tertiary font-mono">#{nft.id}</p>
            </div>

            {/* 等级徽章 */}
            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <span
                className="card"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background:
                    nft.level === "orange"
                      ? "#fed7aa"
                      : nft.level === "purple"
                      ? "#ddd6fe"
                      : "#f3f4f6",
                  color:
                    nft.level === "orange"
                      ? "#c2410c"
                      : nft.level === "purple"
                      ? "#6d28d9"
                      : "var(--text-primary)",
                  border: "none",
                }}
              >
                {getLevelLabel(nft.level)}
              </span>
            </div>

            {/* 持有者信息 */}
            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <h3
                className="text-sm font-bold text-primary mb-md"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Owned by
              </h3>
              <p className="text-base text-secondary font-mono">{nft.owner}</p>
            </div>

            {/* 属性 */}
            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <h3
                className="text-sm font-bold text-primary mb-md"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Attributes
              </h3>
              <div
                className="grid-auto gap-sm"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
              >
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="card text-center p-md">
                    <p
                      className="text-xs text-tertiary mb-xs"
                      style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {attr.trait_type}
                    </p>
                    <p className="text-base font-semibold text-primary">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 描述 */}
            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <h3
                className="text-sm font-bold text-primary mb-md"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Description
              </h3>
              <p
                className="text-base text-secondary"
                style={{ lineHeight: "1.7" }}
              >
                这是 Ninja Labs NFT 系列中的第 {nft.id} 号作品。每个 Ninja
                都是独特的像素艺术作品， 代表着社区成员在 Injective
                生态中的贡献等级。
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="mt-md">
              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
              >
                查看在区块链上
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTDetailPage;
