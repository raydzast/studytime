import * as React from "react";

import { TDiscipline } from "../../types/StudyInfo";
import { ScheduleEntryCell } from "./ScheduleEntryCell";
import { Td } from "./Td";

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
      <Td key={attributeName} content={discipline.attributes[attributeName]} />
    ));
  };

  renderScheduleEntries = () => {
    const { discipline, showModal, hideModal, onChange } = this.props;

    return discipline.schedule.map((entry, idx) => (
      <ScheduleEntryCell
        entry={entry}
        showModal={showModal}
        hideModal={hideModal}
        onChange={(newEntry) => {
          discipline.schedule[idx] = newEntry;
          onChange(discipline);
        }}
      />
    ));
  };

  renderEmptyEntries = () => {
    const { discipline, scheduleSlotCount } = this.props;

    return [...Array(scheduleSlotCount - discipline.schedule.length)].map(
      (_, idx) => <Td key={idx} />
    );
  };

  render() {
    const { discipline } = this.props;

    return (
      <tr>
        <Td color={discipline.color} content={discipline.name} />
        {this.renderAttributeCells()}
        {this.renderScheduleEntries()}
        {this.renderEmptyEntries()}
      </tr>
    );
  }
}

export { DisciplineRow };
