import "./GallerySidebar.css";

type NFTLevel = "white" | "purple" | "orange";

interface GallerySidebarProps {
  levelFilter: NFTLevel | "all";
  onLevelChange: (level: NFTLevel | "all") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

function GallerySidebar({
  levelFilter,
  onLevelChange,
  sortBy,
  onSortChange,
}: GallerySidebarProps) {
  return (
    <div className="gallery-sidebar">
      {/* 排序 */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Sort By</h3>
        <div className="sidebar-options">
          <button
            className={`sidebar-option ${sortBy === "newest" ? "active" : ""}`}
            onClick={() => onSortChange("newest")}
          >
            Newest
          </button>
          <button
            className={`sidebar-option ${sortBy === "oldest" ? "active" : ""}`}
            onClick={() => onSortChange("oldest")}
          >
            Oldest
          </button>
          <button
            className={`sidebar-option ${sortBy === "level" ? "active" : ""}`}
            onClick={() => onSortChange("level")}
          >
            Level
          </button>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="sidebar-divider"></div>

      {/* NFT 等级筛选 */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Level</h3>
        <div className="sidebar-options">
          <button
            className={`sidebar-option ${levelFilter === "all" ? "active" : ""}`}
            onClick={() => onLevelChange("all")}
          >
            <span className="option-label">All</span>
          </button>
          <button
            className={`sidebar-option level-option ${
              levelFilter === "white" ? "active" : ""
            }`}
            onClick={() => onLevelChange("white")}
          >
            <span className="level-indicator white"></span>
            <span className="option-label">White</span>
          </button>
          <button
            className={`sidebar-option level-option ${
              levelFilter === "purple" ? "active" : ""
            }`}
            onClick={() => onLevelChange("purple")}
          >
            <span className="level-indicator purple"></span>
            <span className="option-label">Purple</span>
          </button>
          <button
            className={`sidebar-option level-option ${
              levelFilter === "orange" ? "active" : ""
            }`}
            onClick={() => onLevelChange("orange")}
          >
            <span className="level-indicator orange"></span>
            <span className="option-label">Orange</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GallerySidebar;

