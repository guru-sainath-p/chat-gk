import React, { useEffect, useState } from 'react';
// import { ref, getDownloadURL } from 'firebase/storage';
import { format } from 'date-fns';

function ChatMessage(props) {
  const { text, uid, imageUrl, createdAt, seen } = props.message;
  const auth = props.auth;
  // const storage = props.storage;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const profilePicture = require(`../../pictures/${uid}.jpg`);

  // const [photoUrl, setPhotoUrl] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  // Fetch photo URL using caching and local storage
  // const fetchPhotoUrl = useCallback((uid) => {
  //   const photosRef = ref(storage, `${uid}.jpg`);
  //   return getDownloadURL(photosRef)
  //     .then((url) => {
  //       return url;
  //     })
  //     .catch((error) => {
  //       console.error('Error getting photo URL:', error);
  //       // Set a default photo URL if an error occurs (optional)
  //       return 'https://example.com/default-profile.jpg';
  //     });
  // }, [storage]);

  // Fetch photo URL and format time when component mounts or `uid` or `createdAt` changes
  useEffect(() => {
    if (createdAt) {
      setFormattedTime(format(createdAt.toDate(), 'h:mm a'));
    }
  }, [uid, createdAt]);

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={profilePicture} alt="profile-img" className="profile-image" />
        {imageUrl ? (
          <img src={imageUrl} alt="sent-image" className="image-message" />
        ) : (
          <p>{text}</p>
        )}
        <span className="message-time">{formattedTime}</span>
        {messageClass === 'sent' && <div>{seen ? '😏' : '😒'}</div>}
      </div>
    </>
  );
}

export default ChatMessage;