import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";
import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  design?: "primary" | "ghost";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  design = "primary",
  className = "",
  ...props
}) => {
  const buttonClass = classNames({
    button: true,
    button_primary: design === "primary",
    button_ghost: design === "ghost",
    [className]: className,
  });

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
