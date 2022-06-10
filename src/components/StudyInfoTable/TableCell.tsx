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

  const innerProps = {
    onContextMenu: onContextMenu,
    className: `${color || "white"}-bg`,
    dangerouslySetInnerHTML: {
      __html: new showdown.Converter().makeHtml(content),
    },
  };

  return isHeader === true ? <th {...innerProps} /> : <td {...innerProps} />;
}

export { TableCell };
