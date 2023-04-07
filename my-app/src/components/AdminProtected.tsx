import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SideBar } from "./SiderBar/Siderbar";

interface AdminProtectedProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const { user, fetchUserInfo } = useUser();
  useEffect(() => {
    fetchUserInfo();
  }, []);
  if (user.roles.includes("admin")) {
    return <SideBar>{children}</SideBar>;
  }
  return <></>;
};
