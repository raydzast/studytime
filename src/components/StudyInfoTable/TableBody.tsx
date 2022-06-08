import * as React from "react";

import { TDiscipline, TStudyInfo } from "../../types/StudyInfo";
import { DisciplineRow } from "./DisciplineRow";
import { TableCellDialog } from "./TableCellDialog";

type Props = {
  studyInfo: TStudyInfo;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newStudyInfo: TStudyInfo) => void;
};

class TableBody extends React.Component<Props> {
  handleAddClick = () => {
    const { studyInfo, onChange, showModal, hideModal } = this.props;

    showModal(() => {
      return <TableCellDialog 
        onChange={(value) => {
          const newDiscipline = new TDiscipline();
          newDiscipline.name = value.content;
          newDiscipline.color = value.color;
          studyInfo.disciplines.push(newDiscipline);
          onChange(studyInfo);
        }}
        hideModal={hideModal}
      />;
    });
  };

  render() {
    const { studyInfo, showModal, hideModal, onChange } = this.props;
    const { disciplines, attributeNames } = studyInfo;
    const scheduleSlotCount =
      disciplines.length === 0
        ? 0
        : Math.max(...disciplines.map(({ schedule }) => schedule.length));

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
