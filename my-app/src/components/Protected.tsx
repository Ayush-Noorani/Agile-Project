import React from "react";
import { SideBar } from "./SiderBar/Siderbar";

interface ProtectedProps {
  children: React.ReactNode | React.ReactNode[];
}
export const Protected = ({ children }: ProtectedProps) => {
  //validation to be implemented
  return <SideBar>{children}</SideBar>;
};
