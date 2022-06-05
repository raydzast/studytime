import * as React from "react";

import { ColorButton } from "./ColorButton";

const COLORS = ["white", "green", "orange", "red"];

type Props = {
  color: string;
  onChange: (newColor: string) => void;
};

function ColorPicker({ color, onChange }: Props) {
  return (
    <div className="color-picker">
      {COLORS.map((currentColor) => (
        <ColorButton
          key={currentColor}
          color={currentColor}
          active={currentColor == color}
          onClick={() => onChange(currentColor)}
        />
      ))}
    </div>
  );
}

export { ColorPicker };
