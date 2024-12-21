import React, { useState } from 'react';

const CreateArea = ({ onAdd }) =>{
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submitNote() {
    if (note.title || note.content) {
      onAdd(note);
      setNote({ title: "", content: "" });
    }
  }

  return (
    <div className="mb-6">
      <input
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Take a note..."
        rows="3"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={submitNote}
      >
        Add
      </button>
    </div>
  );
}

export default CreateArea;
