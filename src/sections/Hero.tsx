"use client";
import { motion } from "framer-motion"; // For adding animations to components
import { useEffect, useState } from "react"; // React hooks for managing state and side effects
import GitStatCard from "../components/GitStatCard";
import { SiGit, SiGithub } from "react-icons/si";
import { BsPeople, BsStar } from "react-icons/bs";
import { apiClient } from "@/lib/api-client";

export default function Hero() {
  const [repos, setRepos] = useState(0);
  const [stars, setStars] = useState(0);
  const [commits, setCommits] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const { data } = await apiClient.get("/github");
        setRepos(data.repos);
        setFollowers(data.followers);
        setStars(data.stars);
        setCommits(data.commits);
      } catch (error) {
        console.error("Failed to fetch GitHub stats");
      }
    };
    fetchGithubStats();
  }, []);

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col pt-24 md:pt-32 pb-10 px-4 md:px-0"
    >
      {/* Name Header Animation */}
      <motion.p
        className="lg:text-3xl text-2xl dark:text-white text-black font-black mt-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        Hey!, I&apos;m Nadun Malwenna
      </motion.p>

      {/* Description Text Animation */}
      <motion.p
        className="font-medium lg:mt-3 mt-1 dark:text-white text-black md:text-xl text-sm capitalize"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
      >
        I&apos;m a passionate Full Stack Developer from Sri Lanka, dedicated to
        continuously learning and building new things every day. I love
        exploring modern web technologies, crafting clean code, and bringing
        creative ideas to life through intuitive user experiences. Whether
        it&apos;s frontend, backend, or somewhere in between, I&apos;m always
        excited to take on new challenges and grow as a developer.
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
