import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Header.css";

function Header() {
  const location = useLocation();

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
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
