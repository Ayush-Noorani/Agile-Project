import React from "react";
import { Column } from "./Column";

interface ColumnListProps {
  columnId: any;
  taskMap: any;
  index: any;
}
export const Columnlist = ({ columnId, taskMap, index }: ColumnListProps) => {
  return <Column columnId={columnId} tasks={taskMap} index={index} />;
};
