import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Article {
    id: string;
    title: string;
    content: string;
  }


export default function Blog(){
    const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      <Link to="/dodaj">Dodaj artykuł</Link>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/artykul/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}