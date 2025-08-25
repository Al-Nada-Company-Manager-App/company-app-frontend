import "../../styles/sign.css";
import Form from "./components/Form";
import Footer from "./components/Footer";

const Login = () => {
  return (
    <div className="login-bg h-screen w-screen overflow-hidden relative">
      <div className="absolute blue-grow" />
      <div className="absolute baby-blue-grow" />
      <div className="absolute purple-grow" />
      <div
        className="absolute ellipse-1"
        style={{
          background: "linear-gradient(180deg, #530061 0%, #0D0A30 100%)",
        }}
      />
      <div
        className="absolute ellipse-2"
        style={{
          background: "linear-gradient(180deg, #300061 0%, #0A1030 100%)",
        }}
      />
      <div
        className="login-container absolute"
        style={{
          background:
            "linear-gradient(321.23deg, rgba(191,191,191,0.062) 5.98%, rgba(0,0,0,0) 66.28%), rgba(0,0,0,0.14)",
          border: "1px solid #4F015E",
        }}
      >
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
          <Form
            buttonType="Login"
            showForgotPassword={true}
            buttonColor={{
              background:
                "linear-gradient(90.57deg, #628EFF 9.91%, #8740CD 53.29%, #580475 91.56%)",
            }}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="login-input-style"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Password"
                  className="password-input-style"
                  name="password"
                />
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="remember"
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#7CC1F3",
                  }}
                />
                Remember me
              </label>
            </div>
          </Form>
        </div>
        {/* Signup and footer links */}
        <Footer haveAccount={false} />
      </div>
    </div>
  );
};

export default Login;
