import * as React from "react";

import { ScheduleEntryDialog } from "./ScheduleEntryDialog";
import { Td } from "./Td";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = {
  entry: TScheduleEntry;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newEntry: TScheduleEntry) => void;
};

class ScheduleEntryCell extends React.Component<Props> {
  handleContextMenu = (event: React.MouseEvent) => {
    const { entry, showModal, onChange, hideModal } = this.props;
    event.preventDefault();

    showModal(() => (
      <ScheduleEntryDialog
        entry={entry}
        onChange={onChange}
        hideModal={hideModal}
      />
    ));
  };

  render() {
    return <Td onContextMenu={this.handleContextMenu} {...this.props.entry} />;
  }
}

export { ScheduleEntryCell };
