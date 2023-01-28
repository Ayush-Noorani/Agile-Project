import React from "react";
import { Column } from "./Column";

interface ColumnListProps {
  column: any;
  taskMap: any;
  index: any;
}
export const Columnlist = ({ column, taskMap, index }: ColumnListProps) => {
  const tasks = column.taskIds.map(
    (taskId: string | number) => taskMap[taskId]
  );
  console.log(column, tasks);
  return <Column column={column} tasks={tasks} index={index} />;
};
