import React from "react";
import { CreateArea } from "../components/CreateArea";

export const AddNotePage =({ onAdd })=> {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add a New Note</h1>
      <CreateArea onAdd={onAdd} />
    </div>
  );
}

