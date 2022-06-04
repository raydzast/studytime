import * as React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onHide: React.MouseEventHandler<HTMLDivElement>;
};

function Modal({ show, children, onHide }: Props) {
  const wrapperStyle = show ? {} : { display: "none" };

  return (
    <div style={wrapperStyle} className="modal-wrapper">
      <div className="modal-background" onClick={onHide} />
      <div className="modal-container">{children}</div>
    </div>
  );
}

export { Modal };
