import * as React from "react";

import { ColorPicker } from "../ColorPicker";

import { TScheduleEntry } from "../../types/StudyInfo";

type Props = {
  entry: TScheduleEntry;
  onChange: (newEntry: TScheduleEntry) => void;
  onDelete?: () => void;
  hideModal: () => void;
};

type State = TScheduleEntry;

class ScheduleEntryDialog extends React.Component<Props, State> {
  readonly state: State = this.props.entry;

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
    const { color, content } = this.state;

    return (
      <>
        <ColorPicker
          color={color}
          onChange={(newColor) => this.setState({ color: newColor })}
        />
        <textarea
          value={content}
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

export { ScheduleEntryDialog };
