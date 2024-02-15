import { Editor, type EditorContentType } from "../../../text-editor/editor";
import { useKeydownListener } from "../../../../hooks/use-keydown-listener";
import { Fragment, useRef, useState } from "react";
import { useIsInViewport } from "../../../../hooks/use-is-in-viewport";
import { type SerializedEditorState } from "lexical";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EditorPreview } from "../../../text-editor/preview";
import { Button } from "../../../ui/button";
import { Issue } from "../../../../models/issues.interface";
import Avatar from "../../../util/Avatar";
import { User } from "../../../../models/users.interface";
import { gql, useQuery } from "@apollo/client";
import { authed_user } from "../../../../apollo/queries";
dayjs.extend(relativeTime);
const AUTHED_USER = gql`
  ${authed_user}
`;
const Comments: React.FC<{ issue: Issue }> = ({ issue }) => {
  const scrollRef = useRef(null);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isInViewport, ref] = useIsInViewport();
  // const { comments, addComment } = useIssueDetails();
  const { data } = useQuery(AUTHED_USER);
  const authUser = data?.currentUser;

  useKeydownListener(scrollRef, ["m", "M"], handleEdit);
  function handleEdit(ref: React.RefObject<HTMLElement>) {
    setIsWritingComment(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }

  function handleSave(state: SerializedEditorState | undefined) {
    if (!state) {
      setIsWritingComment(false);
      return;
    }
    // addComment({
    //   issueId: issue.id,
    //   content: JSON.stringify(state),
    //   // eslint-disable-next-line
    //   authorId: "user!.id",
    // });
    setIsWritingComment(false);
  }
  function handleCancel() {
    setIsWritingComment(false);
  }
  return (
    <Fragment>
      <h2>Comments</h2>
      <div className="sticky bottom-0 mb-5 w-full bg-white">
        <div ref={scrollRef} id="dummy-scroll-div" />
        {isWritingComment ? (
          <Editor
            action="comment"
            content={undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <AddComment
            user={authUser}
            onAddComment={() => handleEdit(scrollRef)}
            commentsInViewport={isInViewport}
          />
        )}
      </div>
      <div ref={ref} className="flex flex-col gap-y-5 pb-5"></div>
    </Fragment>
  );
};

const AddComment: React.FC<{
  onAddComment: () => void;
  user: User | undefined | null;
  commentsInViewport: boolean;
}> = ({ onAddComment, user, commentsInViewport }) => {
  function handleAddComment(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    onAddComment();
  }
  return (
    <div
      data-state={commentsInViewport ? "inViewport" : "notInViewport"}
      className="flex w-full gap-x-2 border-t-2 border-transparent py-3 [&[data-state=notInViewport]]:border-gray-200"
    >
      <Avatar
        src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3.5&w=144&h=144&q=80"
        name={
          user ? `${user?.firstname ?? ""} ${user?.firstname ?? ""}` : "Guest"
        }
      />
      <div className="w-full">
        <label htmlFor="add-comment" className="sr-only">
          Add Comment
        </label>
        <input
          onMouseDown={handleAddComment}
          type="text"
          id="add-comment"
          placeholder="Add a comment..."
          className="w-full rounded-[3px] border border-gray-300 px-4 py-2 placeholder:text-sm"
        />
        <p className="my-2 text-xs text-gray-500">
          <span className="font-bold">Pro tip:</span>
          <span> press </span>
          <span className="rounded-[3px] bg-gray-300 px-1 py-0.5 font-bold">
            M
          </span>
          <span> to comment </span>
        </p>
      </div>
    </div>
  );
};

export { Comments };
