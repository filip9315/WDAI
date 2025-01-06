import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface Article {
    id: string;
    title: string;
    content: string;
  }

export default function Artykul(){
    const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      const articles: Article[] = JSON.parse(storedArticles);
      const foundArticle = articles.find((a) => a.id === id);
      setArticle(foundArticle || null);
    }
  }, [id]);

  if (!article) {
    return <div>Artykuł nie znaleziony.</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}