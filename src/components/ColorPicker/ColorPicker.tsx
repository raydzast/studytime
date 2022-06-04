import * as React from "react";

import { ColorButton } from "./ColorButton";

const COLORS = ["white", "green", "orange", "red"];
const DEFAULT_COLOR = "white";

function ColorPicker() {
  const [color, setColor] = React.useState(DEFAULT_COLOR);

  return (
    <div className="color-picker">
      {COLORS.map((currentColor) => (
        <ColorButton
          key={currentColor}
          color={currentColor}
          active={currentColor == color}
          onClick={() => setColor(currentColor)}
        />
      ))}
    </div>
  );
}

export { ColorPicker };
