// import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
// import {EntryContext} from '../utilities/globalContext'
// import {Entry, EntryContextType} from '../@types/context'

// export default function NewEntry(){
//     const emptyEntry: Entry = {title: "", description: "",created_at: new Date()}
//     const { saveEntry } = useContext(EntryContext) as EntryContextType
//     const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
//     const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
//         setNewEntry({
//             ...newEntry,
//             [event.target.name] : event.target.value
//         })
//     }
//     const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
//         newEntry.created_at = new Date()
//         saveEntry(newEntry)
//         setNewEntry(emptyEntry)
//     }
//     return(
//         <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
//             <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
//             <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
//             <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Create</button>
//         </section>
//     )
// }

// <input className="p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>

import { format, parseISO } from "date-fns";
import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_at: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: name === "scheduled_at" ? parseISO(value) : value,
    }));
  };

  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    newEntry.created_at = new Date();
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
    navigate("/"); // Added
  };

  // Added a date time picker for the scheduled_at field
  return (
    <section className="flex justify-center flex-col w-full max-w-md mx-auto mt-10 gap-5 bg-gray-100 dark:bg-gray-700 p-8 rounded-md shadow-md">
      <input
        className="p-3 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <div className="flex flex-col">
        <label htmlFor="scheduled_at" className="text-gray-900 dark:text-white">
          For
        </label>
        <input
          className="p-3 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          type="datetime-local"
          name="scheduled_at"
          value={newEntry.scheduled_at ? format(newEntry.scheduled_at, "yyyy-MM-dd'T'HH:mm") : ""}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition duration-200"
      >
        Create
      </button>
    </section>
  );
}
