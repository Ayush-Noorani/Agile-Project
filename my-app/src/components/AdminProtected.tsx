import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { SideBar } from "./SiderBar/Siderbar";
import { useCommon } from "../hooks/useCommon";

interface AdminProtectedProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const { user, fetchUserInfo } = useUser();
  const { navigate } = useCommon();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (user.roles.includes("admin")) {
    return <SideBar>{children}</SideBar>;
  }
  return <></>;
};
