import * as React from "react";

import { TDiscipline, TScheduleEntry } from "../../types/StudyInfo";
import { ScheduleEntryDialog } from "./ScheduleEntryDialog";
import { Td } from "./Td";

type Props = {
  discipline: TDiscipline;
  attributeNames: Array<string>;
  scheduleSlots: number;
  showModal: (renderChildren: () => React.ReactNode) => void;
  onChange: (discipline: TDiscipline) => void;
};

class Discipline extends React.Component<Props> {
  createContextMenuHandler = (idx: number) => {
    const {showModal, onChange} = this.props;


    return (event: React.MouseEvent) => {
      event.preventDefault();
      showModal(() => {
        console.log("aim");
        const {discipline} = this.props;
        const entry = discipline.schedule[idx];

        return (
          <ScheduleEntryDialog
            entry={entry}
            onChange={(newEntry) => {
              discipline.schedule[idx] = newEntry;
              onChange(discipline);
            }}
          />
        );
      });
    };
  }

  render() {
    const { discipline, attributeNames, scheduleSlots, showModal, onChange } =
      this.props;

    const attributeCells = attributeNames.map((attributeName) => (
      <Td key={attributeName} content={discipline.attributes[attributeName]} />
    ));
    const scheduleEntries = discipline.schedule.map((entry, idx) => (
      <Td
        key={idx}
        onContextMenu={this.createContextMenuHandler(idx)}
        {...entry}
      />
    ));
    const emptyEntries = [...Array(scheduleSlots - scheduleEntries.length)].map(
      (_, idx) => <Td key={idx} />
    );

    return (
      <tr>
        <Td color={discipline.color} content={discipline.name} />
        {attributeCells}
        {scheduleEntries}
        {emptyEntries}
      </tr>
    );
  }
}

export { Discipline };
