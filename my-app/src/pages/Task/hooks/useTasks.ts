import { useState } from "react";
import { axiosInstance } from "../../../helper/axios";
import { Member, Priority, Tasks, TasksRecord } from "../../../types/common";
type Task = {
  id?: string;
  description: string;
  summary: string;
  taskName: string;
  assignedTo: Member[];
  reportTo: Member[];
  additionalFiles?: File[];
  status: "toDo" | "inProgres";
  priority: Priority;
};

export const useTask = (projectId?: string) => {
  const [tasks, setTasks] = useState<TasksRecord>({});
  const [value, setValue] = useState<any>();

  const [formData, setFormData] = useState<Task>({
    id: "",
    description: "",
    summary: "",
    taskName: "",
    assignedTo: [],
    reportTo: [],
    additionalFiles: [],
    status: "toDo",
    priority: "minor",
  });
  const handleDeleteForAdditionalFiles = (index: number) => {
    setFormData((prev) => {
      return {
        ...prev,
        additionalFiles:
          prev.additionalFiles &&
          prev.additionalFiles.filter((file, i) => i != index),
      };
    });
  };

  const handleFormDataUpdate = (
    key: keyof Task,
    value: any,
    indexForArray?: number
  ) => {
    setFormData((prev) => {
      switch (key) {
        case "additionalFiles":
          const files: File[] = value ? Array.from(value) : [];
          return {
            ...prev,
            additionalFiles:
              prev.additionalFiles && prev.additionalFiles.concat(files),
          };

        default:
          return {
            ...prev,
            [key]: value,
          };
      }
    });
  };

  const getTasks = (id?: string) => {
    axiosInstance
      .get("/task/list/" + projectId)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
        if (id) {
          const value: Task = Object.values(res.data)
            .flatMap((value) => value)
            .find((task: any) => task.id === id) as unknown as Task;
          setFormData({
            id: value.id,
            description: value.description,
            summary: value.summary,
            taskName: value.taskName,
            assignedTo: value.assignedTo || [],
            reportTo: value.reportTo || [],
            additionalFiles: value.additionalFiles,
            status: value.status,
            priority: value.priority,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getExistingTaskData = (id: string) => {
    console.log(Object.values(tasks).flatMap((value) => value));
    setValue(
      Object.values(tasks)
        .flatMap((value) => value)
        .find((task: Tasks) => task.id === id)
    );
  };

  const updateData = () => {
    axiosInstance
      .put(`/task/update/${formData.id}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitFormData = () => {
    const submitData: any = new FormData();
    for (var key in formData) {
      submitData.append(key, formData[key as keyof Task]);
    }

    // submitData.append("data", JSON.stringify(formData));

    axiosInstance
      .post(`/task/create/` + projectId, submitData)
      .then(() => {
        console.log("sent data");
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
      .put(`/task/update/sequence/${projectId}`, data)
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
    formData,
    getTasks,
    updateSequence,
    getExistingTaskData,
    submitFormData,
    handleDeleteForAdditionalFiles,
    handleFormDataUpdate,
    updateData,
  };
};
