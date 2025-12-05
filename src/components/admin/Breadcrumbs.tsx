import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map pathnames to readable labels
  const breadcrumbNameMap: { [key: string]: string } = {
    admin: "Admin",
    dashboard: "Dashboard",
    blogs: "Blogs",
    projects: "Projects",
    new: "Create New",
    edit: "Edit",
  };

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          // Skip "admin" if it's the first segment and we already have Home link pointing to dashboard
          // Actually, let's keep it simple.
          // If path is /admin/dashboard, we show Home > Dashboard
          
          if (value === "admin") return null;

          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          // If it's an ID (simple check: usually long alphanumeric or specific format), maybe show "Details" or truncate
          // For now, let's just show it if it's not in the map, or maybe "Item"
          let name = breadcrumbNameMap[value] || value;
          
          // If previous was "edit", this is likely an ID.
          if (index > 0 && pathnames[index - 1] === "edit") {
             name = "Details"; // Or fetch title if possible, but keep simple for now
          }

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400" />
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    {name}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
