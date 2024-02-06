import { Outlet, useOutlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import ProjectCatalog from "./ProjectCatalog";
import type { Theme } from "../../utils";
import { SelectedIssueProvider } from "../context/use-selected-issue-context";
import Avatar from "../util/Avatar";
import { useState } from "react";
import Sidebar from "../sidebar";

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const outlet = useOutlet();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {outlet ? (
          <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
              <div className="border-b-2 border-gray-200">
                <header className="px-6">
                  <div className="flex items-center justify-between border-b border-gray-200 py-3">
                    <button
                      onClick={toggleSidebar}
                      className="text-gray-600 lg:hidden"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </button>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <input
                        type="text"
                        name="search"
                        id="serach"
                        placeholder="Search"
                        autoComplete="off"
                        className="rounded-md border border-gray-300 py-2 pl-12 pr-4 placeholder-gray-400"
                      />
                    </div>
                    <div className="flex items-center">
                      <button>
                        <svg
                          className="h-6 w-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </button>
                      <button className="ml-6">
                        <img
                          className="h-9 w-9 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3.5&w=144&h=144&q=80"
                          alt="man smiling"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-semibold leading-tight">
                        All Issues
                      </h2>
                      <div className="ml-6 flex items-center">
                        {/* <Avatar users={users} /> */}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex rounded-md border bg-gray-200 p-0.5">
                        <button className="px-3 py-1">
                          <svg
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                          </svg>
                        </button>
                        <button className="ml-1 rounded bg-white px-3 py-1 shadow">
                          <svg
                            className="h-6 w-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                            />
                          </svg>
                        </button>
                      </span>
                      <button className="ml-5 flex items-center rounded-md bg-gray-800 py-2 pl-3 pr-4 text-white hover:bg-gray-900 focus:bg-gray-900">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="ml-1 text-sm font-medium tracking-wide">
                          New Issue
                        </span>
                      </button>
                    </div>
                  </div>
                </header>
              </div>
              <main className="w-full px-6">
                <SelectedIssueProvider>
                  <Breadcrumbs />
                  <Outlet />
                </SelectedIssueProvider>
              </main>
            </div>
          </div>
      ) : (
        <ProjectCatalog />
      )}
    </>
  );
};

export default Home;
