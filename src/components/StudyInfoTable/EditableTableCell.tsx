import * as React from "react";

import { TableCell } from "./TableCell";
import { ScheduleEntryDialog } from "./ScheduleEntryDialog";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = {
  entry: TScheduleEntry;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newEntry: TScheduleEntry) => void;
  onDelete: () => void;
};

class EditableTableCell extends React.Component<Props> {
  handleContextMenu = (event: React.MouseEvent) => {
    const { entry, showModal, hideModal, onChange, onDelete } = this.props;
    event.preventDefault();

    showModal(() => (
      <ScheduleEntryDialog
        entry={entry}
        onChange={onChange}
        hideModal={hideModal}
        onDelete={onDelete}
      />
    ));
  };

  render() {
    return (
      <TableCell onContextMenu={this.handleContextMenu} {...this.props.entry} />
    );
  }
}

export { EditableTableCell };
