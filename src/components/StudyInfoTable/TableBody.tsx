import * as React from "react";

import { TDiscipline, TStudyInfo } from "../../types/StudyInfo";
import { DisciplineRow } from "./DisciplineRow";
import { TableCellDialog } from "./TableCellDialog";

type Props = {
  studyInfo: TStudyInfo;
  scheduleSlotCount: number;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

type State = {
  draggedRowIdx: number | null;
};

class TableBody extends React.Component<Props, State> {
  readonly state: State = {
    draggedRowIdx: null,
  };

  handleAddClick = () => {
    const { studyInfo, onChange, showModal, hideModal } = this.props;

    showModal(() => {
      return (
        <TableCellDialog
          onChange={(value) => {
            const newDiscipline = new TDiscipline();
            newDiscipline.name = value.content;
            newDiscipline.color = value.color;
            studyInfo.disciplines.push(newDiscipline);
            onChange(studyInfo);
          }}
          hideModal={hideModal}
        />
      );
    });
  };

  render() {
    const { studyInfo, scheduleSlotCount, showModal, hideModal, onChange } = this.props;
    const { disciplines, attributeNames } = studyInfo;

    return (
      <tbody>
        {disciplines.map((discipline, idx) => (
          <DisciplineRow
            key={idx}
            discipline={discipline}
            scheduleSlotCount={scheduleSlotCount}
            attributeNames={attributeNames}
            showModal={showModal}
            hideModal={hideModal}
            onChange={(newDiscipline) => {
              studyInfo.disciplines[idx] = newDiscipline;
              onChange(studyInfo);
            }}
            onDelete={() => {
              studyInfo.disciplines.splice(idx, 1);
              onChange(studyInfo);
            }}
            onDragStart={() => {
              this.setState({ draggedRowIdx: idx });
            }}
            onDrop={() => {
              this.setState({ draggedRowIdx: null });

              const { disciplines } = studyInfo;
              const [from, to] = [this.state.draggedRowIdx, idx];
              const draggedElement = disciplines[from];

              disciplines.splice(from, 1);
              disciplines.splice(to, 0, draggedElement);

              onChange(studyInfo);
            }}
          />
        ))}
        <tr>
          <td className="table-add-button" onClick={this.handleAddClick}>
            +
          </td>
        </tr>
      </tbody>
    );
  }
}

export { TableBody };
