import * as React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onHide: React.MouseEventHandler<HTMLDivElement>;
};

function Modal({ show, children, onHide }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-background" onClick={onHide} />
      <div className="modal-container">{children}</div>
    </div>
  );
}

export { Modal };
