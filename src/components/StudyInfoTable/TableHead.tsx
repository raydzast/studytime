import * as React from "react";

type Props = {
  attributeNames: Array<string>;
};

function TableHead({ attributeNames }: Props) {
  return (
    <thead>
      <tr>
        <th>
          <p>Дисциплина</p>
        </th>
        {attributeNames.map((attributeName) => (
          <th key={attributeName}>
            <p>{attributeName}</p>
          </th>
        ))}
        <th>
          <p>Список</p>
        </th>
      </tr>
    </thead>
  );
}

export { TableHead };
