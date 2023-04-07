import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../helper/axios";
import { Member } from "../types/common";
import { setLoading } from "../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useCommon = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const loading = user.isLoading;

  const [members, setMembers] = useState<Member[]>([]);

  const setLoaderState = (state: boolean) => {
    dispatch(setLoading(state));
  };
  const callDefaultSearch = () => {
    searchUser("*");
  };

  const searchUser = (search: string) => {
    if (search === "") {
      callDefaultSearch();
      return;
    }
    axiosInstance
      .get(`/search/members/${search}`)
      .then((res) => {
        setMembers(res.data.members);
      })
      .catch((err) => console.error(err));
  };
  return {
    navigate,
    searchUser,
    members,
    loading,
    setLoaderState,
  };
};
