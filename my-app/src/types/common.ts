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
  handleRedirect?: (path: string) => void;
}
export type Member = {
  id: string;
  username: string;
  role?: Role;
  name: string;
  img?: string;
  color?: string;
};
export type Headers = {
  id: any;
  label: string;
};

export type SortOrder = "asc" | "desc";

export type Columntype = {
  label: string;
  value: string;
  fixed?: boolean;
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
  columns: Columntype[];
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
  taskName?: string;
  description: string;
  status: string;
  assignee: Member[];
  reportTo: Member[];
  dueDate: Date;
  projectId?: string;
  priority: Priority;
  section?: string;
  plan?: string;
};

export type Notification = {
  message: string;
  type: string;
  reference: any;
  created_at: string;
  created_by: any;
};
