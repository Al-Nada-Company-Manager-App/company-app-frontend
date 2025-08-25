import Form from "./components/Form";
import Footer from "./components/Footer";
import "../../styles/sign.css";

const SignUp = () => {
  return (
    <div className="login-bg h-screen w-screen overflow-hidden relative">
      <div className="absolute blue-grow" />
      <div className="absolute baby-blue-grow" />
      <div className="absolute pink-grow" />
      <div
        className="absolute ellipse-1"
        style={{
          background: "linear-gradient(180deg, #61003A 0%, #2D0A30 100%)",
        }}
      />
      <div
        className="absolute ellipse-2"
        style={{
          background: "linear-gradient(180deg, #61004B 0%, #220A30 100%)",
        }}
      />
      <div
        className="login-container absolute"
        style={{
          background:
            "linear-gradient(321.23deg, rgba(191, 191, 191, 0.062) 5.98%, rgba(0, 0, 0, 0) 66.28%), rgba(0, 0, 0, 0.14)",
          border: "1px solid #5D0139",
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
            <h2 className="login-text-style">Signup</h2>
            <p className="login-subtext-style">
              Just some details to get you in.!
            </p>
          </div>
          <Form
            buttonType="Signup"
            showForgotPassword={false}
            buttonColor={{
              background:
                "linear-gradient(90.57deg, #E948C5 9.91%, #CD407B 53.29%, #75042D 91.56%)",
            }}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="login-input-style"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
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
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="password-input-style"
                  name="confirmPassword"
                />
              </div>
            </div>
          </Form>
        </div>
        {/* Signup and footer links */}
        <Footer
          haveAccount={true}
        />
      </div>
    </div>
  );
};

export default SignUp;
