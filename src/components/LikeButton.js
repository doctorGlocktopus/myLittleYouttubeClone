import React, { useState, useEffect } from 'react';

const LikeButton = ({ videoId }) => {
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem(`likes-${videoId}`);
    return savedLikes ? parseInt(savedLikes) : 0;
  });

  const [liked, setLiked] = useState(() => {
    const savedLiked = localStorage.getItem(`liked-${videoId}`);
    return savedLiked ? JSON.parse(savedLiked) : false;
  });

  useEffect(() => {
    localStorage.setItem(`likes-${videoId}`, likes);
    localStorage.setItem(`liked-${videoId}`, liked);
  }, [likes, liked, videoId]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div>
      <button 
        onClick={handleLike} 
        className={`ui button ${liked ? 'red' : ''}`}
      >
        {liked ? 'Gefällt mir nicht mehr' : 'Gefällt mir'}
      </button>
      <div>
        {likes} {likes === 1 ? 'Gefällt mir' : 'Gefallen mir'}
      </div>
    </div>
  );
};

export default LikeButton;
