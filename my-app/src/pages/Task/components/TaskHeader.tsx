import { Avatar, Box } from "@mui/material";
import React from "react";
import { TypoGraphyImage } from "../../../components/Common/TypoGraphyImage";
import { useTask } from "../hooks/useTask";

export const TaskHeader = ({ id }: { id: string }) => {
  const { currentProject, setFilters, filters } = useTask(id);
  const onClick = (id: string) => {
    if (filters?.id && filters?.id.includes(id)) {
      setFilters({
        id: filters?.id.filter((value: string) => value !== id),
      });
    } else {
      setFilters({
        id: filters?.id ? [...filters?.id, id] : [id],
      });
    }
  };
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {currentProject?.members.map((value) => {
          return (
            <TypoGraphyImage
              onClick={() => onClick(value.username)}
              name={value.name}
              color={value.color}
              isSelected={filters?.id && filters?.id.includes(value.username)}
              url={value.img}
            />
          );
        })}
      </Box>
    </Box>
  );
};
