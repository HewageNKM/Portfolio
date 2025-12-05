import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/blogs"
          className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2 dark:text-white">Manage Blogs</h2>
          <p className="text-gray-600 dark:text-gray-300">Create, edit, and delete blog posts.</p>
        </Link>
        <Link
          to="/admin/projects"
          className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2 dark:text-white">Manage Projects</h2>
          <p className="text-gray-600 dark:text-gray-300">Add and update portfolio projects.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
