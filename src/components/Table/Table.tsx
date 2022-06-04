import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";
import { TBody } from "./TBody";
import { THead } from "./THead";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (a: React.ReactNode) => void;
};

function Table({ studyInfo, showModal }: Props) {
  return (
    <table>
      <THead attributeNames={studyInfo.attributeNames} />
      <TBody studyInfo={studyInfo} showModal={showModal} />
    </table>
  );
}

export { Table };
