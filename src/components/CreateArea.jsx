import React, { useState } from 'react';

export const CreateArea = ({ onAdd }) =>{
  const [note, setNote] = useState({
    title: '',
    content: '',
    tags: [], 
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

    const addTag = (event) =>{
      event.preventDefault();
      const trimmedTag = tagInput.trim();
  
      if (trimmedTag && !note.tags.includes(trimmedTag)) {
        setNote((prevNote) => ({
          ...prevNote,
          tags: [...prevNote.tags, trimmedTag],
        }));
      }
  
      setTagInput(""); // Clear the tag input
    }

    const removeTag = (tagToRemove) => {
      setNote((prevNote) => ({
        ...prevNote,
        tags: prevNote.tags.filter((t) => t !== tagToRemove),
      }));
    }

  const submitNote = () => {
     if (note.title || note.content) {
      onAdd(note); // Pass the note object, including tags
      setNote({
        title: "",
        content: "",
        tags: [],
      });
      setTagInput(""); // Clear the tag input
    }
  }

  return (
    <div className="mb-6">
      {/* Title Input */}
      <input
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
      />

      {/* Content Input */}
      <textarea
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Take a note..."
        rows="3"
      />

      {/* Tags Input */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Add a tag..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTag}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Tag
        </button>
      </div>

      {/* Display Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md border border-gray-400 flex items-center"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-red-500 hover:text-red-600"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Add Note Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={submitNote}
      >
        Add Note
      </button>
    </div>
  );
}