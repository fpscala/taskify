import clsx from "clsx";
import { createContext, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { Issue as JiraIssue } from "../../models/issues.interface";
import { DropdownTrigger } from "../ui/dropdown-menu";
import { IssueDropdownMenu } from "./issue-menu";

const Issue: React.FC<{ issue: JiraIssue; index: number }> = ({
  issue,
  index,
}) => {
  type SelectedIssueContextProps = {
    issueKey: JiraIssue["key"] | null;
    setIssueKey: React.Dispatch<React.SetStateAction<JiraIssue["key"] | null>>;
  };
  const SelectedIssueContext = createContext<SelectedIssueContextProps>({
    issueKey: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIssueKey: () => {},
  });
  const { setIssueKey } = useContext(SelectedIssueContext);

  return (
    <Draggable draggableId={issue.id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }, { isDragging }) => (
        <div
          role="button"
          onClick={() => setIssueKey(issue.key)}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className={clsx(
            isDragging && "bg-white",
            "group my-0.5 max-w-full rounded-[3px] border-[0.3px] border-gray-300 bg-white p-2 text-sm shadow-sm shadow-gray-300 hover:bg-gray-200 "
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
              {/* <IssueIcon issueType={issue.type} /> */}
              <span className="text-xs font-medium text-gray-600">
                {issue.key}
              </span>
            </div>
            {/* <Avatar
              // size={20}
              src={issue.assigneeId?.avatar}
              alt={issue.assignee?.name ?? "Unassigned"}
            /> */}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export { Issue };
