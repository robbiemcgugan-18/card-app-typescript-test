import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Toggle from "./components/Toggle";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";

// Wraps the page components with a page transition so that we do not need to animate each page individually
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    initial: { opacity: 0, x: -200 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 200 },
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// Uses the page wrapper to animate the routes
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <AllEntries />
            </PageWrapper>
          }
        />
        <Route
          path="create"
          element={
            <PageWrapper>
              <NewEntry />
            </PageWrapper>
          }
        />
        <Route
          path="edit/:id"
          element={
            <PageWrapper>
              <EditEntry />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// The main App component which wraps the entire application
export default function App() {
  return (
    <section>
      <Router>
        <EntryProvider>
          <main className="p-4 min-h-screen">
            <header className="p-4">
              <Toggle />
            </header>
            <NavBar />
            <AnimatedRoutes />
          </main>
        </EntryProvider>
      </Router>
    </section>
  );
}
