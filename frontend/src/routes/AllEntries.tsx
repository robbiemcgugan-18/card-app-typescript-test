import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();

  if (entries.length == 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">No Entries Yet</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Start by creating your first entry!</p>
        <Link
          to="/create"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg font-semibold"
        >
          Create New Entry
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry: Entry) => (
          <div
            key={entry.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{entry.title}</h2>
              <p className="text-gray-600 text-l dark:text-gray-400 mb-4">{entry.description}</p>
              <time className="text-xl font-medium text-gray-700 dark:text-gray-300">
                {new Date(entry.scheduled_at.toString()).toLocaleString([], { dateStyle: "long", timeStyle: "short" })}
              </time>
            </div>
            <div className="py-3 px-6 flex justify-between items-center">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <time>
                  Last Updated at{" "}
                  {new Date(entry.created_at.toString()).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                </time>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/edit/${entry.id}`)}
                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Edit entry"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteEntry(entry.id as string)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                  aria-label="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
