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
import { TypoGraphyImage } from "./Common/TypoGraphyImage";
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
            <TypoGraphyImage color={item.color} name={item.username} />
          </ListItemAvatar>
          <ListItemText primary={item.username} />
          {action.map((value, index) => value(item.id))}
        </ListItem>
      ))}
    </List>
  );
};
