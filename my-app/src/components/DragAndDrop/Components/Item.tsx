import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Title } from "@mui/icons-material";
import { MenuItem, Menu, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Assigned } from "./Assigned";
const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  height: 15vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 90%;
  margin-bottom: 8px;
  background-color: ${(props: { isDragging: any }) =>
    props.isDragging ? "#EDEDED" : "white"};
`;

export const Item = ({ ...props }: any) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(props.task);
  return (
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
            <h5>{props.task.title}</h5>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={anchorEl ? true : false}
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => setOpen(false)}>Edit</MenuItem>
              <MenuItem onClick={() => setOpen(false)}>Delete</MenuItem>
            </Menu>
          </div>
          <Assigned data={props.task.members} />
        </Container>
      )}
    </Draggable>
  );
};
