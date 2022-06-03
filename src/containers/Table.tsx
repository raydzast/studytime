import * as React from "react";
import * as showdown from "showdown";

import { TStudyInfo, TScheduleEntry, TDiscipline } from "../types/StudyInfo";

type TdProps = TScheduleEntry;

function Td({ color, content }: TdProps) {
  return (
    <td
      className={`${color || "white"}-bg`}
      dangerouslySetInnerHTML={{
        __html: new showdown.Converter().makeHtml(content),
      }}
    />
  );
}

type DisciplineProps = {
  discipline: TDiscipline;
  attributeNames: Array<string>;
  scheduleSlots: number;
};

function Discipline({
  discipline,
  attributeNames,
  scheduleSlots,
}: DisciplineProps) {
  const emptyEntries = scheduleSlots - discipline.schedule.length;

  return (
    <tr>
      <Td color={discipline.color} content={discipline.name} />
      {attributeNames.map((attributeName) => {
        return (
          <Td
            key={attributeName}
            content={discipline.attributes[attributeName]}
          />
        );
      })}
      {discipline.schedule.map((entry, idx) => {
        return <Td key={idx} {...entry} />;
      })}
      {[...Array(emptyEntries)].map((_, idx) => {
        return <Td key={idx} />;
      })}
    </tr>
  );
}

type THeadProps = {
  studyInfo: TStudyInfo;
};

function THead({ studyInfo }: THeadProps) {
  return (
    <thead>
      <tr>
        <th>
          <p>Дисциплина</p>
        </th>
        {studyInfo.attributeNames.map((attributeName) => {
          return (
            <th key={attributeName}>
              <p>{attributeName}</p>
            </th>
          );
        })}
        <th>
          <p>Список</p>
        </th>
      </tr>
    </thead>
  );
}

type TBodyProps = {
  studyInfo: TStudyInfo;
};

function TBody({ studyInfo }: TBodyProps) {
  const disciplines = studyInfo.disciplines;
  const scheduleSlots = Math.max(
    0,
    ...disciplines.map((discipline) => discipline.schedule.length)
  );

  return (
    <tbody>
      {disciplines.map((discipline, idx) => {
        return (
          <Discipline
            key={idx}
            discipline={discipline}
            scheduleSlots={scheduleSlots}
            attributeNames={studyInfo.attributeNames}
          />
        );
      })}
    </tbody>
  );
}

type TableProps = {
  studyInfo: TStudyInfo;
};

export default function Table({ studyInfo }: TableProps) {
  return (
    <table>
      <THead studyInfo={studyInfo} />
      <TBody studyInfo={studyInfo} />
    </table>
  );
}
