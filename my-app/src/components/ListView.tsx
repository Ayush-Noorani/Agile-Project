import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import { baseURL } from "../helper/axios";
export interface ListProps {
  data: any[];
  action: Function[];
}

export const ListView = ({ data, action }: ListProps) => {
  console.log(data);
  return (
    <List>
      {data.map((item, index) => (
        <ListItem
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginTop: "3px",
          }}
          key={index.toString()}
        >
          <ListItemAvatar>
            <Avatar>
              <img alt={"img"} src={`${baseURL}/static/users/${item.id}.png`} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.username} />
          {action.map((value, index) => value(item.id))}
        </ListItem>
      ))}
    </List>
  );
};
