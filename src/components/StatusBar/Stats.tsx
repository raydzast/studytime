import * as React from "react";

import { TStudyInfo } from "../../types/StudyInfo";

const statColors = ["white", "green", "orange", "red"];

function calcStats(studyInfo: TStudyInfo) {
  const stats: { [id: string]: number } = {};

  for (const discipline of studyInfo.disciplines) {
    for (const entry of discipline.schedule) {
      const color = entry.color || "white";
      if (!stats.hasOwnProperty(color)) {
        stats[color] = 0;
      }
      stats[color]++;
    }
  }

  return stats;
}

type StatsProps = {
  studyInfo: TStudyInfo;
};

export default function Stats({ studyInfo }: StatsProps) {
  const stats = calcStats(studyInfo);

  return (
    <div className="black-bg">
      {statColors.map((color, idx) => {
        return (
          <React.Fragment key={color}>
            {idx === 0 || "/"}
            <span className={`${color}-color`}>{stats[color] || 0}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
