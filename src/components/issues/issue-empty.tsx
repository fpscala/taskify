"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IssueSelectType } from "./issue-select-type";
import { Button } from "../ui/button";
import { MdCheck, MdClose } from "react-icons/md";
import { Spinner } from "../ui/spinner";
import { IssueIcon } from "./issue-icon";
import { Issue, IssueType } from "../../models/issues.interface";

const EmtpyIssue: React.FC<{
  id: string;
  className?: string;
  onCreate: (payload: {
    name: string;
    type: IssueType;
    parentId: Issue["id"] | null;
  }) => void;
  onCancel: () => void;
  isCreating: boolean;
  isSubtask?: boolean;
  isEpic?: boolean;
  parentId?: Issue["id"];
}> = ({
  id,
  onCreate,
  onCancel,
  isCreating,
  className,
  isEpic,
  isSubtask,
  parentId,
  ...props
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<IssueType>(() => initialType());
  const inputRef = useRef<HTMLInputElement>(null);

  function initialType() {
    if (isSubtask) return IssueType.SUBTASK;
    if (isEpic) return IssueType.EPIC;
    return IssueType.TASK;
  }

  useEffect(() => {
    focusInput();
  }, [props]);

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSelect(type: Issue["type"]) {
    setType(type);
    setTimeout(() => focusInput(), 50);
  }
  function handleCreateIssue(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!name) {
        return;
      }

      onCreate({ name, type, parentId: parentId ?? null });
      setName("");
    }
  }

  return (
    <div
      {...props}
      className={clsx(
        "relative flex items-center gap-x-2 border-2 border-blue-400 bg-white p-1.5",
        className
      )}
    >
      {isSubtask ? (
        <div className="py-4" />
      ) : isEpic ? (
        <IssueIcon issueType={IssueType.EPIC} />
      ) : (
        <IssueSelectType
          currentType={type}
          dropdownIcon
          onSelect={handleSelect}
        />
      )}
      <label htmlFor={`empty-issue-input-${id}`} className="sr-only">
        Empty issue input
      </label>
      <input
        ref={inputRef}
        autoFocus
        type="text"
        id={`empty-issue-input-${id}`}
        placeholder="What needs to be done?"
        className=" w-full pl-2 pr-20 text-sm focus:outline-none"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onKeyDown={handleCreateIssue}
      />
      {isCreating ? (
        <div className="absolute right-2 z-10">
          <Spinner size="sm" />
        </div>
      ) : (
        <div className="absolute right-2 z-10 flex gap-x-1">
          <Button
            className="aspect-square shadow-md"
            onClick={() => onCancel()}
          >
            <MdClose className="text-sm" />
          </Button>
          <Button
            className="aspect-square shadow-md"
            onClick={() =>
              onCreate({
                name,
                type,
                parentId: parentId ?? null,
              })
            }
          >
            <MdCheck className="text-sm" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmtpyIssue };
