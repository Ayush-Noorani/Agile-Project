import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Columnlist } from "./Components/ColumnList";

interface DragAndDropProps {
  data: any;
  order: any[] | undefined;
}
export const DragAndDrop = ({ data, order }: DragAndDropProps) => {
  let defaultOrder = ["toDo", "inProgress"];
  const [columnOrder, setColumnOrder] = useState<string[]>(
    order ? order : defaultOrder
  );
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
    console.log(source);
    const home = source.droppableId;
    const foreign = destination.droppableId;

    if (home === foreign) {
      const newTaskIds = Array.from(
        data.filter((value: any) => value.id == home)
      );
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      return;
    }

    // moving from one list to another
    // const homeTaskIds = Array.from(home.taskIds);
    // homeTaskIds.splice(source.index, 1);
    // const newHome = {
    //   ...home,
    //   taskIds: homeTaskIds,
    // };

    // const foreignTaskIds = Array.from(foreign.taskIds);
    // foreignTaskIds.splice(destination.index, 0, draggableId);
    // const newForeign = {
    //   ...foreign,
    //   taskIds: foreignTaskIds,
    // };

    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [newHome.id]: newHome,
    //     [newForeign.id]: newForeign,
    //   },
    // };
    // this.setState(newState);
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
              {(order ? order : columnOrder).map(
                (columnId: string | number, index: any) => {
                  const columnData = data
                    .filter((task: any) => task.id == columnId)
                    .map((task: { data: any }) => task.data);
                  return (
                    <Columnlist
                      key={columnId}
                      columnId={columnId}
                      taskMap={columnData}
                      index={index}
                    />
                  );
                }
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
