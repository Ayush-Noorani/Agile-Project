export type FormType = {
  name: string;
  label: string;
  type: string;
};

export type User = {
  id: string;
  name: string;
  img?: string;
  email: string;
  role: string;
};
export interface SideBarItemProps {
  path: string;
  icon: React.ReactNode;
  label: string;
}
export type Member = {
  id: string;
  username: string;
  role?: Role;
  img?: string;
};
export type ProjectData = {
  id?: any;
  name: string;
  description: string;
  members: Member[];
  img: string | boolean | File;
  startDate: Date;
  expectedEndDate: Date;
  category: string;
  lead: string;
};

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  members: number;
  img: string;
  totalTasks: number;
};

export type Role = "admin" | "user" | "lead" | "member" | "developer";
