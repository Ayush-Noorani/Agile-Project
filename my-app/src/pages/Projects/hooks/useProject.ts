import { axiosInstance } from "../../../helper/axios";
import { ProjectData, Member } from "../../../types/common";
import { onChange } from "./../../../utils/Common";
import { useState } from "react";

export const useProject = (id?: string) => {
  const [data, setData] = useState<ProjectData[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
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
    axiosInstance.get("/project/members").then((res) => {
      setMembers(res.data);
    });
  };

  const fetchAllProjects = () => {
    axiosInstance.get("/project/list").then((res) => {
      setData(res.data.projects);
    });
  };
  const fetchExistingData = (id: any) => {
    axiosInstance.get(`/project/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
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
    request.img = value.img ? true : false;

    let data = new FormData();
    if (value.img as unknown as File) {
      data.append("img", value.img as unknown as File);
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
    members,
    updateState,
    submitData,
    fetchExistingData,
    fetchMembers,
    fetchAllProjects,
  };
};
