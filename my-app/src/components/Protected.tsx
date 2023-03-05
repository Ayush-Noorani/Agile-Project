import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SideBar } from "./SiderBar/Siderbar";

interface ProtectedProps {
  children: React.ReactNode | React.ReactNode[];
}
export const Protected = ({ children }: ProtectedProps) => {
  //validation to be implemented
  const { user, fetchUserInfo } = useUser();

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return <SideBar>{children}</SideBar>;
};
