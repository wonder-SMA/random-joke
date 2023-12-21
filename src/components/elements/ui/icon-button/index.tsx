import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";
import "./icon-button.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({ children, className = "", ...props }) => {
  const iconButtonClass = classNames({
    "icon-button": true,
    [className]: className,
  });

  return (
    <button className={iconButtonClass} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
