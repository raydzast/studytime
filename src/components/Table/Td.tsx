import * as React from "react";
import * as showdown from "showdown";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = TScheduleEntry & {
  onContextMenu?: React.MouseEventHandler;
};

function Td({ color, content, onContextMenu }: Props) {
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

export { Td };
