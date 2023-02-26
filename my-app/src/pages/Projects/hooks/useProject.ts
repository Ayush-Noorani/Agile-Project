import { axiosInstance } from "../../../helper/axios";
import { ProjectData, Member } from "../../../types/common";
import { onChange } from "./../../../utils/Common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import produce from "immer";

export const useProject = (id?: string) => {
  const projects = useSelector((state: RootState) => state.project.projects);

  const [data, setData] = useState<ProjectData[]>(projects);
  const [value, setValue] = useState<ProjectData>({
    id: undefined,
    name: "",
    description: "",
    members: [],
    img: "",
    startDate: new Date(),
    expectedEndDate: new Date(),
    category: "",
    lead: "",
    columns: ["toDo", "inProgress", "done"],
  });

  const fetchMembers = () => {
    axiosInstance.get(`/project/members/${id}`).then((res) => {
      setValue(
        produce((draft) => {
          draft.members = res.data.members;
        })
      );
    });
  };

  const fetchAllProjects = () => {
    axiosInstance.get("/project/list").then((res) => {
      setData(res.data.projects);
    });
  };
  const fetchExistingData = (id: any) => {
    axiosInstance.get(`/project/get/${id}`).then((res) => {
      setValue(res.data.project);
    });
  };

  const updateState = (data: any, key: keyof ProjectData) =>
    onChange(data, key, setValue);

  const uploadImage = (id: any) => {
    if (typeof value.img == "object") {
      let img = new FormData();
      img.append("img", value.img);
      axiosInstance.put(`/project/image/${id}`, img).then((res) => {});
    }
  };
  const submitData = () => {
    let request: any = { ...value };
    delete request.img;
    let data = new FormData();
    if (value.img && typeof value.img == "object") {
      request["img"] = true;
      data.append("img", value.img);
    } else {
      request["img"] = false;
    }
    if (value.id) {
      data.append("data", JSON.stringify(request));

      axiosInstance
        .put(`/project/${id}`, data)
        .then((res) => {
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return {
    data,
    value,
    updateState,
    submitData,
    fetchExistingData,
    fetchMembers,
    fetchAllProjects,
  };
};
