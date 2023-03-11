import produce from "immer";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Columntype } from "../../types/common";
import { Columnlist } from "./Components/ColumnList";

interface DragAndDropProps {
  data: any;
  order: any[] | undefined;
  onValueChange: (value: any) => void;
  onClick?: (value: any) => void;
  columns: Columntype[];
  filters?: any;
}
export const DragAndDrop = ({
  data,
  order,
  onClick,
  columns,
  filters,
  onValueChange,
}: DragAndDropProps) => {
  let defaultOrder = columns;
  const [columnOrder, setColumnOrder] = useState<Columntype[]>(defaultOrder);
  const onDragEnd = (result: any) => {
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
    onValueChange(newData);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc" }}>
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
              {columnOrder.map((column: Columntype, index: any) => {
                let columnData: any = [];

                if (filters?.id && filters?.id.length > 0) {
                  console.log(data[column.value], filters.id);
                  columnData = data[column.value].filter(
                    (task: any) =>
                      task.assigned_user.some((assigned: any) =>
                        filters.id.includes(assigned.username)
                      ) ||
                      task.reporter_user.some((member: any) =>
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
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
