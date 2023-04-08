import { useState, useEffect, useMemo } from "react";
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
import { useProject } from "../../Projects/hooks/useProject";
import { useCommon } from "../../../hooks/useCommon";
import { usePlan } from "../../Plan/hooks/usePlan";
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

export const useTask = (projectId?: string, planId?: string) => {
  const [tasks, setTasks] = useState<TasksRecord>({});
  const [value, setValue] = useState<any>();
  const { fetchAllProjects, projectList } = useProject();
  const { loading, setLoaderState } = useCommon();
  const { form, plans, createPlan, getPlans } = usePlan(projectId, planId);

  const [newColumn, setNewColumn] = useState<Columntype>({
    label: "",
    value: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setLoaderState(true);
    console.log("true", projectList);
    fetchAllProjects();
    if (planId) {
      getRetroRespectiveTasks();
    } else {
      getTasks(undefined, projectId);
      getPlans({
        status: 1,
      });
    }
    console.log("false", projectList);
    setLoaderState(false);
  }, []);

  const currentProjectState = projectList.find(
    (project) => project.id === projectId
  );
  const [currentProject, setCurrentProject] = useState(currentProjectState);
  const filters = useSelector((state: RootState) => state.filters);
  console.log(projectList, "projectList");

  const [column, setColumn] = useState<Columntype[]>([]);
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
  useEffect(() => {
    if (projectList.length > 0) {
      setCurrentProject((_prev) => {
        const data = projectList.find((project) => project.id === projectId);
        setColumn(data!.columns);
        return data;
      });
    }
  }, [projectList]);

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
    console.log(key, value);
    setFormData((prev) => {
      switch (key) {
        case "additionalFiles": {
          let files: File[] = [];
          if (value) {
            files = Array.from(value);
          }
          return {
            ...prev,
            additionalFiles:
              prev.additionalFiles && prev.additionalFiles.concat(files),
          };
        }

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
        projectIndex: projectList.findIndex((item) => item.id === projectId),
        columns: [...column, newColumn],
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
        projectIndex: projectList.findIndex((item) => item.id === projectId),
        columns: column.filter((item, i) => i !== index),
      })
    );
  };
  const saveColumns = () => {
    let columnValue = column;
    if (newColumn.label && newColumn.value) {
      columnValue = [...column, newColumn];
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
  const getRetroRespectiveTasks = () => {
    setLoaderState(true);
    console.log(
      `%c FETCH RETRORESPECTIVE \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    axiosInstance
      .get(`/plan/retroSpection/${planId}`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.tasks);
        setColumn(res.data.columns);
        setLoaderState(false);
      })
      .catch((err) => {
        setLoaderState(false);
        console.error(err);
      });
  };

  const getTasks = (TaskId?: string | undefined, projectId?: string) => {
    console.log(
      `%c FETCH ALL TASKS \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    if (projectId) {
      axiosInstance
        .get("/task/list/" + projectId)
        .then((res) => {
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
              //@ts-ignore
              assignedTo: value.assignee || [],
              reportTo: value.reportTo || [],
              additionalFiles: value.additionalFiles,
              status: value.status,
              priority: value.priority,
            });
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getExistingTaskData = (id: string) => {
    // console.log(Object.values(tasks).flatMap((value) => value));
    setValue(
      Object.values(tasks)
        .flatMap((value) => value)
        .find((task: Tasks) => task.id === id)
    );
  };

  const updateData = (data: any) => {
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

  const createData = (data: any, plan: string) => {
    console.log("creating task", data);
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

  const submitFormData = (plan?: string) => {
    setLoaderState(true);
    const submitData: any = new FormData();

    // submitData.append("data", JSON.stringify(formData));
    formData.id ? updateData(formData) : createData(formData, plan!);
    setLoaderState(false);
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
        getTasks(undefined, projectId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setFilters = (data: any) => {
    dispatch(
      setFilter({
        ...filters,
        ...data,
      })
    );
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
    getRetroRespectiveTasks,
    setColumn,
  };
};
