import "./NFTFilters.css";

type NFTLevel = "white" | "purple" | "orange";

interface NFTFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  levelFilter: NFTLevel | "all";
  onLevelChange: (level: NFTLevel | "all") => void;
}

function NFTFilters({
  sortBy,
  onSortChange,
  levelFilter,
  onLevelChange,
}: NFTFiltersProps) {
  return (
    <div className="nft-filters">
      <div className="filter-section">
        <h3 className="filter-title">等级类型与属性</h3>

        <div className="level-filters">
          <button
            className={`level-btn ${levelFilter === "all" ? "active" : ""}`}
            onClick={() => onLevelChange("all")}
          >
            全部
          </button>
          <button
            className={`level-btn level-white ${
              levelFilter === "white" ? "active" : ""
            }`}
            onClick={() => onLevelChange("white")}
          >
            <span className="level-indicator white"></span>
            白色背景
          </button>
          <button
            className={`level-btn level-purple ${
              levelFilter === "purple" ? "active" : ""
            }`}
            onClick={() => onLevelChange("purple")}
          >
            <span className="level-indicator purple"></span>
            紫色背景
          </button>
          <button
            className={`level-btn level-orange ${
              levelFilter === "orange" ? "active" : ""
            }`}
            onClick={() => onLevelChange("orange")}
          >
            <span className="level-indicator orange"></span>
            橙色背景
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">排序方式</label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">最新</option>
          <option value="oldest">最早</option>
          <option value="level">等级</option>
        </select>
      </div>
    </div>
  );
}

export default NFTFilters;
