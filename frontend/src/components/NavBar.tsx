import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Force a re-render when the component has mounted to ensure that the underline is in the correct position
  // Otherwise the underline will be in the wrong position on the first render
  useEffect(() => {
    // This will trigger a re-render after the component has mounted
    setIsLoaded(true);
  }, []);

  // Stylings for the nav bar links in different states
  const linkStyle = "px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 relative";
  const activeStyle = "bg-blue-600 text-white dark:bg-blue-800";
  const inactiveStyle =
    "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";

  return (
    <nav className="flex justify-center items-center gap-8 py-8">
      <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
        {({ isActive }) => (
          <motion.div
            className="relative"
            initial={false}
            animate={isLoaded ? { y: 0 } : { y: 0 }}
          >
            All Entries
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 dark:bg-blue-300"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        )}
      </NavLink>
      <NavLink to="/create" className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}>
        {({ isActive }) => (
          <motion.div
            className="relative"
            initial={false}
            animate={isLoaded ? { y: 0 } : { y: 0 }}
          >
            New Entry
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 dark:bg-blue-300"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        )}
      </NavLink>
    </nav>
  );
}
