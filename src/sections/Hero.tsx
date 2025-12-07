import { motion } from "framer-motion"; // For adding animations to components
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import {
  getFollowers,
  getTotalCommits,
  getTotalRepos,
  getTotalStars,
} from "../utils";
import GitStatCard from "../components/GitStatCard";
import { SiGit, SiGithub } from "react-icons/si";
import { BsPeople, BsStar } from "react-icons/bs";

export default function Hero() {
  const [repos, setRepos] = useState(0);
  const [stars, setStars] = useState(0);
  const [commits, setCommits] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    getTotalRepos().then((res) => {
      setRepos(res);
    });
    getTotalCommits().then((res) => {
      setCommits(res || 0);
    });
    getTotalStars().then((res) => {
      setStars(res || 0);
    });
    getFollowers().then((res) => {
      setFollowers(res);
    });
  }, []);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col p-2 md:mt-10 mt-2"
    >
      {/* Name Header Animation */}
      <motion.p
        className="lg:text-3xl text-2xl dark:text-white text-black font-black mt-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        Hey!, I'm Nadun Malwenna
      </motion.p>

      {/* Description Text Animation */}
      <motion.p
        className="font-medium lg:mt-3 mt-1 dark:text-white text-black md:text-xl text-sm capitalize"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
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
            <GitStatCard
              value={followers}
              label="Github followers"
              img={BsPeople}
            />
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
