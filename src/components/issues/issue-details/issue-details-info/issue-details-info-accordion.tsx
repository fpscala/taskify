import { FaChevronUp } from "react-icons/fa";
import { Button } from "../../../ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
// import { IssueAssigneeSelect } from "../../issue-select-assignee";
import { Avatar } from "../../../util/Avatar";
import { Issue } from "../../../../models/issues.interface";
import { gql, useMutation, useQuery } from "@apollo/client";
import { assignIssue } from "../../../../apollo/mutations";
import { authed_user } from "../../../../apollo/queries";
import { User } from "../../../../models/users.interface";
import toast from "react-hot-toast";
import { IssueAssigneeSelect } from "../../issue-select-assignee";
const ASSIGN_ISSUE = gql`
  ${assignIssue}
`;
const AUTHED_USER = gql`
  ${authed_user}
`;

const IssueDetailsInfoAccordion: React.FC<{ issue: Issue }> = ({ issue }) => {
  // const { sprints } = useSprints();
  const [openAccordion, setOpenAccordion] = useState("details");
  const [assignIssue] = useMutation(ASSIGN_ISSUE);
  const { data } = useQuery(AUTHED_USER);
  const authUser = data?.currentUser as User;
  function handleAutoAssign() {
    assignIssue({
      variables: {
        issueId: issue.id,
        userId: authUser.id, // TODO userId,
      },
      onError(error) {
        toast(error.message);
      },
    });
  }
  return (
    <Accordion
      onValueChange={setOpenAccordion}
      value={openAccordion}
      className="my-3 w-min min-w-full rounded-[3px] border"
      type="single"
      collapsible
    >
      <AccordionItem value={"details"}>
        <AccordionTrigger className="flex w-full items-center justify-between p-2 font-medium hover:bg-gray-100 [&[data-state=open]]:border-b [&[data-state=open]>svg]:rotate-180">
          <div className="flex items-center gap-x-1">
            <span className="text-sm">Details</span>
            <span className="text-xs text-gray-500">
              (Assignee, Sprint, Reporter)
            </span>
          </div>
          <FaChevronUp
            className="mr-2 text-xs text-black transition-transform"
            aria-hidden
          />
        </AccordionTrigger>
        <AccordionContent className="flex flex-col bg-white px-3 [&[data-state=open]]:py-2">
          <div
            data-state={issue.assigner ? "assigned" : "unassigned"}
            className="my-2 grid grid-cols-3 [&[data-state=assigned]]:items-center"
          >
            <span className="text-sm font-semibold text-gray-600">
              Assignee
            </span>
            <div className="flex flex-col">
              <IssueAssigneeSelect issue={issue} />
              <Button
                onClick={handleAutoAssign}
                data-state={issue.assigner ? "assigned" : "unassigned"}
                customColors
                customPadding
                className="mt-1 hidden text-sm text-blue-600 underline-offset-2 hover:underline [&[data-state=unassigned]]:flex"
              >
                Assign to me
              </Button>
            </div>
          </div>
          <div className="my-4 grid grid-cols-3 items-center">
            <span className="text-sm font-semibold text-gray-600">Sprint</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                {
                  /* sprints?.find((sprint) => sprint?.id == issue.sprintId)
                  ?.name ??  */ "None"
                }
              </span>
            </div>
          </div>
          <div className="my-2 grid grid-cols-3  items-center">
            <span className="text-sm font-semibold text-gray-600">
              Reporter
            </span>
            <div className="flex items-center gap-x-3 ">
              {/* <Avatar
                src={issue.reporter?.avatar}
                name={`${issue.reporter?.name}`}
              /> */}
              <span className="whitespace-nowrap text-sm">
                {/* {issue.reporter?.name} */}
              </span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { IssueDetailsInfoAccordion };
