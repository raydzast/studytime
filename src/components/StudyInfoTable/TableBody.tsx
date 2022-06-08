import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { DisciplineRow } from "./DisciplineRow";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

function TableBody({ studyInfo, showModal, hideModal, onChange }: Props) {
  const { disciplines, attributeNames } = studyInfo;
  const scheduleSlotCount =
    disciplines.length === 0
      ? 0
      : Math.max(...disciplines.map(({ schedule }) => schedule.length));

  return (
    <tbody>
      {disciplines.map((discipline, idx) => (
        <DisciplineRow
          key={idx}
          discipline={discipline}
          scheduleSlotCount={scheduleSlotCount}
          attributeNames={attributeNames}
          showModal={showModal}
          hideModal={hideModal}
          onChange={(newDiscipline) => {
            studyInfo.disciplines[idx] = newDiscipline;
            onChange(studyInfo);
          }}
          onDelete={() => {
            studyInfo.disciplines.splice(idx, 1);
            onChange(studyInfo);
          }}
        />
      ))}
    </tbody>
  );
}

export { TableBody };
