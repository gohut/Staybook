const Footer = () => {
  const footerStyle = {
    background: "linear-gradient(180deg, #0f1b2d, #0b1524)",
    color: "#cbd5e1",
    padding: "40px 60px 20px",
    fontFamily: "Arial, sans-serif",
  };

  const topSection = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "30px",
  };

  const column = {
    minWidth: "200px",
  };

  const heading = {
    color: "#ffffff",
    fontSize: "16px",
    marginBottom: "14px",
    fontWeight: "bold",
  };

  const text = {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#9ca3af",
  };

  const link = {
    fontSize: "14px",
    color: "#9ca3af",
    textDecoration: "none",
    display: "block",
    marginBottom: "8px",
    cursor: "pointer",
  };

  const socialRow = {
    display: "flex",
    gap: "14px",
    marginTop: "14px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const bottomBar = {
    textAlign: "center",
    fontSize: "13px",
    color: "#9ca3af",
    marginTop: "20px",
  };

  return (
    <footer style={footerStyle}>
      {/* Top Section */}
      <div style={topSection}>
        {/* Brand */}
        <div style={column}>
          <div style={heading}>StayBook</div>
          <p style={text}>
            Your perfect getaway destination for luxury and comfort.
          </p>
          <div style={socialRow}>
            <span>X</span>
            <span>f</span>
            <span>📷</span>
          </div>
        </div>

        {/* Quick Links */}
        <div style={column}>
          <div style={heading}>Quick Links</div>
          <span style={link}>Home</span>
          <span style={link}>Rooms</span>
          <span style={link}>About</span>
        </div>

        {/* Support */}
        <div style={column}>
          <div style={heading}>Support</div>
          <span style={link}>Contact Us</span>
          <span style={link}>FAQs</span>
          <span style={link}>Privacy Policy</span>
        </div>

        {/* Contact */}
        <div style={column}>
          <div style={heading}>Contact</div>
          <p style={text}>+1 (555) 123-4567</p>
          <p style={text}>info@staybook.com</p>
          <p style={text}>123 Paradise Street</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={bottomBar}>
        © 2024 StayBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
