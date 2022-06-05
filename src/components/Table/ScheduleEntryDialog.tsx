import * as React from "react";

import { ColorPicker } from "../ColorPicker";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = {
  entry: TScheduleEntry;
  onChange: (newEntry: TScheduleEntry) => void;
};

function ScheduleEntryDialog({ entry, onChange }: Props) {
  const { color, content } = entry;

  return (
    <>
      <ColorPicker
        color={color}
        onChange={(newColor) => onChange({ ...entry, color: newColor })}
      />
      <textarea
        value={content}
        onChange={(event) =>
          onChange({ ...entry, content: event.target.value })
        }
      />
    </>
  );
}

export { ScheduleEntryDialog };
