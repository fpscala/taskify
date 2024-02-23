import clsx from "clsx";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { Issue as JiraIssue } from "../../models/issues.interface";
import { DropdownTrigger } from "../ui/dropdown-menu";
import { IssueDropdownMenu } from "./issue-menu";
import { useSelectedIssueContext } from "../context/use-selected-issue-context";
import { Avatar } from "../util/Avatar";
import { IssueIcon } from "./issue-icon";
const Issue: React.FC<{ issue: JiraIssue; index: number }> = ({
  issue,
  index,
}) => {
  const { setIssue } = useSelectedIssueContext();

  return (
    <Draggable draggableId={issue.id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }, { isDragging }) => (
        <div
          role="button"
          onClick={() => setIssue(issue)}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className={clsx(
            isDragging && "bg-white",
            "group my-0.5 block max-w-full rounded-md bg-white p-5 text-sm shadow shadow-gray-300 hover:bg-gray-200 "
          )}
        >
          <div className="flex items-start justify-between">
            <span className="mb-2">{issue.name}</span>
            <IssueDropdownMenu issue={issue}>
              <DropdownTrigger
                asChild
                className="rounded-m flex h-fit items-center gap-x-2 bg-opacity-30 px-1.5 text-xs font-semibold focus:ring-2"
              >
                <div className="invisible rounded-sm px-1.5 py-1.5 text-gray-700 group-hover:visible group-hover:bg-gray-100 group-hover:hover:bg-gray-300 [&[data-state=open]]:visible [&[data-state=open]]:bg-gray-700 [&[data-state=open]]:text-white">
                  <BsThreeDots className="sm:text-xl" />
                </div>
              </DropdownTrigger>
            </IssueDropdownMenu>
          </div>
          <div className="w-fit">
            {/* {isEpic(issue.parentId ? (
              <EpicName issue={issue.parent} className="py-0.5 text-sm" />
            ) : null} */}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <IssueIcon issueType={issue.type} />
              <span className="text-xs font-medium text-gray-600">
                {issue.key}
              </span>
            </div>
            {issue.assigner && <Avatar src={"https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3.5&w=144&h=144&q=80"} alt={issue.assigner?.firstname} />}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export { Issue };
