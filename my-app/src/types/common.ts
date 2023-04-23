export type FormType = {
  name: string;
  label: string;
  type: string;
};
export type Plan = {
  id?: string;
  startDate: Date;
  endDate: Date;
  planName: string;
  project: string;
  projectName?: string;
  status?: string;
};
export type DashBoard = ProjectData & {
  tasks: Record<string, Tasks[]>;
};
export type User = {
  id: string;
  name: string;
  img?: string;
  email: string;
  username?: string;
  roles: string[];
  active?: boolean;
};
export interface SideBarItemProps {
  path: string;
  icon: React.ReactNode;
  role: Role;
  require?: string[];
  disabled?: boolean;
  label: string;
  handleRedirect?: (path: string, require: string[]) => void;
}
export type Member = {
  id: string;
  username: string;
  role?: Role;
  name: string;
  email: string;
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
  color?: string;
};
export type ProjectData = {
  id?: any;
  name: string;
  description: string;
  members: Member[];
  img: string | boolean | File;
  startDate: Date | string;
  endDate: Date | string;
  category: string;
  lead: string;
  columns: Columntype[];
  members_count?: number;
  status?: {
    completed_tasks: number;
    remaining_tasks: number;
  };
};

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  members: number;
  img: string;
  totalTasks: number;
};

export type Role =
  | "admin"
  | "user"
  | "lead"
  | "member"
  | "developer"
  | "manager";

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
  new?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Notification = {
  message: string;
  type: string;
  reference: any;
  created_at: string;
  created_by: any;
};
