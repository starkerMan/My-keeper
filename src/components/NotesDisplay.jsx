import React from "react";
import Note from "./Note";

export const NotesDisplay =({ notes, onDelete })=> {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          tags={note.tags}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

