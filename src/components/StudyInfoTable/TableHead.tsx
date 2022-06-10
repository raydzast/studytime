import * as React from "react";

type Props = {
  attributeNames: Array<string>;
  scheduleSlotCount: number;
};

function TableHead({ attributeNames, scheduleSlotCount }: Props) {
  return (
    <thead>
      <tr>
        <th></th>
        <th>
          <p>Дисциплина</p>
        </th>
        {attributeNames.map((attributeName) => (
          <th key={attributeName}>
            <p>{attributeName}</p>
          </th>
        ))}
        <th colSpan={scheduleSlotCount + 1}>
          <p>Список</p>
        </th>
      </tr>
    </thead>
  );
}

export { TableHead };
