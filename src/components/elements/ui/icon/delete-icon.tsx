import React, { FC, SVGProps } from "react";

interface DeleteIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const DeleteIcon: FC<DeleteIconProps> = ({ className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4" />
    </svg>
  );
};

export default DeleteIcon;