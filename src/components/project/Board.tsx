"use client";
import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import {
  DragDropContext,
  type DraggableLocation,
  type DropResult,
} from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { issues } from "../../apollo/queries";
import { Issue, IssueStatus } from "../../models/issues.interface";
import { Project } from "../../models/projects.interface";
import { IssueList } from "../issues/issue-list";
import { IssueDetailsModal } from "../modals/board-issue-details";
import { BoardHeader } from "../project/header";
import "../styles/split.css";
import { isNullish } from "../util/helpers";

const STATUSES: IssueStatus[] = [
  IssueStatus.TODO,
  IssueStatus.IN_PROGRESS,
  IssueStatus.DONE,
];
const ISSEUS = gql`
  ${issues}
`;

const Board: React.FC<{ project: Project }> = ({ project }) => {
  const projectId = useParams().projectId;
  const { data } = useQuery(ISSEUS, {
    variables: { projectId: projectId },
  });
  const issues = data?.issues.data;

  if (!issues || !project) {
    return null;
  }

  function filterIssues(issues: Issue[] | undefined, status: IssueStatus) {
    if (!issues) return [];
    console.log(issues);
    console.log(status);
    const filteredIssues = issues.filter((issue) => issue.status === status);
    console.log(filteredIssues);
    return filteredIssues;
  }

  // useLayoutEffect(() => {
  //   if (!renderContainerRef.current) return;
  //   const calculatedHeight = renderContainerRef.current.offsetTop + 20;
  //   renderContainerRef.current.style.height = `calc(100vh - ${calculatedHeight}px)`;
  // }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (isNullish(destination) || isNullish(source)) return;
  };

  return (
    <Fragment>
      <IssueDetailsModal />
      <BoardHeader project={project} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          // ref={renderContainerRef}
          className="relative flex w-full max-w-full gap-x-4 overflow-y-auto"
        >
          {STATUSES.map((status) => (
            <IssueList
              key={status}
              status={status}
              issues={filterIssues(issues, status)}
            />
          ))}
        </div>
      </DragDropContext>
    </Fragment>
  );
};

type IssueListPositionProps = {
  activeIssues: Issue[];
  destination: DraggableLocation;
  source: DraggableLocation;
  droppedIssueId: string;
};

export { Board };
