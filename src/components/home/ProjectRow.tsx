import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../models/projects.interface";

interface Props {
  idx: number;
  project: Project;
}

const ProjectRow: React.FC<Props> = ({ idx, project }) => {
  const [on, setOn] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOn(true);
  };

  return (
    <div>
      <div
        key={project.id}
        className="group relative flex cursor-pointer border-y-2 border-c-3 border-t-transparent py-1 hover:border-t-2 hover:border-blue-400"
        onClick={() => navigate(project.id + "/board")}
      >
        <div className="w-8 shrink-0 text-center">{idx + 1}</div>
        <div className="min-w-[10rem] grow px-2">{project.name}</div>
        <div className="w-52 shrink-0 px-2">
          {<span className="ml-1 text-sm font-bold">(you)</span>}
        </div>
        <button
          title="Delete or Leave"
          onClick={handleDelete}
          className="btn-icon absolute right-0 ml-5 bg-c-1 group-hover:block sm:hidden"
        >
          <Icon icon="bx:trash" className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ProjectRow;
