import { Link } from "react-router-dom";
import NFTShowcase from "../components/HomePage/NFTShowcase";
import FAQ from "../components/HomePage/FAQ";

function HomePage() {
  return (
    <div className="page-wrapper">
      {/* 英雄区域 */}
      <div
        className="section"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <div className="container" style={{ maxWidth: "1400px" }}>
          <h1
            className="title"
            style={{
              fontSize: "3rem",
              textAlign: "center",
              marginBottom: "48px",
              fontWeight: "700",
            }}
          >
            Ninja Labs NFT
          </h1>

          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* 嵌入式图片 */}
            <img
              src="/cover.png"
              alt="Ninja Labs Cover"
              style={{
                float: "right",
                width: "45%",
                height: "auto",
                marginLeft: "40px",
                marginBottom: "40px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
              className="hero-float-image"
            />

            <p
              className="text-lg text-primary"
              style={{ lineHeight: "1.8", marginBottom: "32px" }}
            >
              100 个独特的像素赛博朋克忍者肖像，灵感源于现代街头文化与 Web3
              开发者社区。
            </p>

            <p
              className="text-base text-secondary"
              style={{ lineHeight: "1.8", marginBottom: "32px" }}
            >
              于 2025 年在 Injective 区块链上发布，Ninja Labs NFT
              旨在构建一个专属的开发者社区身份系统。这是一个大规模的生成艺术作品，一种全新的数字所有权模式，以及一个内置的社区贡献激励系统。
            </p>

            <p
              className="text-base text-secondary"
              style={{ lineHeight: "1.8", marginBottom: "32px" }}
            >
              每个 Ninja
              都是从不同的特征（发型、配饰、面部细节）中通过算法生成的，分为两个等级：70
              个白色背景（普通贡献者）和 30 个紫色背景（资深贡献者）。没有两个是相同的。
            </p>

            <p
              className="text-base text-secondary"
              style={{ lineHeight: "1.8", marginBottom: "32px" }}
            >
              不同于传统的静态 NFT，Ninja Labs
              采用动态升级机制。通过参与社区活动、贡献代码、分享知识等方式积累积分，你的
              NFT
              会随着贡献度提升而升级，实现真正的"进化"，增强持有者与社区的情感连接。
            </p>

            <p
              className="text-lg text-primary"
              style={{ lineHeight: "1.8", marginBottom: "48px" }}
            >
              探索画廊以查看所有 NFT，或立即铸造您自己的 Ninja。
            </p>

            <div className="flex gap-md flex-wrap" style={{ clear: "both" }}>
              <Link to="/mint" className="btn btn-primary btn-lg">
                立即铸造
              </Link>
              <Link to="/gallery" className="btn btn-secondary btn-lg">
                查看画廊
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div
        className="section"
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div className="container-md">
          <h2 className="title title-lg text-center mb-lg">Overall Stats</h2>
          <div
            className="grid-auto gap-lg"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p
                className="text-sm text-secondary mb-sm"
                style={{ textTransform: "uppercase", letterSpacing: "1px" }}
              >
                NFT 总量
              </p>
              <div className="text-3xl font-bold text-primary">100</div>
            </div>
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p
                className="text-sm text-secondary mb-sm"
                style={{ textTransform: "uppercase", letterSpacing: "1px" }}
              >
                已铸造
              </p>
              <div className="text-3xl font-bold text-primary">0</div>
            </div>
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p
                className="text-sm text-secondary mb-sm"
                style={{ textTransform: "uppercase", letterSpacing: "1px" }}
              >
                铸造价格
              </p>
              <div className="text-3xl font-bold text-primary">免费</div>
            </div>
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p
                className="text-sm text-secondary mb-sm"
                style={{ textTransform: "uppercase", letterSpacing: "1px" }}
              >
                区块链
              </p>
              <div className="text-3xl font-bold text-primary">Injective</div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT 展示区域 */}
      <div
        className="section"
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        <div className="container">
          <NFTShowcase count={30} />
        </div>
      </div>

      {/* Q&A 区域 */}
      <div
        className="section"
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        <div className="container-sm">
          <FAQ />
        </div>
      </div>

      {/* 社区链接 */}
      <div
        className="section"
        style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        <div className="container-sm text-center">
          <p
            className="text-base text-secondary mb-lg"
            style={{ lineHeight: "1.8" }}
          >
            You can also follow along on{" "}
            <a
              href="https://x.com/ninjalabscn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-primary)",
                textDecoration: "underline",
              }}
            >
              X
            </a>{" "}
            or join the community-run{" "}
            <a
              href="https://discord.gg/ninjalabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-primary)",
                textDecoration: "underline",
              }}
            >
              Discord
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
