import * as React from "react";

import { TableCell } from "./TableCell";
import { TableCellDialog } from "./TableCellDialog";

import { TTableCellValue } from "./types";

type Props = {
  value: TTableCellValue;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newValue: TTableCellValue) => void;
  onDelete?: () => void;
  withColor?: boolean;
};

class EditableTableCell extends React.Component<Props> {
  handleContextMenu = (event: React.MouseEvent) => {
    const { value, showModal, hideModal, onChange, onDelete, withColor } =
      this.props;
    event.preventDefault();

    showModal(() => (
      <TableCellDialog
        value={value}
        onChange={onChange}
        hideModal={hideModal}
        onDelete={onDelete}
        withColor={withColor}
      />
    ));
  };

  render() {
    return (
      <TableCell
        value={this.props.value}
        onContextMenu={this.handleContextMenu}
      />
    );
  }
}

export { EditableTableCell };
