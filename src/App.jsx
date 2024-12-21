// src/App.jsx
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Note from './components/Note';
import Footer from './components/Footer';
import CreateArea from './components/CreateArea';

function App() {
    // Declare state variable for notes
    const [notes, setNotes] = useState(() => {
      const storedNotes = localStorage.getItem("notes");
      return storedNotes ? JSON.parse(storedNotes) : [];
    });
  

    //Save Notes to LocalStorage whenever `notes` change
    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    // Add new note to the list
    function addNote(newNote) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
      
    }
  
    // Delete note function
    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((note, index) => {
          return index !== id;
        });
      });
    }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CreateArea onAdd={addNote} />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((noteItem, index) => {
          return (
             <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
