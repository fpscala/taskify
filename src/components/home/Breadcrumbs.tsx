import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { gql, useQuery } from "@apollo/client";
import { findProject } from "../../apollo/queries";
const FIND_PROJECT = gql`
  ${findProject}
`;
const Breadcrumbs = () => {
  const location = useLocation();
  const fragments = location.pathname.slice(1).split("/");

  const { data } = useQuery(FIND_PROJECT, {
    variables: { projectId: fragments[1] },
  });
  const project = data?.findProject;
  return (
    <div className="mt-8 mb-4 min-w-max px-8 text-c-text sm:px-10">
      <Link to="/project" className="hover:underline">
      Projects
      </Link>
      {fragments[1] && (
        <>
          <Icon className="mx-2 inline text-xl" icon="ei:chevron-right" />
          <Link to={"/project/" + fragments[1]} className="hover:underline">
            {project?.name ?? "undefined"}
          </Link>
        </>
      )}
      {fragments[2] && (
        <>
          <Icon className="mx-2 inline text-xl" icon="ei:chevron-right" />
          <Link
            to={`/project/${fragments[1]}/board`}
            className="hover:underline"
          >
            Kanban board
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
