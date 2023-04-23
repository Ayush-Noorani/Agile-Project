import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SideBar } from "./SiderBar/Siderbar";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";

interface ProtectedProps {
  children: React.ReactNode | React.ReactNode[];
}
export const Protected = ({ children }: ProtectedProps) => {
  //validation to be implemented
  const { user, fetchUserInfo } = useUser();
  const { setValue } = useProjectContext();
  const { id } = useParams();
  useEffect(() => {
    setValue(id);
  }, []);
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return <SideBar>{children}</SideBar>;
};
