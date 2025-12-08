import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../../FirebaseClient";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../AppSettings";
import { Pencil, Trash2, Plus } from "lucide-react";
import SEO from "../../components/SEO";

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const EducationList = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEducations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/educations`);
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
      // toast.error("Failed to fetch educations"); // Suppress if 404 initally
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this education record?")
    )
      return;
    try {
      const token = await auth.currentUser?.getIdToken();
      await axios.delete(`${API_BASE_URL}/educations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Education record deleted");
      fetchEducations();
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className="text-neutral-900 dark:text-neutral-100">
      <SEO title="Admin - Education | NKM Hewage" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Education</h1>
        <Link
          to="/admin/education/new"
          className="bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          {educations.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No education records found. Add one to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700 text-left">
                <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-neutral-200 dark:divide-neutral-700">
                  {educations.map((edu) => (
                    <tr
                      key={edu.id}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900 dark:text-white">
                        {edu.institution}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                        {edu.degree}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-500 dark:text-neutral-400 text-sm">
                        {edu.startDate} - {edu.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/education/edit/${edu.id}`}
                            className="text-neutral-900 hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
                          >
                            <Pencil size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(edu.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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
      )}
    </div>
  );
};

export default EducationList;
