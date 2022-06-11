import * as React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onHide: React.MouseEventHandler<HTMLDivElement>;
  hideOnBgClick?: boolean;
};

function Modal({ show, children, onHide, hideOnBgClick }: Props) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div
        className="modal-background"
        onClick={hideOnBgClick === true ? onHide : null}
      />
      <div className="modal-container">{children}</div>
    </div>
  );
}

export { Modal };
