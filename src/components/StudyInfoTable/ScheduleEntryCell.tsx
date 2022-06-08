import * as React from "react";

import { ScheduleEntryDialog } from "./ScheduleEntryDialog";
import { TableCell } from "./TableCell";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = {
  entry: TScheduleEntry;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newEntry: TScheduleEntry) => void;
  onDelete?: () => void;
};

class ScheduleEntryCell extends React.Component<Props> {
  handleContextMenu = (event: React.MouseEvent) => {
    const { entry, showModal, onChange, onDelete, hideModal } = this.props;
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
    return <TableCell onContextMenu={this.handleContextMenu} {...this.props.entry} />;
  }
}

export { ScheduleEntryCell };
