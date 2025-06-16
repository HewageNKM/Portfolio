import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  // Effect for setting meta data
  useEffect(() => {
    const pageTitle = "404 - Page Not Found | NKM Hewage";
    const pageDescription =
      "Oops! The page you were looking for on NKM Hewage's site could not be found. Please check the URL or return to the homepage.";
    const pageUrl = window.location.href;

    document.title = pageTitle;

    const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("description", pageDescription);
    setMetaTag("robots", "noindex, follow"); // Tell search engines not to index this page

    // Basic OG and Twitter tags for consistency
    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", pageDescription, true);
    setMetaTag("og:url", pageUrl, true);
    setMetaTag("og:type", "website", true);
    setMetaTag('og:image', 'https://hewagenkm.com/og-image.png', true);

    setMetaTag("twitter:card", "summary", false);
    setMetaTag("twitter:title", pageTitle, false);
    setMetaTag("twitter:description", pageDescription, false);
    setMetaTag('twitter:image', 'https://hewagenkm.com/og-image.png', false);
  }, []); // Empty dependency array: run once on mount

  return (
    <main className="flex items-center justify-center h-screen bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
