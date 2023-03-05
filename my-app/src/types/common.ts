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
  username?: string;
  roles: string[];
};
export interface SideBarItemProps {
  path: string;
  icon: React.ReactNode;
  role: Role;
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
  columns: string[];
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

export const columnTitle: Record<string, string> = {
  toDo: "To do",
  inProgress: "In Progress",
};
export type TasksRecord = Record<keyof typeof columnTitle, Tasks[]>;

export type Priority = "minor" | "moderate" | "major" | "critical";
export type Tasks = {
  id: string;
  title: string;
  description: string;
  status: keyof typeof columnTitle;
  assignee: Member[];
  reportTo: Member[];
  dueDate: Date;
  priority: Priority;
};

export type Notification = {
  message: string;
  type: string;
  reference: any;
  created_at: string;
  created_by: any;
};
