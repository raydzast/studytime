import * as React from "react";

import { TDiscipline, TScheduleEntry } from "../../types/StudyInfo";
import { EditableTableCell } from "./EditableTableCell";
import { ScheduleEntryDialog } from "./ScheduleEntryDialog";
import { TableCell } from "./TableCell";

type Props = {
  discipline: TDiscipline;
  attributeNames: Array<string>;
  scheduleSlotCount: number;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (discipline: TDiscipline) => void;
};

class DisciplineRow extends React.Component<Props> {
  renderAttributeCells = () => {
    const { discipline, attributeNames } = this.props;
    return attributeNames.map((attributeName) => (
      <TableCell key={attributeName} content={discipline.attributes[attributeName]} />
    ));
  };

  renderScheduleEntries = () => {
    const { discipline, showModal, hideModal, onChange } = this.props;

    return discipline.schedule.map((entry, idx) => (
      <EditableTableCell
        entry={entry}
        showModal={showModal}
        hideModal={hideModal}
        onChange={(newEntry) => {
          discipline.schedule[idx] = newEntry;
          onChange(discipline);
        }}
        onDelete={() => {
          discipline.schedule.splice(idx, 1);
          onChange(discipline);
        }}
      />
    ));
  };

  renderEmptyEntries = () => {
    const { discipline, scheduleSlotCount } = this.props;

    return [...Array(scheduleSlotCount - discipline.schedule.length)].map(
      (_, idx) => <TableCell key={idx} />
    );
  };

  handleAddClick = () => {
    const { discipline, showModal, hideModal, onChange } = this.props;

    showModal(() => (
      <ScheduleEntryDialog
        entry={new TScheduleEntry()}
        onChange={(newEntry) => {
          discipline.schedule.push(newEntry);
          onChange(discipline);
        }}
        hideModal={hideModal}
      />
    ));
  };

  render() {
    const { discipline } = this.props;

    return (
      <tr>
        <TableCell color={discipline.color} content={discipline.name} />
        {this.renderAttributeCells()}
        {this.renderScheduleEntries()}
        {this.renderEmptyEntries()}
        <td className="add-entry-button" onClick={this.handleAddClick}>+</td>
      </tr>
    );
  }
}

export { DisciplineRow };
