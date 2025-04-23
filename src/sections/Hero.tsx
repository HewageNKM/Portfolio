import { motion } from "framer-motion"; // For adding animations to components
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import { getFollowers, getTotalCommits, getTotalRepos, getTotalStars } from "../utils"; // Utility functions to fetch data
import GitStatCard from "../components/GitStatCard"; // A custom component to display Git stats
import { SiGit, SiGithub } from "react-icons/si"; // GitHub-related icons
import { BsPeople, BsStar } from "react-icons/bs"; // People and star icons for GitHub stats

export default function Hero() {
  // State hooks for storing fetched data
  const [repos, setRepos] = useState(0); // Number of repositories
  const [stars, setStars] = useState(0); // Number of stars
  const [commits, setCommits] = useState(0); // Number of commits
  const [followers, setFollowers] = useState(0); // Number of followers

  // Effect hook to fetch the GitHub data when the component mounts
  useEffect(() => {
    // Fetch and set total repositories
    getTotalRepos().then((res) => {
      setRepos(res); // Update the state with the number of repositories
    });
    // Fetch and set total commits
    getTotalCommits().then((res) => {
      setCommits(res || 0); // Update state with the number of commits, defaulting to 0 if no data
    });
    // Fetch and set total stars
    getTotalStars().then((res) => {
      setStars(res || 0); // Update state with the number of stars, defaulting to 0 if no data
    });
    // Fetch and set followers
    getFollowers().then((res) => {
      setFollowers(res); // Update state with the number of followers
    });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <motion.section
      id="hero" // Assigns an ID to the section for linking
      initial={{ opacity: 0, y: 50 }} // Initial state: start invisible and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original vertical position
      transition={{ duration: 0.8, ease: "easeOut" }} // Transition duration and easing for the animation
      className="w-full flex flex-col py-4 gap-3 md:px-10 px-8 mt-10" // Tailwind CSS classes for styling
    >
      {/* Name Header Animation */}
      <motion.p
        className="lg:text-3xl text-xl dark:text-white text-black font-black mt-1"
        initial={{ opacity: 0, x: 20 }} // Starts slightly moved right and invisible
        animate={{ opacity: 1, x: 0 }} // Animates to original position and becomes visible
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }} // Transition delay and duration
      >
        ## Hey !, I'm Nadun.👀
      </motion.p>

      {/* Description Text Animation */}
      <motion.p
        className="font-medium lg:mt-3 mt-1 dark:text-white text-black md:text-xl text-lg capitalize"
        initial={{ opacity: 0 }} // Starts invisible
        animate={{ opacity: 1 }} // Becomes visible
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }} // Transition delay and duration
      >
        I'm a passionate Full Stack Developer from Sri Lanka, dedicated to
        continuously learning and building new things every day. I love
        exploring modern web technologies, crafting clean code, and bringing
        creative ideas to life through intuitive user experiences. Whether it's
        frontend, backend, or somewhere in between, I'm always excited to take
        on new challenges and grow as a developer.
      </motion.p>

      {/* GitHub Stats Section */}
      <motion.div>
        {/* List of GitHub stats */}
        <ul className="flex mt-5 flex-wrap gap-2 flex-row justify-between">
          <li>
            {/* Contribution Card */}
            <GitStatCard value={commits} label="Contributions" img={SiGithub} />
          </li>
          <li>
            {/* Followers Card */}
            <GitStatCard value={followers} label="Github followers" img={BsPeople} />
          </li>
          <li>
            {/* Stars Card */}
            <GitStatCard value={stars} label="Github stars" img={BsStar} />
          </li>
          <li>
            {/* Repositories Card */}
            <GitStatCard value={repos} label="Repositories" img={SiGit} />
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
}
