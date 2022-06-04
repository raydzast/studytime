import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";

const COLORS = ["white", "green", "orange", "red"];

type Props = {
  studyInfo: TStudyInfo;
};

function Stats({ studyInfo }: Props) {
  const stats = calcStats(studyInfo);

  return (
    <div className="black-bg">
      {COLORS.map((color, idx) => (
        <React.Fragment key={color}>
          {idx === 0 || "/"}
          <span className={`${color}-color`}>{stats[color] || 0}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export { Stats };

function calcStats({ disciplines }: TStudyInfo) {
  const stats: { [id: string]: number } = {};

  for (const { schedule } of disciplines) {
    for (const entry of schedule) {
      const color = entry.color || "white";
      if (!stats.hasOwnProperty(color)) {
        stats[color] = 0;
      }
      stats[color]++;
    }
  }

  return stats;
}
