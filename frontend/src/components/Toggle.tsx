import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "../utilities/ThemeContext";

const Toggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    // The toggle button which animates between light mode and dark mode when clicked
    <div className="fixed top-4 right-4 z-10 flex items-center">
      <span className="mr-2 text-sm font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      <motion.div
        className="w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer"
        onClick={toggleTheme} // Toggle the theme when the div is clicked
        initial={false}
        animate={{ backgroundColor: isDarkMode ? "#4B5563" : "#D1D5DB" }}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-white dark:bg-gray-800"
          initial={false}
          animate={{
            x: isDarkMode ? 28 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
};

export default Toggle;
