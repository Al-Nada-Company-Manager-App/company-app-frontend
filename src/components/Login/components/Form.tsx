const Form = () => {
    return (
      <form className="login-form">
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              border: "1px solid #fff",
              borderRadius: "20px",
              background: "transparent",
              width: "340px",
            }}
          >
            <input
              type="password"
              placeholder="Password"
              className="password-input-style"
              name="password"
            />
            {/* Eye icon placeholder */}
            {/* <span
                  style={{
                    width: "18px",
                    height: "18px",
                    display: "inline-block",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#fff" strokeWidth="2" />
                    <line
                      x1="4"
                      y1="14"
                      x2="14"
                      y2="4"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </svg>
                </span> */}
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "16px",
              color: "#fff",
              width: "340px",
            }}
          >
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
        {/* Login button & forgot password */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            width: "340px",
          }}
        >
          <button type="submit" className="login-button-style">
            Login
          </button>
          <a href="#" className="forget-style">
            Forgot password ?
          </a>
        </div>
      </form>
    );
}

export default Form;
