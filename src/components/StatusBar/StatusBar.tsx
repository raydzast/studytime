import * as React from "react";

import { DateBlock } from "./DateBlock";
import { Stats } from "./Stats";

import { TStudyInfo } from "../../types/StudyInfo";

type Props = {
  studyInfo: TStudyInfo;
  onOpenClick: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick: React.MouseEventHandler<HTMLButtonElement>;
};

function StatusBar({studyInfo, onOpenClick, onSaveClick}: Props) {
  return (
    <div className="status-bar">
      <button onClick={onOpenClick}>Open</button>
      <button onClick={onSaveClick}>Save</button>
      <DateBlock />
      <Stats studyInfo={studyInfo} />
    </div>
  );
}

export { StatusBar };
