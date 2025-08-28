import { Button } from "antd";
import type { Theme } from "@src/types/theme";


interface CustomBtnProps {
    theme: Theme;
    btnTitle: string;
    className?: string;
    onClick: () => void;
    loading?: boolean;
}

const CustomBtn = ({ theme, btnTitle, onClick, className ="" , loading = false }: CustomBtnProps) => {
  if(loading){
    return(
      <Button
        type="primary"
        className={`${className}`}
        style={{
          background: theme.button?.background || "#6C79F7",
          color: theme.button?.color || "#fff",
          boxShadow: theme.button?.boxShadow,
          borderRadius: theme.button?.borderRadius,
          fontWeight: theme.button?.fontWeight,
          fontSize: theme.button?.fontSize,
          padding: theme.button?.padding,
          transition: theme.button?.transition,
          border: theme.button?.border,
        }}
        loading
      >
        {btnTitle}
      </Button>
    )
  }
  return(
  <Button
    type="primary"
    className={`${className}`}
    style={{
      background: theme.button?.background || "#6C79F7",
      color: theme.button?.color || "#fff",
      boxShadow: theme.button?.boxShadow,
      borderRadius: theme.button?.borderRadius,
      fontWeight: theme.button?.fontWeight,
      fontSize: theme.button?.fontSize,
      padding: theme.button?.padding,
      transition: theme.button?.transition,
      border: theme.button?.border,
    }}
    onMouseOver={(e) => {
      if (theme.button) {
        e.currentTarget.style.background =
          theme.button.hoverBackground || "#5A67D8";
        e.currentTarget.style.color = theme.button.hoverColor || "#fff";
      }
    }}
    onMouseOut={(e) => {
      if (theme.button) {
        e.currentTarget.style.background = theme.button.background || "#6C79F7";
        e.currentTarget.style.color = theme.button.color || "#fff";
      }
    }}
    onClick={onClick}
  >
    {btnTitle}
  </Button>
    )
};

export default CustomBtn;