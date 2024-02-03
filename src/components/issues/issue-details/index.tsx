"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IssueDetailsHeader } from "./issue-details-header";
import { IssueDetailsInfo } from "./issue-details-info";
import { Issue } from "../../../models/issues.interface";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { issues } from "../../../apollo/queries";
const ISSEUS = gql`
  ${issues}
`;
const IssueDetails: React.FC<{
  issueKey: string | null;
  setIssueKey: React.Dispatch<React.SetStateAction<Issue["key"] | null>>;
}> = ({ issueKey, setIssueKey }) => {
  const renderContainerRef = React.useRef<HTMLDivElement>(null);
  const projectId = useParams().projectId;
  const { data } = useQuery(ISSEUS, {
    variables: { projectId: projectId },
  });
  const issues = data?.issues.data as Issue[];

  const getIssue = useCallback(
    (issueKey: string | null) => {
      return issues?.find((issue) => issue.key === issueKey);
    },
    [issues]
  );
  const [issueInfo, setIssueInfo] = useState(() => getIssue(issueKey));

  useEffect(() => {
    setIssueInfo(() => getIssue(issueKey));
    if (renderContainerRef.current) {
      renderContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [issueKey, getIssue]);

  if (!issueInfo || !issues) return <div />;

  return (
    <div
      ref={renderContainerRef}
      data-state={issueKey ? "open" : "closed"}
      className="relative z-10 flex w-full flex-col overflow-y-auto pl-4 pr-2 [&[data-state=closed]]:hidden"
    >
      <IssueDetailsHeader
        issue={issueInfo}
        setIssueKey={setIssueKey}
        isInViewport={false}
      />
    </div>
  );
};

export { IssueDetails };
