import { BrowserRouter as BR, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense as S, useState } from "react";
import { getTheme } from "./utils";
import Home from "./components/home/Home";
import Login from "./components/auth/login";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";

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
          <Route element={<PrivateRoutes />}>
            <Route
              path="/project"
              element={<Home theme={theme} toggleTheme={toggleTheme} />}
            >
              <Route
                path=":projectId/board"
                element={
                  <S>
                    <Project theme={theme} toggleTheme={toggleTheme} />
                  </S>
                }
              />
            </Route>
            <Route path="/" element={<Navigate to="/project" />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BR>
      <Toaster />
    </main>
  );
}

export default App;
