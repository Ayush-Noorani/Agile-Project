import { useEffect, useState } from "react";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { Role, User } from "../../../types/common";

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

  const updateUserRole = (id: string, roles: Role[]) => {
    axiosInstance
      .post(`/admin/users/update/${id}`, {
        roles,
      })
      .then((_res) => {
        toast("User data updated!", defaultValue);
        getUsers();
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
