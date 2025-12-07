import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
}

const ExperienceList = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/experiences`);
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to load experiences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      await axios.delete(`${API_BASE_URL}/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Experience deleted");
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience");
    }
  };

  return (
    <div className="text-neutral-900 dark:text-neutral-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Link
          to="/admin/experiences/new"
          className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          New
        </Link>
      </div>

      <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-neutral-500">Loading...</div>
        ) : experiences.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No experience records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium">{exp.role}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                      {exp.company}
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                      {exp.duration}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/experiences/${exp.id}`)
                          }
                          className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceList;
