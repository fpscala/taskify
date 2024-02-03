"use client";
import React, { Fragment, useCallback, useLayoutEffect, useRef } from "react";
import "../styles/split.css";
import { BoardHeader } from "../project/header";
import {
  DragDropContext,
  type DraggableLocation,
  type DropResult,
} from "react-beautiful-dnd";
import {
  insertItemIntoArray,
  isEpic,
  isNullish,
  isSubtask,
  moveItemWithinArray,
} from "../util/helpers";
import { IssueList } from "../issues/issue-list";
import { IssueDetailsModal } from "../modals/board-issue-details";
import { Issue, IssueStatus } from "../../models/issues.interface";
import { useFiltersContext } from "../context/use-filters-context";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { issues } from "../../apollo/queries";
import { Project } from "../../models/projects.interface";

const STATUSES: IssueStatus[] = [
  IssueStatus.TODO,
  IssueStatus.IN_PROGRESS,
  IssueStatus.DONE,
];
const ISSEUS = gql`
  ${issues}
`;

const Board: React.FC<{ project: Project}> = ({
  project,
}) => {
  const renderContainerRef = useRef<HTMLDivElement>(null);
  const projectId = useParams().projectId;
  const { data } = useQuery(ISSEUS, {
    variables: { projectId: projectId },
  });
  const issues = data?.issues.data;

  if (!issues) {
    return null;
  }
  const { search, issueTypes, epics } = useFiltersContext();

  const filterIssues = useCallback(
    (issues: Issue[] | undefined, status: IssueStatus) => {
      if (!issues) return [];
      const filteredIssues = issues.filter((issue) => {
        if (issue.status === status && !isEpic(issue) && !isSubtask(issue)) {
          return true;
        }
        return false;
      });

      return filteredIssues;
    },
    [search, epics, issueTypes]
  );

  useLayoutEffect(() => {
    if (!renderContainerRef.current) return;
    const calculatedHeight = renderContainerRef.current.offsetTop + 20;
    renderContainerRef.current.style.height = `calc(100vh - ${calculatedHeight}px)`;
  }, []);

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
          ref={renderContainerRef}
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
