import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import GalleryHero from "../components/GalleryPage/GalleryHero";
import GallerySidebar from "../components/GalleryPage/GallerySidebar";
import "./GalleryPage.css";

// NFT等级类型
type NFTLevel = "white" | "purple" | "orange";

// 模拟NFT数据 - 包含等级信息
const mockNFTs = Array.from({ length: 100 }, (_, i) => {
  let level: NFTLevel = "white";
  if (i < 10) level = "orange"; // 10% 橙色(顶级)
  else if (i < 30) level = "purple"; // 20% 紫色(资深)
  else level = "white"; // 70% 白色(普通)

  return {
    id: i + 1,
    name: `Ninja #${i + 1}`,
    image: "/test.png",
    owner: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random()
      .toString(16)
      .slice(2, 6)}`,
    level,
    attributes: ["Cyber Style", "Rare Trait", "Limited Edition"].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
  };
});

const ITEMS_PER_PAGE = 24; // 每页显示24个

function GalleryPage() {
  const [nfts] = useState(mockNFTs);
  const [sortBy, setSortBy] = useState("newest");
  const [levelFilter, setLevelFilter] = useState<NFTLevel | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // 筛选和排序
  const filteredNFTs = nfts
    .filter((nft) => {
      if (levelFilter === "all") return true;
      return nft.level === levelFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "level":
          const levelOrder = { orange: 0, purple: 1, white: 2 };
          return levelOrder[a.level] - levelOrder[b.level];
        case "oldest":
          return a.id - b.id;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

  // 计算分页信息
  const totalPages = Math.ceil(filteredNFTs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedNFTs = filteredNFTs.slice(startIndex, endIndex);

  // 当筛选条件改变时，重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [levelFilter, sortBy]);

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 处理页码点击
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <GalleryHero />

      {/* 主内容区域 - 左右布局 */}
      <div className="gallery-main">
        <div className="gallery-main-container">
          {/* 左侧边栏 */}
          <GallerySidebar
            levelFilter={levelFilter}
            onLevelChange={setLevelFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* 右侧内容 */}
          <div className="gallery-content">
            {/* NFT 网格 */}
            {filteredNFTs.length > 0 ? (
              <>
                <div className="nft-grid">
                  {displayedNFTs.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      id={nft.id}
                      name={nft.name}
                      image={nft.image}
                      owner={nft.owner}
                      level={nft.level}
                      attributes={nft.attributes}
                    />
                  ))}
                </div>

                {/* 分页控件 */}
                {totalPages > 1 && (
                  <div className="gallery-pagination">
                    <button
                      className="pagination-btn prev"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M12.5 15L7.5 10L12.5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="pagination-numbers">
                      {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                          <button
                            key={index}
                            className={`pagination-number ${
                              currentPage === page ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        ) : (
                          <span key={index} className="pagination-ellipsis">
                            {page}
                          </span>
                        )
                      )}
                    </div>

                    <button
                      className="pagination-btn next"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7.5 15L12.5 10L7.5 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <p>No items found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
