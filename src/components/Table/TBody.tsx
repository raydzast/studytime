import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { Discipline } from "./Discipline";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (a: React.ReactNode) => void;
};

function TBody({
  studyInfo: { disciplines, attributeNames },
  showModal,
}: Props) {
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
        />
      ))}
    </tbody>
  );
}

export { TBody };
