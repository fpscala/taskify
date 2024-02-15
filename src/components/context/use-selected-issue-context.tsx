"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Issue } from "../../models/issues.interface";
import { useLocation } from "react-router-dom";

type SelectedIssueContextProps = {
  issue: Issue | null;
  setIssue: React.Dispatch<React.SetStateAction<Issue | null>>;
};

const SelectedIssueContext = createContext<SelectedIssueContextProps>({
  issue: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIssue: () => {},
});

export const SelectedIssueProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = useLocation().pathname;
  const [issue, setIssue] = useState<Issue | null>(null);

  const setSelectedIssueUrl = useCallback(
    (key: Issue["key"] | null) => {
      const urlWithQuery = pathname + (key ? `?selectedIssue=${key}` : "");
      window.history.pushState(null, "", urlWithQuery);
    },
    [pathname]
  );

  useEffect(() => {
    issue && setSelectedIssueUrl(issue?.key);
  }, [issue, setSelectedIssueUrl]);

  return (
    <SelectedIssueContext.Provider value={{ issue, setIssue }}>
      {children}
    </SelectedIssueContext.Provider>
  );
};

export const useSelectedIssueContext = () => useContext(SelectedIssueContext);
