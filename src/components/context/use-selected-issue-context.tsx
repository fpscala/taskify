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

type SelectedIssueContextProps = {
  issueKey: Issue["key"] | null;
  setIssueKey: React.Dispatch<React.SetStateAction<Issue["key"] | null>>;
};

const SelectedIssueContext = createContext<SelectedIssueContextProps>({
  issueKey: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIssueKey: () => {},
});

export const SelectedIssueProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const [issueKey, setIssueKey] = useState<Issue["key"] | null>(null);

  const setSelectedIssueUrl = useCallback(
    (key: Issue["key"] | null) => {
      const urlWithQuery = pathname + (key ? `?selectedIssue=${key}` : "");
      window.history.pushState(null, "", urlWithQuery);
    },
    [pathname]
  );

  useEffect(() => {
    setIssueKey(searchParams.get("selectedIssue"));
  }, [searchParams]);

  useEffect(() => {
    setSelectedIssueUrl(issueKey);
  }, [issueKey, setSelectedIssueUrl]);

  return (
    <SelectedIssueContext.Provider value={{ issueKey, setIssueKey }}>
      {children}
    </SelectedIssueContext.Provider>
  );
};

export const useSelectedIssueContext = () => useContext(SelectedIssueContext);
