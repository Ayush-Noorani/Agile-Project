import { User } from "../../../types/common";

export interface Headers {
    id: keyof User;
    label: string;
  }


export type SortOrder = "asc" | "desc";

