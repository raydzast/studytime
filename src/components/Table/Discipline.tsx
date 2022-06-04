import * as React from "react";

import { TDiscipline } from "../../types/StudyInfo";
import { ChangeCellDialog } from "./ChangeCellDialog";
import { Td } from "./Td";

type Props = {
  discipline: TDiscipline;
  attributeNames: Array<string>;
  scheduleSlots: number;
  showModal: (a: React.ReactNode) => void;
};

function Discipline({
  discipline,
  attributeNames,
  scheduleSlots,
  showModal,
}: Props) {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    showModal(<ChangeCellDialog />);
  };

  const attributeCells = attributeNames.map((attributeName) => (
    <Td key={attributeName} content={discipline.attributes[attributeName]} />
  ));
  const scheduleEntries = discipline.schedule.map((entry, idx) => {
    return <Td key={idx} onContextMenu={handleContextMenu} {...entry} />;
  });
  const emptyEntries = [...Array(scheduleSlots - scheduleEntries.length)].map((_, idx) => (
    <Td key={idx} />
  ));

  return (
    <tr>
      <Td color={discipline.color} content={discipline.name} />
      {attributeCells}
      {scheduleEntries}
      {emptyEntries}
    </tr>
  );
}

export { Discipline };
