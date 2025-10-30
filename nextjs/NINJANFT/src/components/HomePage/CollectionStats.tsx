interface CollectionStatsProps {
  totalSupply: number;
  owners: number;
  whiteCount: number;
  purpleCount: number;
  orangeCount: number;
}

function CollectionStats({
  totalSupply,
  owners,
  whiteCount,
  purpleCount,
  orangeCount,
}: CollectionStatsProps) {
  const uniqueOwnerPercentage = ((owners / totalSupply) * 100).toFixed(1);

  return (
    <div className="grid-auto gap-lg mb-lg">
      <div className="stat-card">
        <div className="stat-label">总供应量</div>
        <div className="stat-value">{totalSupply}</div>
        <div className="text-sm text-secondary mt-sm">Total NFTs</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">持有者数量</div>
        <div className="stat-value">{owners}</div>
        <div className="text-sm text-secondary mt-sm">{uniqueOwnerPercentage}% 唯一持有者</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">白色背景</div>
        <div className="stat-value">{whiteCount}</div>
        <div className="text-sm text-secondary mt-sm">普通贡献者</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">紫色背景</div>
        <div className="stat-value">{purpleCount}</div>
        <div className="text-sm text-secondary mt-sm">资深贡献者</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">橙色背景</div>
        <div className="stat-value">{orangeCount}</div>
        <div className="text-sm text-secondary mt-sm">顶级贡献者</div>
      </div>
    </div>
  );
}

export default CollectionStats;
