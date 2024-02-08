import { Outlet, useOutlet } from "react-router-dom";
import type { Theme } from "../../utils";
import ProjectCatalog from "./ProjectCatalog";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const outlet = useOutlet();

  return <>{outlet ? <Outlet /> : <ProjectCatalog />}</>;
};

export default Home;
