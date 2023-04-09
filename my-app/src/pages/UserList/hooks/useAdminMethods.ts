import { useEffect, useState } from "react";
import { useToastContext } from "../../../context/ToastContext";
import { axiosInstance } from "../../../helper/axios";
import { Role, User } from "../../../types/common";

export const useAdminMethods = () => {
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
      .post(`/admin/user/update/${id}`, {
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

  const deleteUser = (id: string) => {
    axiosInstance
      .delete(`/admin/user/delete/${id}`)
      .then((_res) => {
        toast("User deleted!", defaultValue);
        getUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const activateUser = (id: string) => {
    axiosInstance
      .post(`/admin/user/activate/${id}`)
      .then((_res) => {
        toast("User activated!", defaultValue);
        getUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const deactivateUser = (id: string) => {
    axiosInstance
      .post(`/admin/user/deactivate/${id}`)
      .then((_res) => {
        toast("User deactivated!", defaultValue);
        getUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    data,
    getUsers,
    updateUserRole,
    setData,
    activateUser,
    deactivateUser,
    deleteUser,
  };
};
