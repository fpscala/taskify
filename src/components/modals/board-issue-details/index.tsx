import { IssueDetails } from "../../issues/issue-details";
import { Modal, ModalContent, ModalOverlay, ModalPortal } from "../../ui/modal";
import { useSelectedIssueContext } from "../../context/use-selected-issue-context";
import { useEffect, useState } from "react";

const IssueDetailsModal: React.FC = () => {
  const { setIssue, issue } = useSelectedIssueContext();
  const [isOpen, setIsOpen] = useState(() => !!issue);

  function handleOpenChange(open: boolean) {
    if (open) return;
    setIssue(null);
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(!!issue);
  }, [issue, setIsOpen]);
  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent className="h-fit max-h-[80vh] w-[80vw] overflow-hidden">
          <IssueDetails issue={issue} setIssue={setIssue} />
        </ModalContent>
      </ModalPortal>
    </Modal>
  );
};

export { IssueDetailsModal };
