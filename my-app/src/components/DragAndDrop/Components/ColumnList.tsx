import React from "react";
import { Column } from "./Column";

interface ColumnListProps {
  columnId: any;
  taskMap: any;
  index: any;
  onClick: any;
}
export const Columnlist = ({
  columnId,
  taskMap,
  index,
  onClick,
}: ColumnListProps) => {
  return (
    <Column
      onClick={onClick}
      columnId={columnId}
      tasks={taskMap}
      index={index}
    />
  );
};
