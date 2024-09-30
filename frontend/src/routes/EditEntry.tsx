// import {useState, useContext, ChangeEvent, MouseEvent, useEffect} from 'react'
// import {useParams, useNavigate} from 'react-router-dom'
// import {EntryContext} from '../utilities/globalContext'
// import {Entry, EntryContextType} from '../@types/context'

// export default function EditEntry(){
//     const {id} = useParams()
//     const emptyEntry: Entry = {title: "", description: "",created_at: new Date()}

//     const { updateEntry, entries } = useContext(EntryContext) as EntryContextType
//     const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)

//     useEffect(() =>{
//         const entry = entries.filter(entry=> entry.id == id)[0]
//         setNewEntry(entry)
//     },[])
//     const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
//         setNewEntry({
//             ...newEntry,
//             [event.target.name] : event.target.value
//         })
//     }
//     const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
//         updateEntry(id as string,newEntry)
//     }
//     return(
//         <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
//             <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
//             <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
//             <input className="p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
//             <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Update</button>
//         </section>
//     )
// }

import { format, parseISO } from "date-fns";
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const navigate = useNavigate();

  // Set the new entry to the entry with the id from the URL
  useEffect(() => {
    const entry = entries.find((entry) => entry.id == id);
    if (entry) setNewEntry(entry);
  }, []);

  // Update the new entry when the input changes either with the raw value for the text fields or the parsed date for the date field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: name === "scheduled_at" ? parseISO(value) : value,
    }));
  };

  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    newEntry.created_at = new Date(); // Sets the created_at field to the current date and time
    updateEntry(id as string, newEntry);
    navigate("/");
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
          Scheduled For
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
        Update
      </button>
    </section>
  );
}
