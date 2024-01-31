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
