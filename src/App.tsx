import {
  BrowserRouter as BR,
  Navigate,
  Route as R,
  Routes,
} from "react-router-dom";
import { lazy, Suspense as S, useState } from "react";
import { getTheme } from "./utils";
import Home from "./components/home/Home";
import Login from "./components/auth/login";
import { Toaster } from "react-hot-toast";

const Project = lazy(() => import("./components/project/Project"));

function App() {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () =>
    setTheme(({ mode }) => ({ mode: mode === "light" ? "light" : "dark" }));
  return (
    <main
      className={`bg-c-111 ${
        theme.mode === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <BR>
        <Routes>
          <R
            path="/project"
            element={<Home theme={theme} toggleTheme={toggleTheme} />}
          >
            <R
              path=":projectId/board"
              element={
                <S>
                  <Project />
                </S>
              }
            />
          </R>
          <R path="/login" element={<Login />} />
          <R path="/" element={<Navigate to="/project" />} />
        </Routes>
      </BR>
      <Toaster />
    </main>
  );
}

export default App;
