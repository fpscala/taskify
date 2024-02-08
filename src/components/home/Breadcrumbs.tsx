import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Project } from "../../models/projects.interface";

interface Props {
  project: Project;
}

const Breadcrumbs: React.FC<Props> = ({ project }) => {
  const location = useLocation();
  const fragments = location.pathname.slice(1).split("/");

  return (
    <div className="text-c-text mt-4 min-w-max">
      <Link to="/project" className="hover:underline">
        Projects
      </Link>
      {fragments[1] && (
        <>
          <Icon className="mx-2 inline text-xl" icon="ei:chevron-right" />
          <Link to={"/project/" + fragments[1]} className="hover:underline">
            {project.name ?? "undefined"}
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
            {project.key + " board"}
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
