"use client";
import React, { useEffect } from "react";
import { Issue } from "../../../models/issues.interface";
import { useIsInViewport } from "../../../hooks/use-is-in-viewport";
import { IssueDetailsHeader } from "./issue-details-header";
import { IssueDetailsInfo } from "./issue-details-info";
const IssueDetails: React.FC<{
  issue: Issue | null;
  setIssue: React.Dispatch<React.SetStateAction<Issue | null>>;
}> = ({ issue, setIssue }) => {
  const renderContainerRef = React.useRef<HTMLDivElement>(null);
  const [isInViewport, viewportRef] = useIsInViewport({ threshold: 1 });

  useEffect(() => {
    if (renderContainerRef.current) {
      renderContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [issue]);

  if (!issue) return <div />;

  return (
    <div
      ref={renderContainerRef}
      data-state={issue ? "open" : "closed"}
      className="relative z-10 flex w-full flex-col overflow-y-auto pl-4 pr-2 [&[data-state=closed]]:hidden"
    >
      <IssueDetailsHeader
        issue={issue}
        setIssue={setIssue}
        isInViewport={false}
      />
      <IssueDetailsInfo issue={issue} ref={viewportRef} />
    </div>
  );
};

export { IssueDetails };
