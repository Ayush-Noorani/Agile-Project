import { axiosInstance } from "../../../helper/axios";
import { ProjectData, Member } from "../../../types/common";
import { consoleStatement, onChange } from "./../../../utils/Common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import produce from "immer";
import { useDispatch } from "react-redux";
import { setData } from "../../../store/reducers/project";

export const useProject = (id?: string) => {
  const projects = useSelector((state: RootState) => state.project.projects);
  const dispatch = useDispatch();
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
    columns: [],
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
      consoleStatement("FETCH ALL PROJECTS", "green", res.data.projects);
      dispatch(setData(res.data.projects));
    });
  };
  const fetchExistingData = (id: any) => {
    axiosInstance.get(`/project/get/${id}`).then((res) => {
      consoleStatement("FETCH PROJECT", "green", res.data.project);
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
      request.members = request.members.map((value: Member) => value.id);
      data.append("data", JSON.stringify(request));

      axiosInstance
        .put(`/project/${id}`, data)
        .then((res) => {
          consoleStatement("UPDATE PROJECT", "green", res.data);
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
          consoleStatement("CREATE PROJECT", "green", res.data);
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
    updateState,
    submitData,
    fetchExistingData,
    fetchMembers,
    fetchAllProjects,
  };
};
