import "../../styles/sign.css";
import Form from "./components/Form";
import Footer from "./components/Footer";

const Login = () => {
  return (
    <div className="login-bg h-screen w-screen overflow-hidden relative">
      <div className="absolute blue-grow" />
      <div className="absolute baby-blue-grow" />
      <div className="absolute purple-grow" />
      <div className="absolute ellipse-1" />
      <div className="absolute ellipse-2" />
      <div className="login-container absolute">
        <div
          style={{
            width: "400px",
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <h2 className="login-text-style">Login</h2>
            <p className="login-subtext-style">Glad you're back.!</p>
          </div>
          <Form />
        </div>
        {/* Signup and footer links */}
        <Footer />
      </div>
    </div>
  );
};

export default Login;
