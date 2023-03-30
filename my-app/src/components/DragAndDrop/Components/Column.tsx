import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Item } from "./Item";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  width: 18rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  align-self: center;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  border-radius: 10px;
  marigin: 5px;
  background-color: ${(props: { isDraggingOver: any }) =>
    props.isDraggingOver ? "#ffff" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = ({ ...props }: any) => {
  return props.tasks.map((task: any, index: any) => (
    <Item key={task.id} onClick={props.onClick} task={task} index={index} />
  ));
};

export const Column = ({ ...props }: any) => {
  return (
    <Draggable draggableId={props.column.value} index={props.index}>
      {(provided: {
        draggableProps: any;
        innerRef: any;
        dragHandleProps: any;
      }) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.label}</Title>
          <Droppable droppableId={props.column.value} type="task">
            {(
              provided: {
                innerRef: any;
                droppableProps: any;
                placeholder: any;
              },
              snapshot: { isDraggingOver: any }
            ) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={props.tasks} onClick={props.onClick} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
