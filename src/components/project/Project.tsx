import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { issues } from "../../apollo/queries";
import { IssueStatus } from "../../models/issues.interface";
import Board from "./Board";
import { DragDropContext } from "react-beautiful-dnd";
import { useLayoutEffect, useRef } from "react";
const ISSEUS = gql`
  ${issues}
`;
const STATUSES: IssueStatus[] = [
  IssueStatus.TODO,
  IssueStatus.IN_PROGRESS,
  IssueStatus.DONE,
];
const Project = () => {
  const projectId = useParams().projectId;
  const { data } = useQuery(ISSEUS, {
    variables: { projectId: projectId },
  });
  const renderContainerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!renderContainerRef.current) return;
    const calculatedHeight = renderContainerRef.current.offsetTop + 20;
    renderContainerRef.current.style.height = `calc(100vh - ${calculatedHeight}px)`;
  }, []);
  const issues = data?.issues.data;

  if (!issues) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={() => {}}>
      <h1 className="mb-4 min-w-max px-8 text-xl font-semibold text-c-text sm:px-10">
        Kanban Board
      </h1>

      <div
        ref={renderContainerRef}
        className="relative flex w-full min-w-max max-w-full gap-x-4 overflow-y-auto sm:px-10"
      >
        {STATUSES.map((status) => (
          <Board key={status} status={status} issues={issues} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Project;
