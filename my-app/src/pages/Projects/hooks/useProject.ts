import { onChange } from "./../../../utils/Common";
import { useState } from "react";

type Member = {
  name: string;
  id: string;
  url: string;
};
export type ProjectData = {
  id?: any;
  name: string;
  description: string;
  members: Member[];
  img: string;
  startDate: Date;
  expectedEndDate: Date;
  category: string;
  lead: string;
};

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  members: number;
  img: string;
  totalTasks: number;
};

export const useProject = (id?: string) => {
  const [data, setData] = useState<ProjectType[]>([
    {
      id: 1,
      name: "Project 1",
      description: "This is a project",
      members: 10,
      img: "https://picsum.photos/200",
      totalTasks: 10,
    },
  ]);
  const [members, setMembers] = useState<Member[]>([]);
  const [value, setValue] = useState<ProjectData>({
    name: "",
    description: "",
    members: [
      {
        name: "fury",
        id: "1",
        url: "https://picsum.photos/200",
      },
      {
        name: "rajeev",
        id: "3",
        url: "https://picsum.photos/200",
      },
    ],
    img: "",
    startDate: new Date(),
    expectedEndDate: new Date(),
    category: "",
    lead: "",
  });

  const fetchMembers = () => {
    //api call to fetch members
  };

  const fetchExistingData = (id: any) => {
    // get existing data from server
  };

  const fetchData = () => {
    //api call to fetch data
  };
  const updateState = (data: any, key: keyof ProjectData) =>
    onChange(data, key, setValue);

  const submitData = () => {
    //api call to save data
  };
  return {
    data,
    value,
    members,
    updateState,
    submitData,
    fetchData,
    fetchExistingData,
    fetchMembers,
  };
};
