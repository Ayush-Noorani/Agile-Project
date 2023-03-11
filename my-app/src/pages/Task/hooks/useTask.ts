import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setFilter } from "../../../store/reducers/filters";
import { setColumns } from "../../../store/reducers/project";
import { RootState } from "../../../store/store";
import {
  Columntype,
  Member,
  Priority,
  Tasks,
  TasksRecord,
} from "../../../types/common";
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

  const [newColumn, setNewColumn] = useState<Columntype>({
    label: "",
    value: "",
  });
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);
  const currentProject = projects.find((project) => project.id === projectId);
  const filters = useSelector((state: RootState) => state.filters);
  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);
  const columns: Columntype[] | [] = currentProject?.columns || [];
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
  const updateColumns = () => {
    dispatch(
      setColumns({
        projectIndex: projects.findIndex((item) => item.id === projectId),
        columns: [...columns, newColumn],
      })
    );
    setNewColumn({
      label: "",
      value: "",
    });
  };

  const deleteColumns = (index: number) => {
    dispatch(
      setColumns({
        projectIndex: projects.findIndex((item) => item.id === projectId),
        columns: columns.filter((item, i) => i !== index),
      })
    );
  };
  const saveColumns = () => {
    let columnValue = columns;
    if (newColumn.label && newColumn.value) {
      columnValue = [...columns, newColumn];
    }
    axiosInstance
      .put(`/project/column/update/${projectId}`, {
        columns: columnValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTasks = (id?: string) => {
    axiosInstance
      .get("/task/list/" + projectId)
      .then((res) => {
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
  const setFilters = (data: any) => {
    console.log({
      ...filters,
      ...data,
    });
    dispatch(
      setFilter({
        ...filters,
        ...data,
      })
    );
    console.log(filters);
  };
  return {
    tasks,
    value,
    formData,
    columns,
    newColumn,
    filters,
    currentProject,
    setFilters,
    setNewColumn,
    deleteColumns,
    updateColumns,
    saveColumns,
    getTasks,
    updateSequence,
    getExistingTaskData,
    submitFormData,
    handleDeleteForAdditionalFiles,
    handleFormDataUpdate,
    updateData,
  };
};
