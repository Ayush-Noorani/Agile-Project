import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
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
