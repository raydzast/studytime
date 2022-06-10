import * as React from "react";

type Props = {
  children: React.ReactNode;
  onDragStart: () => void;
  onDrop: () => void;
};

type State = {
  currentTarget: EventTarget | null;
  isDragOver: boolean;
  isDragged: boolean;
};

class DraggableTableRow extends React.Component<Props, State> {
  readonly state: State = {
    currentTarget: null,
    isDragOver: false,
    isDragged: false,
  };

  handleRowDragStart = () => {
    this.setState({ isDragged: true });
    this.props.onDragStart();
  };

  handleRowDragEnd = () => {
    this.setState({ isDragged: false });
  };

  handleRowDragEnter = (event: React.MouseEvent) => {
    this.setState({
      currentTarget: event.target,
      isDragOver: true,
    });
  };

  handleRowDragLeave = (event: React.MouseEvent) => {
    const { relatedTarget } = event;

    this.setState((state) => ({
      isDragOver: state.currentTarget === relatedTarget,
    }));
  };

  handleRowDragOver = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  handleRowDrop = () => {
    this.setState({ isDragOver: false });
    this.props.onDrop();
  };

  render() {
    const { isDragOver, isDragged } = this.state;

    const classList = [
      isDragOver ? "drag-over" : "",
      isDragged ? "dragged" : "",
    ];
    const className = classList.filter(s => s !== "").join(" ");

    return (
      <tr
        className={className}
        onDragStart={this.handleRowDragStart}
        onDragEnd={this.handleRowDragEnd}
        onDragOver={this.handleRowDragOver}
        onDragEnter={this.handleRowDragEnter}
        onDragLeave={this.handleRowDragLeave}
        onDrop={this.handleRowDrop}
      >
        <td className="white-bg drag-button">⋮<button draggable={true} /></td>
        {this.props.children}
      </tr>
    );
  }
}

export { DraggableTableRow };
