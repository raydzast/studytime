import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { TBody } from "./TBody";
import { THead } from "./THead";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (renderChildren: () => React.ReactNode) => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

function Table({ studyInfo, showModal, onChange }: Props) {
  return (
    <table>
      <THead attributeNames={studyInfo.attributeNames} />
      <TBody studyInfo={studyInfo} showModal={showModal} onChange={onChange} />
    </table>
  );
}

export { Table };
