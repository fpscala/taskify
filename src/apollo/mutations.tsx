export const createProject = `mutation CreatProject($name:String!){
  createProject(name:$name)
}`;

export const updateIssue = `mutation UpdateIssue($id: ID!, $status: IssueStatus!, $boardPosition: Int!) {
  updateIssue(id: $id, status: $status, boardPosition: $boardPosition)
}`;

export const createIssue = `mutation CreateIssue($name: String!, $projectId: ID!, $type: IssueType!) {
	createIssue(name: $name, projectId: $projectId, type: $type)
}`;
