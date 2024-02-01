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

export const issues = `query FetchIssues($userId:ID, $projectId:ID, $sprintId:ID) {
  issues(userId:$userId, projectId:$projectId, sprintId:$sprintId) {
    data {
      id
      name
      key
      description
    }
  }
}`;
