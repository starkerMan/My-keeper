import {useState} from 'react';
import {useAuth} from './context/AuthContext';
import { Route, Routes,Navigate } from 'react-router-dom';
import {NotesPage} from './Pages/NotesPage';
import {Signup} from './Signup/Signup';
import {Login} from './Login/Login';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import { db } from './firebase';
import { AddNotePage } from './Pages';
import {addDoc, collection} from 'firebase/firestore';
import ArchivePage from './Pages/ArchivePage';


function App() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]); // Shared state for notes

  const onAdd = async (newNote) => {
    if (!user) return;

    // Add note to Firestore
    const noteWithUser = { ...newNote, uid: user.uid, isArchived: false };
    const docRef = await addDoc(collection(db, "notes"), noteWithUser);

    // Update local state
    setNotes((prevNotes) => [...prevNotes, { id: docRef.id, ...noteWithUser }]);
  };


  return  (
      <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main  className='flex-grow container mx-auto px-4 py-8'>
            <Routes>
              {/* Redirect to the login page if the user is not authenticated */}
              <Route path="/" element={user ? <NotesPage notes={notes} setNotes={setNotes} /> : <Navigate to="/login" />} />
              <Route path="/add" element={user ? <AddNotePage onAdd={onAdd} /> : <Navigate to="/login" />} />
              <Route path="/archive" element={user ? <ArchivePage /> : <Navigate to="/login" />} />              

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            </main>
            <Footer/>
      </div>
  );
}

export default App;
