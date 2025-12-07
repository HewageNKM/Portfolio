import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../FirebaseClient";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GraduationCap,
  Trophy,
  Layers,
  LogOut,
  Menu,
  X,
  Folder,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/blogs", label: "Blogs", icon: FileText },
    { path: "/admin/projects", label: "Projects", icon: Folder },
    { path: "/admin/education", label: "Education", icon: GraduationCap },
    { path: "/admin/experiences", label: "Experience", icon: Briefcase },
    { path: "/admin/achievements", label: "Achievements", icon: Trophy },
    { path: "/admin/tech-stacks", label: "Tech Stacks", icon: Layers },
  ];

  return (
    <div
      className="flex h-screen bg-neutral-100 dark:bg-neutral-900 font-inter
                    [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.02)_0px,rgba(0,0,0,0.02)_1px,transparent_1px,transparent_20px)]
                    dark:[background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_20px)]"
    >
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-neutral-800/50 backdrop-blur-xl border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-neutral-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "group-hover:scale-110 transition-transform"
                  }
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center p-4 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 z-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-neutral-200"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-semibold text-neutral-800 dark:text-white">
            Menu
          </span>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
