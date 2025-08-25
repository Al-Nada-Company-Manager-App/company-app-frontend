import React from "react";

const Footer: React.FC<{ haveAccount: boolean }> = ({ haveAccount }) => {
  return (
    <div className="footer-style">
      <div className="donot-have-account">
        {haveAccount ? "Already have an account ? " : "Don’t have an account ? "}
        <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
          {haveAccount ? "Login" : "Signup"}
        </a>
      </div>
      <div className="footer-text-container-style">
        <a href="#" className="footer-text-style">
          Terms & Conditions
        </a>
        <a href="#" className="footer-text-style">
          Support
        </a>
        <a href="#" className="footer-text-style">
          Customer Care
        </a>
      </div>
    </div>
  );
};
export default Footer;
