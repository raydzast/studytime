import * as React from "react";

import { TDiscipline } from "../../types/StudyInfo";
import { EditableTableCell } from "./EditableTableCell";
import { TableCellDialog } from "./TableCellDialog";
import { TableCell } from "./TableCell";

type Props = {
  discipline: TDiscipline;
  attributeNames: Array<string>;
  scheduleSlotCount: number;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (discipline: TDiscipline) => void;
  onDelete: () => void;
};

class DisciplineRow extends React.Component<Props> {
  renderAttributeCells = () => {
    const { discipline, attributeNames, showModal, hideModal, onChange } =
      this.props;
    return attributeNames.map((attributeName) => (
      <EditableTableCell
        key={attributeName}
        value={{ content: discipline.attributes[attributeName] }}
        showModal={showModal}
        hideModal={hideModal}
        onChange={(newValue) => {
          discipline.attributes[attributeName] = newValue.content;
          onChange(discipline);
        }}
        withColor={false}
      />
    ));
  };

  renderScheduleEntries = () => {
    const { discipline, showModal, hideModal, onChange } = this.props;

    return discipline.schedule.map((entry, idx) => (
      <EditableTableCell
        key={idx}
        value={entry}
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
      <TableCellDialog
        onChange={(newEntry) => {
          discipline.schedule.push(newEntry);
          onChange(discipline);
        }}
        hideModal={hideModal}
      />
    ));
  };

  render() {
    const { discipline, showModal, hideModal, onChange, onDelete } = this.props;

    return (
      <tr>
        <EditableTableCell
          value={{ color: discipline.color, content: discipline.name }}
          showModal={showModal}
          hideModal={hideModal}
          onChange={(newValue) => {
            discipline.color = newValue.color;
            discipline.name = newValue.content;
            onChange(discipline);
          }}
          onDelete={onDelete}
        />
        {this.renderAttributeCells()}
        {this.renderScheduleEntries()}
        <td className="table-add-button" onClick={this.handleAddClick}>
          +
        </td>
        {this.renderEmptyEntries()}
      </tr>
    );
  }
}

export { DisciplineRow };
