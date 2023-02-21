import { useEffect, useState } from "react";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { setData } from "../../../store/reducers/project";
import { User } from "../../../types/common";

export const useRoleAssign = () => {
  const [data, setData] = useState<User[]>([]);
  const { toast, defaultValue } = useToastContext();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axiosInstance
      .get("/admin/users")
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserRole = (id: string, data: User) => {
    axiosInstance
      .put(`/admin/users/update/${id}`, data)
      .then((_res) => {
        toast("User data updated!", defaultValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    data,
    getUsers,
    updateUserRole,
    setData,
  };
};
