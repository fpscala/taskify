export const authed_user = `query AuthedUser {
  currentUser {
    id
    firstname
    privileges
    email
  }
}`;
export const projects = `query FetchProjects {
  projects {
    id
    name
    key
  }
}`;
export const findProject = `query FindProjects($projectId:ID!) {
  findProject(value:$projectId) {
    id
    name
    key
  }
}`;

export const issues = `query FetchIssues($userId:ID, $projectId:ID, $sprintId:ID) {
  issues(userId:$userId, projectId:$projectId, sprintId:$sprintId) {
    data {
      id
      name
      key
      description,
      status,
      boardPosition,
      sprintPosition
    }
  }
}`;

export const findIssue = `query FindIssue($issueId:ID!) {
  findIssue(value:$issueId) {
    id
    name
    key
    description,
    status,
    boardPosition,
    sprintPosition
  }
}`;
