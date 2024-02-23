import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../ui/select";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { Issue } from "../../models/issues.interface";
import { User } from "../../models/users.interface";
import { Avatar } from "../util/Avatar";

const IssueAssigneeSelect: React.FC<{
  issue: Issue;
  avatarSize?: number;
  avatarOnly?: boolean;
}> = ({ issue, avatarSize, avatarOnly = false }) => {
  // const { members } = useProject();
  // const { updateIssue, isUpdating } = useIssues();
  const unassigned = {
    id: "unassigned",
    name: "Unassigned",
    avatar: undefined,
    email: "",
  };
  const [selected, setSelected] = useState<User["id"] | null>(
    issue.assigneeId ?? null
  );
  function handleSelectChange(value: User["id"]) {
    setSelected(value);
    // updateIssue(
    //   {
    //     issueId: issue.id,
    //     assigneeId: value === "unassigned" ? null : value,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       toast.success({
    //         message: `Issue assignee updated to ${
    //           data.assignee?.name ?? "Unassigned"
    //         }`,
    //         description: "Issue assignee changed",
    //       });
    //     },
    //   }
    // );
  }
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger
        onClick={(e) => e.stopPropagation()}
        // disabled={isUpdating}
        className={clsx(
          avatarOnly
            ? "rounded-full transition-all duration-200 hover:brightness-75"
            : "-ml-2 rounded-[3px] py-1 pl-2 pr-8 hover:bg-gray-200",
          "flex w-fit items-center gap-x-1 whitespace-nowrap"
        )}
      >
        <SelectValue asChild>
          <Fragment>
            <Avatar
              size={avatarSize}
              src={"https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3.5&w=144&h=144&q=80"}
              alt={`${issue.assigner?.firstname ?? "Unassigned"}`}
            />
            {avatarOnly ? null : (
              <span className="rounded-md bg-opacity-30 px-2 text-sm">
                {issue.assigner?.firstname ?? "Unassigned"}
              </span>
            )}
          </Fragment>
        </SelectValue>
      </SelectTrigger>
      <SelectPortal className="z-50 w-full">
        <SelectContent position="popper">
          <SelectViewport className="w-full rounded-md border border-gray-300 bg-white pt-2 shadow-md">
            <SelectGroup>
              {/* {members &&
                [...members, unassigned].map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id}
                    data-state={member.id == selected ? "checked" : "unchecked"}
                    className={clsx(
                      "border-l-[3px] border-transparent py-2 pl-2 pr-8 text-sm hover:cursor-default hover:border-blue-600 hover:bg-gray-100 focus:outline-none [&[data-state=checked]]:border-blue-600"
                    )}
                  >
                    <div className="flex items-center">
                      <Avatar
                        src={member?.avatar}
                        alt={`${member?.name ?? "Unassigned"}`}
                      />
                      <span className="rounded-md bg-opacity-30 px-2 text-sm">
                        {member.name}
                      </span>
                    </div>
                  </SelectItem>
                ))} */}
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export { IssueAssigneeSelect };
