const userData = `
  id
  firstname
  image {
    url
  }
`
const issueData = `
  id
  name
  key
  type
  createdAt
  updatedAt
  description
  status
  boardPosition
  sprintPosition
  assigner {
    ${userData}
  }
`

export const authed_user = `query AuthedUser {
  currentUser {
    ${userData}
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
      ${issueData}
    }
  }
}`;

export const findIssue = `query FindIssue($issueId:ID!) {
  findIssue(value:$issueId) {
    ${issueData}
  }
}`;
