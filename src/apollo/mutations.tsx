export const createProject = `mutation CreatProject($name:String!, $key:String!){
  createProject(name: $name, key: $key)
}`;

export const updateIssue = `mutation UpdateIssue($id: ID!, $status: IssueStatus!, $boardPosition: Float!) {
  updateIssue(id: $id, status: $status, boardPosition: $boardPosition)
}`;

export const assignIssue = `mutation AssignIssue($issueId: ID!, $userId: ID!) {
  assignIssue(issueId: $issueId, userId: $userId)
}`;

export const createIssue = `mutation CreateIssue($name: String!, $projectId: ID!, $type: IssueType!) {
	createIssue(name: $name, projectId: $projectId, type: $type)
}`;
export const login = `mutation Login($email:String!,$password:String!) {
  login(email:$email, password:$password) {
    accessToken
    refreshToken
  }
}`;
export const refreshToken = `mutation RefreshToken($refreshToken:String!) {
  refreshToken(value:$refreshToken) {
    accessToken
    refreshToken
  }
}`;
