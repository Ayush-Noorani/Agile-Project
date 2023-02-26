import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../helper/axios";
import { Member } from "../types/common";

export const useCommon = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    searchUser("*");
  }, []);

  const searchUser = (search: string) => {
    axiosInstance
      .get(`/search/members/${search}`)
      .then((res) => {
        setMembers(res.data.members);
      })
      .catch((err) => console.log(err));
  };
  return {
    navigate,
    searchUser,
    members,
  };
};
