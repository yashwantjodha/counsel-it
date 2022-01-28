import react, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, getDocs, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from "./firebase";

// Firebase setup
const config = initializeApp({
    apiKey: "AIzaSyDxeG9YsmkZvdfrbV2KLF1J69IaHladG-0",
    authDomain: "counsellor-a4e71.firebaseapp.com",
    projectId: "counsellor-a4e71",
    storageBucket: "counsellor-a4e71.appspot.com",
    messagingSenderId: "583626803214",
    appId: "1:583626803214:web:fb48d18c30db9bcd9e145f",
    measurementId: "G-SKS0T865EF"
  });


  const auth = getAuth(firebaseApp);
  

// Firestore
const db = getFirestore(firebaseApp);
//connectFirestoreEmulator(db, 'localhost', 8080)

const messagesCollection = collection(db, "messages");

 function readMessages() {
  const testMsg = doc(db, 'messages/test');
  console.log(testMsg);
}

async function addMessage (message) {
  console.log('called');
  const user = auth.currentUser;
    const newMessage = addDoc(messagesCollection, {
      message: message,
      sentBy: user.uid,
      createdAt: serverTimestamp(),
    });
  console.log('sent');
}

function Dashboard() {

  const [messageValue, changeMessageValue] = useState('');

  function handleSendMessage(e) {
    e.preventDefault();
    addMessage(messageValue);
  }

    return (
      <div>
        <h1>Login Success!</h1>
        <h2>chat with mentor</h2>
        <form onSubmit={handleSendMessage}>
          <input value={messageValue} onChange={(e) => {changeMessageValue(e.target.value)}}/>
          <button type="submit">Send Message</button>
        </form>
      </div>
    )
  }
  
export default Dashboard;