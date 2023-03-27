import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../helper/axios";
import { setFilter } from "../../../redux/reducers/filters";
import { setColumns } from "../../../redux/reducers/project";
import { RootState } from "../../../redux/store";
import {
  Columntype,
  Member,
  Priority,
  Tasks,
  TasksRecord,
} from "../../../types/common";
import { consoleStatement } from "../../../utils/Common";
import { useProject } from "../../Projects/hooks/useProject";
type Task = {
  id?: string;
  description: string;
  summary: string;
  taskName: string;
  assignedTo: String[];
  reportTo: String[];
  additionalFiles?: File[];
  status: "toDo" | "inProgres";
  priority: Priority;
};

export const useTask = (projectId?: string, planId?: string) => {
  const [tasks, setTasks] = useState<TasksRecord>({});
  const [value, setValue] = useState<any>();
  const { fetchAllProjects } = useProject();

  const [newColumn, setNewColumn] = useState<Columntype>({
    label: "",
    value: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllProjects();
  }, []);
  const projects = useSelector((state: RootState) => state.project.projects);
  const currentProject = projects.find((project) => project.id === projectId);
  const filters = useSelector((state: RootState) => state.filters);
  const columns: Columntype[] | [] = currentProject?.columns || [];
  const [column, setColumn] = useState(columns);
  const [formData, setFormData] = useState<Task>({
    id: undefined,
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

  const handleFormDataUpdate = (key: keyof Task, value: any) => {
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
        console.log(
          `%c UPDATE COLUMNS \n`,
          `background:green; color: white;  font-weight: bold;`
        );
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRetoRespectiveTasks = () => {
    axiosInstance
      .get(`/task/list/${projectId}`)
      .then((res) => {
        console.log(
          `%c FETCH RETRORESPECTIVE \n`,
          `background:green; color: white;  font-weight: bold;`
        );
        setTasks(res.data.tasks);
        setColumn(res.data.columns);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTasks = (TaskId?: string | undefined, projectId?: string) => {
    axiosInstance
      .get("/task/list/" + projectId)
      .then((res) => {
        console.log(
          `%c FETCH ALL TASKS \n`,
          `background:green; color: white;  font-weight: bold;`
        );
        setTasks(res.data);
        if (TaskId) {
          const value: Task = Object.values(res.data)
            .flatMap((value) => value)
            .find((task: any) => task.id === TaskId) as unknown as Task;
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
    // console.log(Object.values(tasks).flatMap((value) => value));
    setValue(
      Object.values(tasks)
        .flatMap((value) => value)
        .find((task: Tasks) => task.id === id)
    );
  };

  const updateData = (data: FormData) => {
    axiosInstance
      .put(`/task/update/${formData.id}`, data)
      .then((res) => {
        console.log(
          `%c UPDATE TASKS \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createData = (data: FormData) => {
    console.log("creating task");
    axiosInstance
      .post(`/task/create/${projectId}`, data)
      .then(() => {
        console.log(
          `%c CREATE TASKS \n`,
          `background:green; color: white;  font-weight: bold;`,
          data
        );
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
    formData.id ? updateData(submitData) : createData(submitData);
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
        console.log(
          `%c UPDATE SEQUENCE \n`,
          `background:green; color: white;  font-weight: bold;`,
          data
        );
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
    column,
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
    getRetoRespectiveTasks,
  };
};
