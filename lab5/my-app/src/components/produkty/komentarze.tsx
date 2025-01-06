import React, { useState, useEffect } from "react";
import Komentarz from "./komentarz";

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzData {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

export default function Komentarze() {
  const [comments, setComments] = useState<KomentarzData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd pobierania danych:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Ładowanie komentarzy...</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Komentarz
          key={comment.id}
          id={comment.id}
          body={comment.body}
          postId={comment.postId}
          likes={comment.likes}
          user={comment.user}
        />
      ))}
    </div>
  );
}
