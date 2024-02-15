import { type ReactNode } from "react";
import { BsBookmarkFill, BsFillRecordFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import clsx from "clsx";
import { SubTaskIcon } from "../svgs";
import { IssueType } from "../../models/issues.interface";

type IssueIconProps = {
  issueType: IssueType;
};

const Icon: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("rounded-sm  p-0.5 text-sm text-white", className)}>
      {children}
    </div>
  );
};

const _SubTaskIcon = () => {
  return (
    <Icon className="h-fit bg-task">
      <SubTaskIcon className="text-white" />
    </Icon>
  );
};

const TaskIcon = () => {
  return (
    <Icon className="h-fit bg-task">
      <FaCheck className=" p-0.5 text-white" />
    </Icon>
  );
};

const StoryIcon = () => {
  return (
    <Icon className="h-fit bg-story">
      <BsBookmarkFill className="p-0.5" />
    </Icon>
  );
};

const BugIcon = () => {
  return (
    <Icon className="h-fit bg-bug">
      <BsFillRecordFill />
    </Icon>
  );
};

const EpicIcon = () => {
  return (
    <Icon className="h-fit bg-epic">
      <HiLightningBolt />
    </Icon>
  );
};

const IssueIcon: React.FC<IssueIconProps> = ({ issueType }) => {
  if (issueType === IssueType.TASK) return <TaskIcon />;
  if (issueType === IssueType.STORY) return <StoryIcon />;
  if (issueType === IssueType.BUG) return <BugIcon />;
  if (issueType === IssueType.EPIC) return <EpicIcon />;
  if (issueType === IssueType.SUBTASK) return <_SubTaskIcon />;
  return null;
};

export { IssueIcon };
