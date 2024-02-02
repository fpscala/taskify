import { Issue, IssueStatus } from "../../models/issues.interface";
import { Droppable } from "react-beautiful-dnd";
import { Issue as IssueColumn } from "../issues/Issue";

interface Props {
  status: IssueStatus;
  issues: Issue[];
}

type StatusMap = {
  [key in IssueStatus]: string;
};
const statusMap: StatusMap = {
  DONE: "DONE",
  IN_PROGRESS: "IN PROGRESS",
  TODO: "TO DO",
};
const Board: React.FC<Props> = ({ status, issues }) => {
  return (
    <div
      className={
        "w-[350px] mb-5 h-max min-h-fit rounded-md bg-gray-100 px-1.5  pb-3"
      }
    >
      <h2 className="sticky top-0 -mx-1.5 -mt-1.5 mb-1.5 rounded-t-md bg-gray-100 px-2 py-3 text-xs text-gray-500">
        {statusMap[status]}{" "}
        {issues.filter((issue) => issue.status == status).length}
      </h2>

      <Droppable droppableId={status}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className=" min-h-[10px] h-fit"
          >
            {issues
              .sort((a, b) => a.boardPosition! - b.boardPosition!)
              .map((issue, index) => (
                <IssueColumn key={issue.id} index={index} issue={issue} />
              ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
