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
  return (
    <table>
      <TableHead attributeNames={studyInfo.attributeNames} />
      <TableBody
        studyInfo={studyInfo}
        showModal={showModal}
        hideModal={hideModal}
        onChange={onChange}
      />
    </table>
  );
}

export { StudyInfoTable };
