import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Columnlist } from "./Components/ColumnList";

interface DragAndDropProps {
  data: any;
}
export const DragAndDrop = ({ data }: DragAndDropProps) => {
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

    // if (type === 'column') {
    //   const newColumnOrder = Array.from(this.state.columnOrder);
    //   newColumnOrder.splice(source.index, 1);
    //   newColumnOrder.splice(destination.index, 0, draggableId);

    //   const newState = {
    //     ...this.state,
    //     columnOrder: newColumnOrder,
    //   };
    //   this.setState(newState);
    //   return;
    // }

    // const home = this.state.columns[source.droppableId];
    // const foreign = this.state.columns[destination.droppableId];

    // if (home === foreign) {
    //   const newTaskIds = Array.from(home.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newHome = {
    //     ...home,
    //     taskIds: newTaskIds,
    //   };

    //   const newState = {
    //     ...this.state,
    //     columns: {
    //       ...this.state.columns,
    //       [newHome.id]: newHome,
    //     },
    //   };

    //   this.setState(newState);
    //   return;
    // }

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
              {data.columnOrder.map((columnId: string | number, index: any) => {
                const column = data.columns[columnId];
                return (
                  <Columnlist
                    key={column.id}
                    column={column}
                    taskMap={data.tasks}
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
