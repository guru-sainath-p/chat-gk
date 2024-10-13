import React, { useEffect, useRef, useState } from 'react';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ChatMessage from '../ChatMessage/ChatMessage';

function ChatRoom(props) {
  const { auth, db, storage } = props;
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'));

  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const messagesEndRef = useRef(null);

  const handleOpenFileDialog = () => {
    document.getElementById('imageInput').click();
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageData = imageFile ? {
      imageUrl: await uploadImage(imageFile),
      text: null,
    } : {
      text: formValue,
      imageUrl: null,
    };

    await addDoc(messagesRef, {
      ...messageData,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      seen: false,
    });


    setFormValue('');
    setImageFile(null);
  };

  const uploadImage = async (image) => {
    const imageRef = ref(storage, `images/${auth.currentUser.uid}-${Date.now()}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };


  useEffect(() => {
    // Scroll to bottom on new message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  return (
    <div>
      <main>
        {messages && messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} auth={auth} storage={storage} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <form onSubmit={sendMessage} className="message-bar">
        <input
          value={formValue}
          className="text-input"
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
        />
        <button type="button" className="image-button" onClick={handleOpenFileDialog}>
          📸
        </button>
        <input
          type="file"
          id="imageInput"
          className="image-input"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button type="submit" disabled={!formValue && !imageFile}>
          🕊️
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
