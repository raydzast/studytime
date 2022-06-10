import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

function StudyInfoTable({ studyInfo, showModal, hideModal, onChange }: Props) {
  const { disciplines } = studyInfo;
  const scheduleSlotCount =
    disciplines.length === 0
      ? 0
      : Math.max(...disciplines.map(({ schedule }) => schedule.length));

  return (
    <table>
      <TableHead
        attributeNames={studyInfo.attributeNames}
        scheduleSlotCount={scheduleSlotCount}
      />
      <TableBody
        studyInfo={studyInfo}
        scheduleSlotCount={scheduleSlotCount}
        showModal={showModal}
        hideModal={hideModal}
        onChange={onChange}
      />
    </table>
  );
}

export { StudyInfoTable };
