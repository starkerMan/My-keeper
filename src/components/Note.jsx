
const Note = ({ id, title, content, onDelete }) => {
  // Delete note when clicked
  function handleClick() {
    onDelete(id);
  }

    return (
      <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{content}</p>
        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" onClick={handleClick}>
          Delete
        </button>
      </div>
    );
  }
  
  export default Note;
  