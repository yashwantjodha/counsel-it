import { initializeApp } from 'firebase/app'; 

// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyDxeG9YsmkZvdfrbV2KLF1J69IaHladG-0",
    authDomain: "counsellor-a4e71.firebaseapp.com",
    projectId: "counsellor-a4e71",
    storageBucket: "counsellor-a4e71.appspot.com",
    messagingSenderId: "583626803214",
    appId: "1:583626803214:web:fb48d18c30db9bcd9e145f",
    measurementId: "G-SKS0T865EF"
  };
  
  // Initialize Firebaase
const firebaseApp = initializeApp(firebaseConfig);

  
export default firebaseApp;