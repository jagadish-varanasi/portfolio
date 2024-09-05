"use client";
import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { motion } from "framer-motion";

function Socials() {
  return (
    <ul className="flex flex-wrap gap-10 mt-[37px] text-slate-500 dark:text-slate-400">
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <GitHubLogoIcon className="w-7 h-7 cursor-pointer hover:text-black dark:hover:text-white" />
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <TwitterLogoIcon className="w-7 h-7 cursor-pointer hover:text-sky-400" />
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <LinkedInLogoIcon className="w-7 h-7 cursor-pointer hover:text-[#0A66C2]" />
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <EnvelopeOpenIcon className="w-7 h-7 cursor-pointer hover:text-red-400" />
      </motion.li>
      <motion.li
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <InstagramLogoIcon className="w-7 h-7 cursor-pointer hover:text-[#EF3C73]" />
      </motion.li>
    </ul>
  );
}

export default Socials;
