import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
export interface ListProps {
  data: any[];
  action: Function[];
}

export const ListView = ({ data, action }: ListProps) => {
  return (
    <List>
      {data.map((item, index) => (
        <ListItem
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginTop: "3px",
          }}
          key={index}
        >
          <ListItemAvatar>
            <Avatar>
              <img alt={"img"} src={item.url} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} />
          {action.map((value, index) => value(item.id))}
        </ListItem>
      ))}
    </List>
  );
};
