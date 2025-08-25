import React from "react";
import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  buttonType: string;
  showForgotPassword: boolean;
  buttonColor: React.CSSProperties;
}

const Form: React.FC<FormProps> = ({children, buttonType, showForgotPassword, buttonColor}: FormProps) => {
    return (
      <form className="login-form">
        {children}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            width: "340px",
          }}
        >
          <button type="submit" className="button-style"
          style={buttonColor}>
            {buttonType}
          </button>
          {showForgotPassword && (
            <a href="#" className="forget-style">
              Forgot password ?
            </a>
          )}
        </div>
      </form>
    );
}

export default Form;
