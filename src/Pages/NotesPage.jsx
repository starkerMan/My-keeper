import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {NotesDisplay} from '../components/NotesDisplay.jsx';
import { db } from "../firebase";
import { collection, updateDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export const  NotesPage = ({notes, setNotes})=> {
  const { user } = useAuth(); // Get the current user's info
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [availableTags, setAvailableTags] = useState([]); // All unique tags in notes
  const [selectedTags, setSelectedTags] = useState([]); // Selected tags
  console.log('availableTags',availableTags)

  // Fetch notes for the logged-in user
  useEffect(() => {
    const fetchNotes = async () => {

      try{
      if (!user) return;

      const notesQuery = query(
        collection(db, "notes"),
        where("uid", "==", user.uid),

      );

      const querySnapshot = await getDocs(notesQuery);
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const nonArchivedNotes = fetchedNotes.filter(
        (note) => note.isArchived !== true
      );


      // Extract unique tags
      const tags = [
        ...new Set(
          fetchedNotes.flatMap((note) => note.tags || [])
        ),
      ];

      setNotes(nonArchivedNotes);
      setFilteredNotes(fetchedNotes);
      setAvailableTags(tags);

    }catch(err){
      console.error('Error fetching notes:', err);
    }
    };

    fetchNotes();
  }, [setNotes, user]);

  // Filter notes when searchQuery or selectedTags change
  useEffect(() => {
    let filtered = notes;

    // Filter by tags if any tags are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((note) =>
        selectedTags.every((tag) => note.tags?.includes(tag))
      );
    }
  
    // Further filter by search query
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(lowercasedQuery) ||
          note.content.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredNotes(filtered);
  }, [searchQuery, selectedTags, notes]);


  // Delete a note
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  //Archive a note
  const archiveNote = async (id) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { isArchived: true });
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };


  const toggleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevTags, tag] // Add tag if not selected
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTagSelection(tag)}
            className={`px-3 py-1 border rounded ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Display Notes */}
      <NotesDisplay notes={filteredNotes} onDelete={deleteNote} onArchive={archiveNote} />
    </div>
  );
}

