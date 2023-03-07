import React from "react";
import { Column } from "./Column";

interface ColumnListProps {
  column: any;
  taskMap: any;
  index: any;
  onClick: any;
}
export const Columnlist = ({
  column,
  taskMap,
  index,
  onClick,
}: ColumnListProps) => {
  return (
    <Column onClick={onClick} column={column} tasks={taskMap} index={index} />
  );
};
