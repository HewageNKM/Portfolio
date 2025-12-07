import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL } from "../AppSettings";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags?: string[];
  date: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error || "Blog not found"}</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} | NKM Hewage`}
        description={blog.summary}
        url={`https://hewagenkm.com/blogs/${blog.id}`}
        ogImage={
          (blog.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] ||
          "https://hewagenkm.com/og-blogs.png"
        }
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            datePublished: blog.date,
            dateModified: blog.date,
            author: {
              "@type": "Person",
              name: "Nadun Malwenna",
            },
            description: blog.summary,
            image:
              (blog.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] ||
              "https://hewagenkm.com/og-blogs.png",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://hewagenkm.com/blogs/${blog.id}`,
            },
          },
        ]}
      />
      <motion.div
        className="flex flex-col min-h-screen dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-grow md:px-16 md:py-28 p-8 space-y-10">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {new Date(blog.date).toLocaleDateString()}
          </p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div
            className="prose dark:prose-invert max-w-none ql-editor ql-snow"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetails;
