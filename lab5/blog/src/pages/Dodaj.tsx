import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dodaj(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    const newArticle = {
      id: Date.now().toString(),
      title,
      content,
    };

    const storedArticles = localStorage.getItem('articles');
    const articles = storedArticles ? JSON.parse(storedArticles) : [];
    articles.push(newArticle);

    localStorage.setItem('articles', JSON.stringify(articles));
    navigate('/blog');
  };

  return (
    <div>
      <h2>Dodaj Artykuł</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tytuł</label>
          <br></br>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Treść</label>
          <br></br>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">DODAJ</button>
      </form>
    </div>
  );
}