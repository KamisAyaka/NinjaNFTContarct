import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Logo.jpg" alt="Ninja Labs" className="footer-logo" />
          </div>
          <div className="footer-text">
            <p>© 2025 Ninja Labs. Built on Injective Protocol.</p>
            <p className="footer-subtitle">赛博朋克忍者 · Web3 开发者社区</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
