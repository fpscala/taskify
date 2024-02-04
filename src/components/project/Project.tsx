import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { findProject } from "../../apollo/queries";
import { Board } from "./Board";
const FIND_PROJECT = gql`
  ${findProject}
`;

const Project = () => {
  const projectId = useParams().projectId;
  const { data } = useQuery(FIND_PROJECT, {
    variables: { projectId: projectId },
  });
  const project = data.findProject;
  if (!project) {
    return null;
  }
  return <Board project={project} />;
};

export default Project;
