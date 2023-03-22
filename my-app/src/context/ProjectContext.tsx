import React, { useContext, createContext, useState } from "react";
import { ProjectData } from "../types/common";

type ProjectContextType = {
  selected: ProjectData | undefined;
  setSelected: Function;
};

const ProjectContext = createContext<ProjectContextType>({
  selected: undefined,
  setSelected: () => {},
});

export const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [selected, setSelected] = useState<ProjectData | undefined>(undefined);

  return (
    <ProjectContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
