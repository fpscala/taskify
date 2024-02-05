import { Fragment, useState } from "react";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa";
import { NotImplemented } from "../../components/not-implemented";
import { capitalizeMany } from "../util/helpers";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../../components/ui/select";
import { Issue, IssueStatus } from "../../models/issues.interface";

export const statuses: StatusObject[] = [
  {
    value: IssueStatus.TODO,
    smBgColor: "#f5f5f5",
    lgBgColor: "#f5f5f5",
    smTextColor: "#383939",
    lgTextColor: "#383939",
  },
  {
    value: IssueStatus.IN_PROGRESS,
    smBgColor: "#e0ecfc",
    lgBgColor: "#0854cc",
    smTextColor: "#0854cc",
    lgTextColor: "#fff",
  },
  {
    value: IssueStatus.DONE,
    smBgColor: "#e8fcec",
    lgBgColor: "#08845c",
    smTextColor: "#08845c",
    lgTextColor: "#fff",
  },
];

export type StatusObject = {
  value: Issue["status"];
  smBgColor: string;
  smTextColor: string;
  lgBgColor: string;
  lgTextColor: string;
};
type StatusMap = {
  [key in IssueStatus]: string;
};

export const statusMap: StatusMap = {
  Done: "DONE",
  InProgress: "IN PROGRESS",
  Todo: "TO DO",
};

const IssueSelectStatus: React.FC<{
  currentStatus: Issue["status"];
  issueId: string;
  variant?: "sm" | "lg";
}> = ({ currentStatus, issueId, variant = "sm" }) => {
  const [selected, setSelected] = useState<StatusObject>(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      statuses.find((status) => status.value == currentStatus) ?? statuses[0]!
  );

  function handleSelectChange(value: Issue["status"]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newStatus = statuses.find((status) => status.value == value)!;
    setSelected(newStatus);
  }

  return (
    <Fragment>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger
          onClick={(e) => e.stopPropagation()}
          // TODO: Colors could be managed with data-state?
          style={{
            backgroundColor:
              variant == "sm" ? selected.smBgColor : selected.lgBgColor,
            color:
              variant == "sm" ? selected.smTextColor : selected.lgTextColor,
          }}
          className={clsx(
            variant == "sm" && "bg-opacity-20 px-1.5 py-0.5 text-xs font-bold",
            variant == "lg" && "text-[16px] my-2 px-3 py-1.5 font-semibold",
            "rounded-[3px] flex items-center gap-x-1 whitespace-nowrap focus:ring-2"
          )}
        >
          <SelectValue className="w-full whitespace-nowrap bg-transparent text-white">
            {variant == "sm"
              ? statusMap[selected.value]
              : capitalizeMany(statusMap[selected.value])}
          </SelectValue>
          <SelectIcon>
            <FaChevronDown className="text-xs" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal className="z-50">
          <SelectContent position="popper">
            <SelectViewport className="w-60 rounded-md border border-gray-300 bg-white pt-2 shadow-md">
              <SelectGroup>
                {statuses.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    data-state={
                      status.value == selected.value ? "checked" : "unchecked"
                    }
                    className={clsx(
                      "border-l-[3px] border-transparent py-1 pl-2 text-sm hover:cursor-default hover:border-blue-600 hover:bg-gray-100 [&[data-state=checked]]:border-blue-600"
                    )}
                  >
                    <span
                      style={{ color: status.smTextColor }}
                      className="rounded-md bg-opacity-30 px-2 text-xs font-semibold"
                    >
                      {statusMap[status.value]}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator className="h-[1px] mt-2 bg-gray-300" />
              <NotImplemented feature="workflow">
                <button className="w-full border py-4 pl-5 text-left text-sm font-medium hover:cursor-default hover:bg-gray-100">
                  View Workflow
                </button>
              </NotImplemented>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </Fragment>
  );
};

export { IssueSelectStatus };
