import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { Discipline } from "./Discipline";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (renderChildren: () => React.ReactNode) => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

function TBody({
  studyInfo,
  showModal,
  onChange,
}: Props) {
  const { disciplines, attributeNames } = studyInfo;
  const scheduleSlots = Math.max(
    0,
    ...disciplines.map((discipline) => discipline.schedule.length)
  );

  return (
    <tbody>
      {disciplines.map((discipline, idx) => (
        <Discipline
          key={idx}
          discipline={discipline}
          scheduleSlots={scheduleSlots}
          attributeNames={attributeNames}
          showModal={showModal}
          onChange={(newDiscipline) => {
            studyInfo.disciplines[idx] = newDiscipline;
            onChange(studyInfo);
          }}
        />
      ))}
    </tbody>
  );
}

export { TBody };
