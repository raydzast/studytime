import * as React from "react";

type Props = {
  color: string;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function ColorButton({ color, active, onClick }: Props) {
  const buttonClassName = `color-button ${active ? "active" : ""} ${color}-bg`;

  return (
    <button
      onClick={onClick}
      className={buttonClassName}
    />
  );
}

export { ColorButton };
