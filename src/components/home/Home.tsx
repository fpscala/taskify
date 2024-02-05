import { Outlet, useOutlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import ProjectCatalog from "./ProjectCatalog";
import type { Theme } from "../../utils";
import { SelectedIssueProvider } from "../context/use-selected-issue-context";
import { Container } from "../ui/container";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const outlet = useOutlet();

  return (
    <>
      {outlet ? (
        <Container className="h-full">
          <main className="w-full">
            <SelectedIssueProvider>
              <Breadcrumbs />
              <Outlet />
            </SelectedIssueProvider>
          </main>
        </Container>
      ) : (
        <ProjectCatalog />
      )}
    </>
  );
};

export default Home;
