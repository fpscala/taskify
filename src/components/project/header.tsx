"use client";
import React from "react";
import { useFiltersContext } from "../context/use-filters-context";
import { NotImplemented } from "../not-implemented";
import { Button } from "../ui/button";
import { BiLineChart } from "react-icons/bi";
import { Project } from "../../models/projects.interface";

const BoardHeader: React.FC<{ project: Project }> = ({ project }) => {
  const { search, setSearch } = useFiltersContext();
  return (
    <div className="flex h-fit flex-col">
      <div className="text-sm text-gray-500">Projects / {project.name}</div>
      <h1>Active sprints </h1>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-x-5"></div>
        <NotImplemented feature="insights">
          <Button className="flex items-center gap-x-2">
            <BiLineChart className="text-gray-900" />
            <span className="text-sm text-gray-900">Insights</span>
          </Button>
        </NotImplemented>
      </div>
    </div>
  );
};

export { BoardHeader };
