import * as React from "react";

import { ColorPicker } from "../ColorPicker";

import { TTableCellValue } from "./types";

type Props = {
  value?: TTableCellValue;
  onChange: (newValue: TTableCellValue) => void;
  onDelete?: () => void;
  hideModal: () => void;
  withColor?: boolean;
};

type State = TTableCellValue;

class TableCellDialog extends React.Component<Props, State> {
  readonly state: State = this.props.value;

  handleApplyClick = () => {
    const { onChange, hideModal } = this.props;

    onChange(this.state);
    hideModal();
  };

  handleDeleteClick = () => {
    const { onDelete, hideModal } = this.props;

    onDelete();
    hideModal();
  };

  render() {
    const { onDelete, hideModal } = this.props;
    const { color, content } = this.state || {};
    const withColor = this.props.withColor !== false;

    return (
      <>
        {withColor === true && (
          <ColorPicker
            color={color || "white"}
            onChange={(newColor) => this.setState({ color: newColor })}
          />
        )}
        <textarea
          value={content || ""}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <br />
        <button onClick={this.handleApplyClick}>Apply</button>
        <button onClick={hideModal}>Cancel</button>
        {onDelete && <button onClick={this.handleDeleteClick}>Delete</button>}
      </>
    );
  }
}

export { TableCellDialog };
