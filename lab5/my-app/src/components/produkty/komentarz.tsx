import React, { useState } from "react";
import './Komentarz.css';


interface User {
    id: number;
    username: string;
    fullName: string;
  }

export default function Komentarz({ id, body, postId, likes, user }: { id: number; body: string; postId: number; likes: number; user: User }) {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setLikeCount(likeCount - 1);
  };

  return (
    <div className="komentarz">
      <div className="komentarz-header">
        {user.fullName} <span className="username">({user.username})</span>
      </div>
      <div className="komentarz-body">{body}</div>
      <div className="komentarz-footer">
        <div className="like-dislike">
          <button onClick={handleLike} className="like-button">
            👍
          </button>
          <p>{likeCount}</p>
          <button onClick={handleDislike} className="dislike-button">
            👎 
          </button>
        </div>
        <div className="post-info">
          Komentarz pod postem {postId}
        </div>
      </div>
    </div>
  );
}
