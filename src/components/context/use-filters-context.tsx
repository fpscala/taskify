"use client";
import { type ReactNode, createContext, useContext, useState } from "react";
import { Issue } from "../../models/issues.interface";

type FiltersContextProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  epics: Issue["id"][];
  setEpics: React.Dispatch<React.SetStateAction<Issue["id"][]>>;
  issueTypes: Issue["type"][];
  setIssueTypes: React.Dispatch<React.SetStateAction<Issue["type"][]>>;
};

const FiltersContext = createContext<FiltersContextProps>({
  search: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearch: () => {},
  epics: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEpics: () => {},
  issueTypes: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIssueTypes: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [epics, setEpics] = useState<Issue["id"][]>([]);
  const [issueTypes, setIssueTypes] = useState<Issue["type"][]>([]);

  return (
    <FiltersContext.Provider
      value={{
        search,
        setSearch,
        epics,
        setEpics,
        issueTypes,
        setIssueTypes,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
