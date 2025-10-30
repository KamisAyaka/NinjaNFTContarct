import { Link, useLocation } from "react-router-dom";
import { useInjectiveWallet } from "../hooks/useInjectiveWallet";
import "./Header.css";

interface HeaderProps {
  onOpenWalletModal: () => void;
}

function Header({ onOpenWalletModal }: HeaderProps) {
  const location = useLocation();
  const { address, isConnected, isConnecting, disconnectWallet } =
    useInjectiveWallet();

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <img 
              src="/Logo.jpg" 
              alt="Ninja Labs Logo" 
              style={{ 
                height: "48px", 
                width: "auto",
                display: "block"
              }} 
            />
          </Link>

          <nav className="nav-links">
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/gallery" className={`nav-link ${isActive("/gallery")}`}>
              Gallery
            </Link>
            <Link to="/mint" className={`nav-link ${isActive("/mint")}`}>
              Mint
            </Link>
            <Link to="/my-nfts" className={`nav-link ${isActive("/my-nfts")}`}>
              My NFTs
            </Link>
          </nav>
        </div>

        <div className="header-right">
          {!isConnected ? (
            <button
              className="connect-btn"
              onClick={onOpenWalletModal}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <button className="wallet-info" onClick={disconnectWallet}>
              {formatAddress(address)}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
