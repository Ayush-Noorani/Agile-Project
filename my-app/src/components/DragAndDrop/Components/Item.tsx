import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import { TaskPriorityIcon } from "../../Common/Priority";
import { TypoGraphyImage } from "../../Common/TypoGraphyImage";
const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  height: 15vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 90%;
  margin-bottom: 8px;
  height: fit-content;
  background-color: ${(props: { isDragging: any }) =>
    props.isDragging ? "#EDEDED" : "white"};
`;

export const Item = ({ ...props }: any) => (
  <Draggable draggableId={props.task.id} index={props.index}>
    {(
      provided: {
        draggableProps: any;
        dragHandleProps: any;
        innerRef: any;
      },
      snapshot: { isDragging: any }
    ) => (
      <Container
        onClick={() => props.onClick(props.task.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>{props.task.taskName}</h5>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {props.task.assigned_user.length > 0 &&
              props.task.assigned_user.map((assigned: any) => (
                <TypoGraphyImage name={assigned.name} url={assigned.img} />
              ))}
          </Box>
          {props.task.priority && (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TaskPriorityIcon priority={props.task.priority} />
              {props.task.priority}
            </Box>
          )}
        </div>
        {console.log("HERE")}
      </Container>
    )}
  </Draggable>
);
