import React from 'react';
import './App.css';


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';


const firebaseConfig = {
  apiKey: "AIzaSyD4KIOUdZfHRVEcLsQNCRuuEVXZDavE9Xs",
  authDomain: "chat-app-d4497.firebaseapp.com",
  projectId: "chat-app-d4497",
  storageBucket: "chat-app-d4497.appspot.com",
  messagingSenderId: "598172773097",
  appId: "1:598172773097:web:ee967af7b6773e9e81de78",
  measurementId: "G-GFYC364MZ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='App'>
      <header>
        <h1>Chat App</h1>
        {user && <SignOut auth={auth} setUser={setUser} />}
      </header>
      <section>
        {user ? (
          <ChatRoom auth={auth} db={db} storage={storage} />
        ) : (
          <SignIn auth={auth} setUser={setUser} />
        )}
      </section>
    </div>
  )
}


export default App;
