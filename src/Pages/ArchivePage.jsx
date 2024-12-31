import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import Note from "../components/Note";

function ArchivePage() {
  const { user } = useAuth();
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const notesQuery = query(
        collection(db, "notes"),
        where("uid", "==", user.uid),
        where("isArchived", "==", true) // Fetch only archived notes
      );

      const querySnapshot = await getDocs(notesQuery);
      const fetchedNotes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArchivedNotes(fetchedNotes);
    };

    fetchArchivedNotes();
  }, [user]);

  const unarchiveNote = async (id) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { isArchived: false });

    // Remove the unarchived note from the current view
    setArchivedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Archived Notes</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {archivedNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            tags={note.tags}
            onArchive={unarchiveNote} // Unarchive instead of archive
          />
        ))}
      </div>
    </div>
  );
}

export default ArchivePage;
