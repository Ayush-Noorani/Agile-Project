import { SortOrder } from "../../../types/common";

function getcomparator<T>(orderBy: keyof T, order: SortOrder) {
  if (order === "asc")
    return (a: T, b: T) => {
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      if (b[orderBy] > a[orderBy]) {
        return -1;
      }
      return 0;
    };
  return (a: T, b: T) => {
    if (a[orderBy] > b[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
}

const flipSortOrder = (order: SortOrder) => (order === "asc" ? "desc" : "asc");

export { getcomparator, flipSortOrder };
