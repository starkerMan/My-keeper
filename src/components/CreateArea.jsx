import React, { useState } from 'react';
import { blockStyleFn } from './utils';
import {
  Editor,
  RichUtils,
  EditorState,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css"; 
import "../App.css"; 

export const CreateArea = ({ onAdd }) =>{
  const [note, setNote] = useState({
    title: '',
    content: EditorState.createEmpty(), // Initialize Draft.js editor state
    tags: [], 
  });

  const [tagInput, setTagInput] = useState('');


  const handleTitleChange = (event) => {
    const { value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      title: value,
    }));
  };

  const handleContentChange = (editorState) => {
    setNote((prevNote) => ({
      ...prevNote,
      content: editorState,
    }));
  };

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
     if (note.title || note.content.getCurrentContent().hasText()) {
      const rawContentState = convertToRaw(note.content.getCurrentContent());
      onAdd({ ...note, content: rawContentState }); // Pass raw content to parent
      setNote({
        title: "",
        content: EditorState.createEmpty(),
        tags: [],
      });
      setTagInput(""); // Clear the tag input
    }
  }


  // Handle formatting (bold, italic, etc.)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(note.content, command);
    if (newState) {
      handleContentChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const applyInlineStyle = (style) => {
    handleContentChange(RichUtils.toggleInlineStyle(note.content, style));
  };

  const applyBlockStyle = (blockType) => {
    handleContentChange(RichUtils.toggleBlockType(note.content, blockType));
  };

  return (
    <div className="mb-6">
      {/* Title Input */}
      <input
        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        name="title"
        value={note.title}
        onChange={handleTitleChange}
        placeholder="Title"
      />

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => applyInlineStyle("BOLD")}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          Bold
        </button>
        <button
          onClick={() => applyInlineStyle("ITALIC")}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          Italic
        </button>
        <button
          onClick={() => applyBlockStyle("header-one")}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          H1
        </button>
        <button
          onClick={() => applyBlockStyle("header-two")}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          H2
        </button>
        <button
          onClick={() => applyBlockStyle("unordered-list-item")}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          Bullet List
        </button>
      </div>

      {/* Draft.js Editor */}
      <div className="border border-gray-300 p-4 rounded-md mb-4">
        <Editor
          editorState={note.content}
          onChange={handleContentChange}
          handleKeyCommand={handleKeyCommand} // Handle keyboard shortcuts
          placeholder="Take a note..."
          blockStyleFn={blockStyleFn} 
        />
      </div>

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