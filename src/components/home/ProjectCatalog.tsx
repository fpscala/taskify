import { Icon } from "@iconify/react";
import { useState } from "react";
import gql from "graphql-tag";
import SS from "../util/SpinningCircle";
import CreateProjectModel from "./CreateProjectModel";
import ProjectRow from "./ProjectRow";
import { authed_user, projects } from "../../apollo/queries";
import { useQuery } from "@apollo/client";
import { Project } from "../../models/projects.interface";

const AUTHED_USER = gql`
  ${authed_user}
`;
const PROJECTS = gql`
  ${projects}
`;

const ProjectCatalog = () => {
  const { loading, data: projectsResponse } = useQuery(PROJECTS);
  const projects = projectsResponse?.projects as Project[];
  const [isOpen, setIsOpen] = useState(false);

  if (loading)
    return (
      <div className="bg-c-1 text-c-text z-10 grid w-full place-items-center text-xl">
        {loading ? (
          "Fetching your projects 🚀"
        ) : (
          <div className="flex items-center gap-6">
            <span className="text-base">Server is having a cold start</span>
            <SS />
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className="bg-c-1 text-c-5 z-10 h-screen min-h-fit grow overflow-auto px-10 pb-10 pt-12">
        <div className="flex min-w-[43rem] justify-between">
          <span className="text-2xl font-semibold tracking-wide">Projects</span>
          <button onClick={() => setIsOpen(true)} className="btn">
            Create Project
          </button>
        </div>
        <div className="mt-8">
          <div className="relative">
            <input
              placeholder="Search projects"
              className="focus:border-chakra-blue w-44 rounded-sm border-2 bg-transparent py-[5px] pl-9 pr-2 text-sm outline-none"
            />
            <Icon
              width={20}
              icon="ant-design:search-outlined"
              className="absolute top-[6px] left-2 w-[19px]"
            />
          </div>
        </div>
        <div className="min-w-fit">
          <div className="mt-4 flex py-1 text-sm font-semibold">
            <div className="w-8 shrink-0"></div>
            <div className="min-w-[10rem] grow px-2">Name</div>
            <div className="min-w-[18rem] grow px-2">Description</div>
            <div className="w-52 shrink-0 px-2">Lead</div>
          </div>
          {projects ? (
            projects.length !== 0 ? (
              <div className="border-c-3 mt-1 border-t-2">
                {projects.map((project, i) => (
                  <ProjectRow key={project.id} idx={i} project={project} />
                ))}
              </div>
            ) : (
              <div className="mt-[30vh] grid place-items-center text-xl">
                You haven't created any project yet!! 🚀
              </div>
            )
          ) : null}
        </div>
      </div>
      {isOpen && <CreateProjectModel onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProjectCatalog;
