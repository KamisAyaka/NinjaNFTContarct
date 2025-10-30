import { useState } from 'react'

interface MintSectionProps {
  isConnected: boolean
  loading: boolean
  maxPerWallet: number
  onMint: (quantity: number) => void
}

function MintSection({ isConnected, loading, maxPerWallet, onMint }: MintSectionProps) {
  const [quantity, setQuantity] = useState(1)

  const handleMint = () => {
    onMint(quantity)
  }

  return (
    <div className="card flex-col gap-lg">
      <div className="flex-center gap-md">
        <button 
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={loading || quantity <= 1}
        >
          -
        </button>
        <input 
          type="number" 
          className="input text-center font-bold text-xl"
          style={{ width: '80px' }}
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 1
            setQuantity(Math.min(maxPerWallet, Math.max(1, val)))
          }}
          min="1"
          max={maxPerWallet}
          disabled={loading}
        />
        <button 
          className="btn btn-icon btn-secondary"
          onClick={() => setQuantity(Math.min(maxPerWallet, quantity + 1))}
          disabled={loading || quantity >= maxPerWallet}
        >
          +
        </button>
      </div>

      <button 
        className="btn btn-primary btn-full btn-lg"
        onClick={handleMint}
        disabled={loading || !isConnected}
      >
        {loading ? '处理中...' : `铸造 ${quantity} 个 NFT`}
      </button>
    </div>
  )
}

export default MintSection

