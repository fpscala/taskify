import { useStrictModeDroppable } from "../../hooks/use-strictmode-droppable";
import { Droppable } from "react-beautiful-dnd";
import { Issue as IssueColumn } from "./Issue";
import clsx from "clsx";
import { statusMap } from "../issues/issue-select-status";
import { Issue, IssueStatus, IssueType } from "../../models/issues.interface";
import { getPluralEnd } from "../util/helpers";
import { useState } from "react";
import { Button } from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { EmtpyIssue } from "./issue-empty";
import { createIssue } from "../../apollo/mutations";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { findIssue } from "../../apollo/queries";

const CREATE_ISSUE = gql`
  ${createIssue}
`;
const FIND_ISSUE = gql`
  ${findIssue}
`;
const IssueList: React.FC<{
  status: IssueStatus;
  issues: Issue[];
  projectId: string;
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}> = ({ issues, status, projectId, setIssues }) => {
  const [droppableEnabled] = useStrictModeDroppable();
  const [isVisible, setVisiblity] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [createIssue, { loading: isCreating }] = useMutation(CREATE_ISSUE);
  const [findIssueById] = useLazyQuery(FIND_ISSUE);
  if (!droppableEnabled) {
    return null;
  }

  function handleCreateIssue(name: string, type: IssueType) {
    if (!name) {
      return;
    }
    createIssue({
      variables: {
        name: name,
        type: type,
        projectId: projectId,
      },
      onCompleted: (data) => {
        findIssueById({
          variables: {
            issueId: data.createIssue,
          },
          onCompleted: (data) => {
            setIssues((issues) => [...issues, data.findIssue as Issue]);
            setIsEditing(false);
          },
        });
      },
    });
  }
  return (
    <div
      className={clsx(
        "mb-5 h-max min-h-fit w-[350px] rounded-md bg-gray-100 px-1.5  pb-3"
      )}
      onMouseEnter={() => setVisiblity(true)}
      onMouseLeave={() => setVisiblity(false)}
    >
      <h2 className="sticky top-0 -mx-1.5 -mt-1.5 mb-1.5 rounded-t-md bg-gray-100 px-2 py-3 text-xs text-gray-500">
        {statusMap[status]}{" "}
        {issues.filter((issue) => issue.status == status).length}
        {` ISSUE${getPluralEnd(issues).toUpperCase()}`}
      </h2>

      <Droppable droppableId={status}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className=" h-fit min-h-[10px]"
          >
            {issues
              .sort((a, b) => a.boardPosition! - b.boardPosition!)
              .map((issue, index) => (
                <IssueColumn key={issue.id} index={index} issue={issue} />
              ))}

            <Button
              onClick={() => setIsEditing(true)}
              data-state={!isEditing && isVisible ? "open" : "closed"}
              customColors
              className="my-1 flex w-full bg-transparent hover:bg-gray-200 [&[data-state=closed]]:hidden"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm">Create Issue</span>
            </Button>
            <EmtpyIssue
              data-state={isEditing ? "open" : "closed"}
              className="[&[data-state=closed]]:hidden"
              onCreate={({ name, type }) => handleCreateIssue(name, type)}
              onCancel={() => setIsEditing(false)}
              isCreating={isCreating}
            />
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export { IssueList };
