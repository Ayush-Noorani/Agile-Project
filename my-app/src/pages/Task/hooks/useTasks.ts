import { useState } from "react";
import { axiosInstance } from "../../../helper/axios";
import { Tasks, TasksRecord } from "../../../types/common";

export const useTask = (id: string) => {
  const [tasks, setTasks] = useState<TasksRecord>({});
  const [value, setValue] = useState<any>();
  const getTasks = () => {
    axiosInstance
      .get("/task/list/" + id)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getExistingTaskData = (id: string) => {
    setValue(
      Object.values(tasks)
        .flatMap((value) => value)
        .find((task: Tasks) => task.id === id)
    );
  };
  const updateTask = (id: string, data: any) => {
    axiosInstance
      .put(`/task/update/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSequence = (tasks: any) => {
    const data: any = {};
    setTasks(tasks);
    Object.keys(tasks).forEach((key) => {
      data[key] = tasks[key].map((task: Tasks) => task.id);
    });
    axiosInstance
      .put(`/task/update/sequence/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    tasks,
    value,
    getTasks,
    updateTask,
    updateSequence,
    getExistingTaskData,
  };
};
