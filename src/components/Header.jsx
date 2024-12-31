import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const  Header =() => {
  const { user, logOut } = useAuth();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Keeper App</h1>
        <nav className="flex gap-4">
          {user && <Link to="/archive" className="hover:underline content-center">
            Archive
          </Link>}
          {user && <Link to="/" className="hover:underline content-center">
            Notes
          </Link>}
          {user && <Link to="/add" className="hover:underline content-center">
            Add Note
          </Link>}
          {user && (
            <button
              onClick={logOut}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

