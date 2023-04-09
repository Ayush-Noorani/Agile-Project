import produce from "immer";
import { useMemo, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Columntype } from "../../types/common";
import { Columnlist } from "./Components/ColumnList";
import { colors } from "../../utils/Common";

interface DragAndDropProps {
  data: any;
  order: any[] | undefined;
  onValueChange: (value: any) => void;
  onClick?: (value: any) => void;
  columns: Columntype[];
  filters?: any;
  planId: string | undefined;
}
export const DragAndDrop = ({
  data,
  order,
  onClick,
  columns,
  filters,
  planId,
  onValueChange,
}: DragAndDropProps) => {
  const defaultOrder = columns;
  const [columnOrder, setColumnOrder] = useState<Columntype[]>(columns);
  const onDragEnd = (result: any) => {
    if (planId) {
      return;
    }
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setColumnOrder(newColumnOrder);
      localStorage.setItem("columnOrder", JSON.stringify(newColumnOrder));
    }
    const home = source.droppableId;
    const foreign = destination.droppableId;
    let newData: any = {};
    if (home === foreign) {
      if (source.index === destination.index) {
        return;
      }
      newData = produce(data, (draftState: any) => {
        const newTaskIds = Array.from(draftState[home]);
        const replaced = draftState[home][source.index];
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, replaced);
        draftState[home] = newTaskIds;
      });
    } else {
      newData = produce(data, (draftState: any) => {
        const data = draftState[source.droppableId][source.index];
        draftState[source.droppableId] = draftState[source.droppableId].filter(
          (item: any) => item.id !== data.id
        );
        draftState[destination.droppableId].splice(destination.index, 0, data);
      });
    }
    console.log("SEQUENCE CHANGE", newData);
    onValueChange(newData);
  };

  const renderColumns = useMemo(() => {
    console.log("render");
    return columns.map((column: Columntype, index: any) => {
      let columnData: any = [];

      if (filters?.id && filters?.id.length > 0) {
        console.log(data[column.value], filters.id);
        columnData = data[column.value].filter(
          (task: any) =>
            task.assignee.some((assigned: any) =>
              filters.id.includes(assigned.username)
            ) ||
            task.reportTo.some((member: any) =>
              filters.id.includes(member.username)
            )
        );
      } else {
        columnData = data[column.value] || [];
      }

      return (
        <Columnlist
          key={column.value}
          onClick={onClick}
          column={column}
          taskMap={columnData}
          index={index}
        />
      );
    });
  }, [columnOrder, data]);
  return (
    <div
      style={{
        backgroundColor: colors.tertiary,
        overflow: "auto",
        height: "100%",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided: any) => (
            <div
              style={{ display: "flex", flexDirection: "row" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {renderColumns}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
