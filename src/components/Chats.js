import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import { useFirestoreQuery } from '../hooks';
import Admin from './Admin';
import Message from './Message';
import { uniqueNamesGenerator, adjectives, colors, starWars } from 'unique-names-generator';
const RandomName = uniqueNamesGenerator({ dictionaries: [starWars] });

const Channel = ({ user = null }) => {
  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  const { uid, displayName } = user;
  const messages = useFirestoreQuery(
    messagesRef.where('uid', "in", [uid, 'counsellor']).orderBy('createdAt', 'desc').limit(100)
  );

  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef();
  const bottomListRef = useRef();


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: RandomName,
        uid,
        type: 'student'
      });
      // Clear input field
      setNewMessage('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto content-center text-center shadow-lg px-36 pb-20 pt-5">
      <div className="">
        <div className="">
          <div className="pb-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="text-xl">Welcome to</p>
              <p className="text-5xl">Counsel It</p>
            </div>
            <p className="text-gray-400 text-center">
            Just counsel it out!🤝
            </p>
          </div>
          <div class="p-10 bg-gray-600 rounded-2xl m-5 text-center text-white">
          You are chatting Anonymously. Feel free to share your thoughts about anything.
        </div>
          <ul>
            <div className='flex flex-col text-left bg-blue-50 rounded-xl '>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id}>
                    {(message.type == "student") ? <Message {...message} /> : <Admin {...message} />}
                  
                </li>
              ))}
              </div>
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4 text-center">
        <form
          onSubmit={handleOnSubmit}
          className=""
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="shadow-xl p-5 ml-8  rounded-full cursor-pointer active:shadow-md"
          >
            <svg class="h-8 w-8 text-green-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="22" y1="2" x2="11" y2="13" />  <polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

export default Channel;
