import { Issue } from "../../../../models/issues.interface";
import { dateToLongString } from "../../../util/helpers";

const IssueMetaInfo: React.FC<{ issue: Issue }> = ({ issue }) => {
  return (
    <div className="mb-3 flex flex-col gap-y-3">
      <span className="text-xs text-gray-500">
        {"Created " + dateToLongString(issue.createdAt)}
      </span>
      <span className="text-xs text-gray-500">
        {issue.updatedAt && "Updated " + dateToLongString(issue.updatedAt)}
      </span>
    </div>
  );
};

export { IssueMetaInfo };
