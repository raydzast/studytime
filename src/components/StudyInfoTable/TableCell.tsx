import * as React from "react";
import * as showdown from "showdown";

import { TTableCellValue } from "./types";

type Props = {
  value?: TTableCellValue;
  onContextMenu?: React.MouseEventHandler;
};

function TableCell({ value, onContextMenu }: Props) {
  const { color, content } = value || {};
  
  return (
    <td
      onContextMenu={onContextMenu}
      className={`${color || "white"}-bg`}
      dangerouslySetInnerHTML={{
        __html: new showdown.Converter().makeHtml(content),
      }}
    />
  );
}

export { TableCell };
