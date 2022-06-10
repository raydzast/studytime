import * as React from "react";
import { EditableTableCell } from "./EditableTableCell";
import { TableCellDialog } from "./TableCellDialog";

type Props = {
  attributeNames: Array<string>;
  scheduleSlotCount: number;
  showModal: (renderChildren: () => React.ReactNode) => void;
  hideModal: () => void;
  onChange: (newAttributeNames: Array<string>) => void;
};

class TableHead extends React.Component<Props> {
  handleAddAttributeClick = () => {
    const { attributeNames, onChange, showModal, hideModal } = this.props;

    showModal(() => {
      return (
        <TableCellDialog
          onChange={(value) => {
            attributeNames.push(value.content);
            onChange(attributeNames);
          }}
          hideModal={hideModal}
          withColor={false}
        />
      );
    });
  }

  render() {
    const { attributeNames, scheduleSlotCount, showModal, hideModal, onChange } =
      this.props;

    return (
      <thead>
        <tr>
          <th></th>
          <th>
            <p>Дисциплина</p>
          </th>
          {attributeNames.map((attributeName, idx) => (
            <EditableTableCell
              key={attributeName}
              value={{ content: attributeName }}
              showModal={showModal}
              hideModal={hideModal}
              onChange={(value) => {
                const { content } = value;
                attributeNames[idx] = content;
                onChange(attributeNames);
              }}
              onDelete={() => {
                attributeNames.splice(idx, 1);
                onChange(attributeNames);
              }}
              withColor={false}
              isHeader={true}
            />
          ))}
          <th
            className="table-add-button"
            onClick={this.handleAddAttributeClick}
          >
            +
          </th>
          <th colSpan={scheduleSlotCount + 1}>
            <p>Список</p>
          </th>
        </tr>
      </thead>
    );
  }
}
export { TableHead };
