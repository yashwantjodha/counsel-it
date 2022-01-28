import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState, useDarkMode } from './hooks';
import Channel from './components/Chats';


// Firebase setup
firebase.initializeApp({
  apiKey: "AIzaSyDxeG9YsmkZvdfrbV2KLF1J69IaHladG-0",
  authDomain: "counsellor-a4e71.firebaseapp.com",
  projectId: "counsellor-a4e71",
  storageBucket: "counsellor-a4e71.appspot.com",
  messagingSenderId: "583626803214",
  appId: "1:583626803214:web:fb48d18c30db9bcd9e145f",
  measurementId: "G-SKS0T865EF"
});


//*** Main App */
function App() {
  const { user, initializing } = useAuthState(firebase.auth());
  const [darkMode, setDarkMode] = useDarkMode();

  const signInWithGoogle = async () => {
    // Google Sign In
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderContent = () => {
    if (initializing) {
      return (
        <div className="">
          Loading....
        </div>
      );
    }

    if (user) return <Channel user={user} />;

    return (
      <div className="root flex h-screen">
        <div className="m-auto container mx-auto content-center text-center shadow-lg border-2 p-40">
          <h2 className="text-8xl font-bold my-10 text-center">
          COUNSEL IT
          </h2>
          <p className="text-gray-600 text-xl">
          Just counsel it out!🤝
          </p>
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <header
        className=""
        style={{ height: 'var(--topbar-height)' }}
      >
        <div className="flex justify-end">
          {user ? (
            <button
              onClick={signOut}
              className="p-3 rounded-xl bg-blue-800 m-5 font-bold text-white shadow-lg"
            >
              Sign out
            </button>
          ) : null}
        </div>
      </header>
      <main
        className="flex-1"
        style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
      >
        {renderContent()}
      </main>
      <footer className='text-center justify-end font-bold text-gray-600 italic pt-10'>
        Created by Team Deformers
      </footer>
    </div>
  );
}

export default App;
