import {Editor, EditorState, convertFromRaw} from 'draft-js';
import { FaTrash,FaArchive } from "react-icons/fa"; // Import the trash icon 
const Note = ({ id, title, content,tags, onDelete, onArchive }) => {
  let editorState;

  try {
    // Validate and convert content
    editorState = EditorState.createWithContent(convertFromRaw(content));
  } catch (error) {
    // Handle invalid or missing content
    console.error("Invalid RawDraftContentState:", error.message);
    editorState = EditorState.createEmpty(); // Fallback to an empty editor state
  }
  // Delete note when clicked
  const handleDeleteNote =() => {
    onDelete(id);
  }

    return (
      <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
       {/* Render Draft.js content */}
       <div className="mb-4">
        <Editor editorState={editorState} readOnly={true} />
      </div>
        {/* Display Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md border border-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

           {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => onArchive(id)}
          >
            <FaArchive size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => handleDeleteNote(id)}
          >
            <FaTrash size={18} /> 
          </button>
      </div>
      </div>
    );
  }
  
  export default Note