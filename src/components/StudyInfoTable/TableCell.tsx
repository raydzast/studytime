import * as React from "react";
import * as showdown from "showdown";

import { TTableCellValue } from "./types";

type Props = {
  value?: TTableCellValue;
  onContextMenu?: React.MouseEventHandler;
};

function TableCell({ value: { color, content }, onContextMenu }: Props) {
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
