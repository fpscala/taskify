import { Outlet, useOutlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import ProjectCatalog from "./ProjectCatalog";
import type { Theme } from "../../utils";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const outlet = useOutlet();

  return (
    <>
      {outlet ? (
        <>
          <main className="z-10 h-screen grow overflow-auto bg-c-1 bg-center">
            <Breadcrumbs />
            <Outlet />
          </main>
        </>
      ) : (
        <ProjectCatalog />
      )}
    </>
  );
};

export default Home;
