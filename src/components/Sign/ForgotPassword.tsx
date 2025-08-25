import Form from "./components/Form";
import Footer from "./components/Footer";
import "../../styles/sign.css";

const ForgotPassword = () => {
  return (
    <div className="login-bg h-screen w-screen overflow-hidden relative">
      <div className="absolute blue-grow" />
      <div className="absolute baby-blue-grow" />
      <div className="absolute blue2-grow" />
      <div
        className="absolute ellipse-1"
        style={{
          background: "linear-gradient(180deg, #190061 0%, #0A1B30 100%)",
        }}
      />
      <div
        className="absolute ellipse-2"
        style={{
          background: "linear-gradient(180deg, #000F61 0%, #0A1730 100%)",
        }}
      />
      <div
        className="login-container absolute"
        style={{
          background:
            "linear-gradient(321.23deg, rgba(191, 191, 191, 0.062) 5.98%, rgba(0, 0, 0, 0) 66.28%), rgba(0, 0, 0, 0.14)",
          border: "1px solid #005CDD",
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
            <h2 className="login-text-style">Forgot Password ?</h2>
            <p className="login-subtext-style">Please enter your email</p>
          </div>
          <Form
            buttonType="Signup"
            showForgotPassword={false}
            buttonColor={{
              background:
                "linear-gradient(90.57deg, #2E4CEE 9.91%, #221EBF 53.29%, #040F75 91.56%)",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="login-input-style"
            />
          </Form>
        </div>
        {/* Signup and footer links */}
        <Footer
          haveAccount={false}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
