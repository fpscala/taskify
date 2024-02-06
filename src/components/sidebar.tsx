import Nav from "../components/nav";

const issues = [
  { href: "#", label: "All", value: 36, active: true },
  { href: "#", label: "Assigned to me", value: 3 },
  { href: "#", label: "Created by me", value: 11 },
  { href: "#", label: "Archived" },
];

const tags = [
  { href: "#", label: "Bug" },
  { href: "#", label: "Feature request" },
  { href: "#", label: "Marketing" },
  { href: "#", label: "v2.0" },
  { href: "#", label: "Enhancement" },
  { href: "#", label: "Design" },
  { href: "#", label: "Design 1" },
  { href: "#", label: "Design 2" },
];
interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 w-64 transform overflow-auto px-8 py-4 transition-transform ${
        isOpen ? "-translate-x-full ease-in" : "translate-x-0 ease-out"
      }  border-r bg-gray-100 lg:static lg:inset-auto lg:translate-x-0`}
    >
      <div className="flex items-center justify-between">
        <img className="h-9 w-9" src="/logo.svg" alt="task manager logo" />
        <button className="text-gray-600 lg:hidden" onClick={toggleSidebar}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav>
        <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-gray-600">
          Issues
        </h3>
        <Nav links={issues} />
        <h3 className="mt-6 text-xs font-bold uppercase tracking-wide text-gray-600">
          Tags
        </h3>
        <Nav links={tags} />
        <div className="mt-4 -ml-1">
          <button className="flex w-full items-center rounded-lg py-2 text-gray-600 hover:bg-gray-200 focus:bg-gray-200">
            <svg
              className="h-5 w-5 text-gray-500"
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
            <span className="ml-2 text-sm font-medium tracking-wide">
              New Project
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
