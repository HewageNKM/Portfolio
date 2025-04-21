import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getFollowers, getTotalCommits, getTotalRepos, getTotalStars } from "../utils";
import GitStatCard from "../components/GitStatCard";
import { SiGit, SiGitconnected, SiGitee, SiGithub, SiPrecommit } from "react-icons/si";
import { BsPeople, BsStars } from "react-icons/bs";


export default function Hero() {
  const [repos,setRepos]  = useState(0);
  const [stars,setStars]  = useState(0);
  const [commits,setCommits]  = useState(0);
  const [followers,setFollowers]  = useState(0);

  useEffect(()=>{
    getTotalRepos().then((res)=>{
      setRepos(res)
    })
    getTotalCommits().then((res)=>{
      setCommits(res)
    })
    getTotalStars().then((res)=>{
      setStars(res)
    })
    getFollowers().then((res)=>{
      setFollowers(res)
    })
  },[])


  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col py-4 gap-3 md:px-10 px-8 mt-10"
    >
      <motion.h3
        className="text-2xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        👨🏼‍💻 About Me
      </motion.h3>

      <motion.p
        className="lg:text-3xl text-xl font-black mt-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        ## Hey !, I'm Nadun.👀
      </motion.p>

      <motion.p
        className="font-medium lg:mt-3 mt-1 md:text-xl  text-lg capitalize"
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

      {/* Github Details */}
      <motion.div>
        <ul className="flex mt-5 flex-wrap gap-2 flex-row justify-between ">
          <li>
            <GitStatCard value={commits} label="Contributions" img={SiGithub} />
          </li>
          <li>
            <GitStatCard value={followers} label="Github followers" img={BsPeople}/>
          </li>
          <li>
          <GitStatCard value={stars} label="Github stars" img={BsStars}/>
          </li>
          <li>
          <GitStatCard value={repos} label="Repositories" img={SiGit}/>
          </li>
        </ul>
      </motion.div>
    </motion.section>
  );
}
