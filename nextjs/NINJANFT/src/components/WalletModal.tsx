import "./WalletModal.css";
import { useInjectiveWallet } from "../hooks/useInjectiveWallet";
import type { WalletType } from "../hooks/useInjectiveWallet";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectWallet } = useInjectiveWallet();

  if (!isOpen) return null;

  const handleSelectWallet = async (walletType: WalletType) => {
    await connectWallet(walletType);
    onClose();
  };

  return (
    <div className="wallet-modal-overlay" onClick={onClose}>
      <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wallet-modal-header">
          <h2>选择钱包</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wallet-options">
          <button
            className="wallet-option"
            onClick={() => handleSelectWallet("keplr")}
          >
            <div className="wallet-icon">🔮</div>
            <div className="wallet-info">
              <h3>Keplr 钱包</h3>
            </div>
          </button>

          <button
            className="wallet-option"
            onClick={() => handleSelectWallet("metamask")}
          >
            <div className="wallet-icon">🦊</div>
            <div className="wallet-info">
              <h3>MetaMask</h3>
            </div>
          </button>
        </div>

        <div className="wallet-modal-footer">
          <p>没有钱包？</p>
          <div className="install-links">
            <a
              href="https://www.keplr.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              安装 Keplr
            </a>
            <span>|</span>
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              安装 MetaMask
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletModal;
