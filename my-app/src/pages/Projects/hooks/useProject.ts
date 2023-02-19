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
  });

  const fetchMembers = () => {
    axiosInstance.get(`/project/members/${id}`).then((res) => {
      setValue(
        produce(value, (draft) => {
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
    console.log(id);
    axiosInstance.get(`/project/get/${id}`).then((res) => {
      console.log(res.data.project);
      setValue(res.data.project);
    });
  };

  const updateState = (data: any, key: keyof ProjectData) =>
    onChange(data, key, setValue);

  const uploadImage = (id: any) => {
    console.log(id);
    if (typeof value.img == "object") {
      let img = new FormData();
      img.append("img", value.img);
      axiosInstance.put(`/project/image/${id}`, img).then((res) => {
        console.log(res);
      });
    }
  };
  const submitData = () => {
    let request: any = { ...value };
    delete request.img;
    let data = new FormData();
    console.log("HERE", value.img);
    if (value.img && typeof value.img == "object") {
      request["img"] = true;
      data.append("img", value.img);
      console.log(data);
    } else {
      request["img"] = false;
    }
    data.append("data", JSON.stringify(request));
    if (value.id) {
      axiosInstance
        .put(`/project/${id}`, data)
        .then((res) => {
          console.log(res.data);
          uploadImage(res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
