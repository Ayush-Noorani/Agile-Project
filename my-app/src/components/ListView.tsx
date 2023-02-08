import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import { url } from "../helper/axios";
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
              <img alt={"img"} src={`${url}/static/users/${item.url}.png`} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} />
          {action.map((value, index) => value(item.id))}
        </ListItem>
      ))}
    </List>
  );
};
