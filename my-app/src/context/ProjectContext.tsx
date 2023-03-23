import React, { useContext, createContext, useState, useEffect } from "react";
import { ProjectData } from "../types/common";

type ProjectContextType = {
  selected: ProjectData | undefined;
  setValue: Function;
};

const ProjectContext = createContext<ProjectContextType>({
  selected: undefined,
  setValue: () => {},
});

export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [selected, setSelected] = useState<ProjectData | undefined>(undefined);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const setValue = (item: any) => {
    console.log(item);
    setSelected(item);
  };
  return (
    <ProjectContext.Provider
      value={{
        selected,
        setValue,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
