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
import { useSockets } from "../../../hooks/useSockets";
type Task = {
  id?: string;
  description: string;
  summary: string;
  taskName: string;
  assignedTo: Member[];
  reportTo: Member[];
  status: "toDo" | "inProgres";
  priority: Priority;
};

export const useTask = (projectId?: string, planId?: string) => {
  const [tasks, setTasks] = useState<TasksRecord>({});
  const [value, setValue] = useState<any>();
  const { fetchAllProjects, projectList } = useProject();
  const projects = useSelector((state: RootState) => state.project.projects);
  const { setLoaderState } = useCommon();

  const { getPlans } = usePlan(projectId, planId);
  const { data } = useSockets("task-list", { id: projectId }, 1500);
  const [newColumn, setNewColumn] = useState<Columntype>({
    label: "",
    value: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllProjects();
    if (planId) {
      getRetroRespectiveTasks();
    } else {
      getTasks(undefined, projectId);
      getPlans({
        status: 1,
      });
    }
  }, []);

  const currentProjectState = useMemo(
    () => projects.find((project) => project.id === projectId),
    [projectList, projects]
  );

  const [currentProject, setCurrentProject] = useState(currentProjectState);
  const filters = useSelector((state: RootState) => state.filters);

  const [column, setColumn] = useState<Columntype[]>([]);
  const [formData, setFormData] = useState<Task>({
    id: undefined,
    description: "",
    summary: "",
    taskName: "",
    assignedTo: [],
    reportTo: [],
    status: "toDo",
    priority: "minor",
  });

  const [validFields, setValidFields] = useState({
    summary: true,
    taskName: true,
    assignedTo: true,
    reportTo: true,
  });

  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProject((_prev) => {
        const data = projects.find((project) => project.id === projectId);
        setColumn(data!.columns);
        return data;
      });
    }
  }, [projectList, projects]);

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setTasks(data);
    }
  }, [data]);
  const handleFormDataUpdate = (key: keyof Task, value: any) => {
    console.log(key, value);
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const validateFormData = () => {
    setValidFields((prev) => {
      return {
        ...prev,
        taskName: !formData.taskName ? false : true,
        summary: !formData.summary ? false : true,
        assignedTo: formData.assignedTo.length === 0 ? false : true,
        reportTo: formData.reportTo.length === 0 ? false : true,
      };
    });
  };

  const updateColumns = () => {
    dispatch(
      setColumns({
        projectIndex: projectList.findIndex((item) => item.id === projectId),
        columns: [...column, newColumn],
      })
    );
    setColumn([...column, newColumn]);
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
    setLoaderState(true);
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
        setLoaderState(false);
        fetchAllProjects();
      })
      .catch((err) => {
        console.log(err);
        setLoaderState(false);
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
    setLoaderState(true);
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
              // additionalFiles: value.additionalFiles,
              status: value.status,
              priority: value.priority,
            });
          }
          setLoaderState(false);

          console.log(res.data);
        })
        .catch((err) => {
          setLoaderState(false);

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

  const updateData = async (data: any) => {
    await axiosInstance
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
    setLoaderState(false);
  };

  const createData = async (data: any, planId: String) => {
    await axiosInstance
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
    setLoaderState(false);
  };

  const submitFormData = (plan?: string) => {
    setLoaderState(true);
    //const submitData: any = new FormData();

    // submitData.append("data", JSON.stringify(formData));
    formData.id ? updateData(formData) : createData(formData, plan!);
  };

  const updateSequence = (tasks: any) => {
    const data: any = {};
    setTasks(tasks);
    setLoaderState(true);

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
        setLoaderState(false);
      })
      .catch((err) => {
        console.log(err);
        setLoaderState(false);
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
    validFields,
    setValidFields,
    setFilters,
    setNewColumn,
    deleteColumns,
    updateColumns,
    saveColumns,
    getTasks,
    updateSequence,
    getExistingTaskData,
    submitFormData,
    // handleDeleteForAdditionalFiles,
    handleFormDataUpdate,
    getRetroRespectiveTasks,
    setColumn,
    validateFormData,
  };
};
