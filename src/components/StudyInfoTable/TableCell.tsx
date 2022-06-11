import * as React from "react";
import * as showdown from "showdown";

import { TTableCellValue } from "./types";

type Props = {
  value?: TTableCellValue;
  onContextMenu?: React.MouseEventHandler;
  isHeader?: boolean;
};

function TableCell({ value, onContextMenu, isHeader }: Props) {
  const { color, content } = value || {};

  const convertedHtml = new showdown.Converter().makeHtml(content) || "";
  const innerHtml = convertedHtml.replace(
    /<a/g,
    '$& target="_blank" rel="noreferrer noopener"'
  );

  const innerProps = {
    onContextMenu: onContextMenu,
    className: `${color || "white"}-bg`,
    dangerouslySetInnerHTML: {
      __html: innerHtml,
    },
  };

  return isHeader === true ? <th {...innerProps} /> : <td {...innerProps} />;
}

export { TableCell };
