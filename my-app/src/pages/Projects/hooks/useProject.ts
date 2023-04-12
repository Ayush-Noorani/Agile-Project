import { axiosInstance } from "../../../helper/axios";
import { ProjectData, Member } from "../../../types/common";
import { onChange } from "./../../../utils/Common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import produce from "immer";
import { useDispatch } from "react-redux";
import { setData } from "../../../redux/reducers/project";

export const useProject = (id?: string) => {
  const projects = useSelector((state: RootState) => state.project.projects);
  const [projectList, setProjectList] = useState<ProjectData[]>(projects);
  const dispatch = useDispatch();
  const [value, setValue] = useState<ProjectData>({
    id: undefined,
    name: "",
    description: "",
    members: [],
    img: "",
    startDate: new Date(),
    endDate: new Date(),
    category: "",
    lead: "",
    columns: [],
  });

  // const fetchMembers = () => {
  //   axiosInstance.get(`/project/members/${id}`).then((res) => {
  //     setValue(
  //       produce((draft) => {
  //         draft.members = res.data.members;
  //       })
  //     );
  //   });
  // };

  const unAssign = (projectId: string, userId: string) => {
    console.log(
      `%c UNASSIGN ${userId} \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    axiosInstance
      .post("/project/unassign/" + projectId, {
        user_id: userId,
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err.response);
      });
  };

  const assign = (projectId: string, userId: string) => {
    console.log(
      `%c ASSIGN ${userId} \n`,
      `background:green; color: white;  font-weight: bold;`
    );
    axiosInstance
      .post("/project/assign/" + projectId, {
        user_id: userId,
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err.response);
      });
  };

  const fetchAllProjects = () => {
    axiosInstance
      .get("/project/list")
      .then((res) => {
        console.log(
          `%c FETCH ALL PROJECTS \n`,
          `background:green; color: white;  font-weight: bold;`,
          res.data
        );
        dispatch(setData(res.data.projects));
        setProjectList(res.data.projects);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchExistingData = (id: any) => {
    if(id) axiosInstance.get(`/project/get/${id}`).then((res) => {
      setValue(res.data.project);
      console.log(
        `%c FETCH PROJECT \n`,
        `background:green; color: white;  font-weight: bold;`,
        res.data
      );
    });
  };

  const updateState = (data: any, key: keyof ProjectData) =>
    onChange(data, key, setValue);

  const uploadImage = (id: any) => {
    if (typeof value.img == "object") {
      const img = new FormData();
      img.append("img", value.img);
      axiosInstance.put(`/project/image/${id}`, img).then((res) => {});
    }
  };

  const submitData = () => {
    const request: any = { ...value };
    delete request.img;
    const data = new FormData();
    if (value.img && typeof value.img == "object") {
      request["img"] = true;
      data.append("img", value.img);
    }
    if (value.id) {
      request.members = request.members.map((value: Member) => value.id);
      data.append("data", JSON.stringify(request));

      axiosInstance
        .put(`/project/${id}`, data)
        .then((res) => {
          console.log(
            `%c UPDATE PROJECT \n`,
            `background:green; color: white;  font-weight: bold;`,
            res.data
          );
          uploadImage(res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      delete request.columns;
      data.append("data", JSON.stringify(request));

      axiosInstance
        .post("/project/create", data)
        .then((res) => {
          console.log(
            `%c CREATE PROJECT \n`,
            `background:green; color: white;  font-weight: bold;`,
            res.data
          );
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return {
    projects,
    value,
    projectList,
    updateState,
    submitData,
    fetchExistingData,
    fetchAllProjects,
    unAssign,
    assign,
  };
};
