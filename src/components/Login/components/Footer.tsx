const Footer = () => {
    return (
      <div className="footer-style">
        <div className="donot-have-account">
          Don’t have an account ?{" "}
          <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
            Signup
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
}
export default Footer;