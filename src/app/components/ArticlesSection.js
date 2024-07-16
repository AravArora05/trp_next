"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const ArticlesSection = ({ articles }) => {
  
  const router = useRouter();
  const [minValue, changeValue] = useState(2);

  const arr = articles.map((article, index) => (
    <article key={index} className="story" id={`story${index + 1}`}>
      <img
        src={article.imageSrc}
        alt={article.title}
        className="story-image"
        onClick={() => router.push(`/article/${article.id}`)}
      />
      <div className="story-content">
        <h3 className="story-author">
          By <span className="underline">
            <Link className="navLink1" href={`/author/${article.authorId}`}>
              {article.authorName}
            </Link>
          </span>
        </h3>
        <h4 className="story-date">
          <span className="underline">{article.date}</span>
        </h4>
        <h2 className="story-title">
          <Link className="navLink1" href={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        <h4 className="story-category">
          Filed under <span className="underline">
            <Link className="navLink1" href={`/sports/${article.sport}`}>
              {article.sport}
            </Link>
          </span>
        </h4>
      </div>
    </article>
  ));

  if (minValue >= articles.length) {
    return (
      <>
        {arr}
        <div className="noClick">
          <button className="cantClick">All Articles Loaded</button>
        </div>
      </>
    );
  }

  const addValues = () => {
    const arrayLength = articles.length;
    if (minValue >= arrayLength) {
      return;
    }

    const minLength = Math.min(minValue + 2, arrayLength);
    changeValue(minLength);
  };

  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  const slicedArticles = arr.slice(0, minValue);

  return (
    <section className="latest-stories">
      {slicedArticles}
      <button onClick={addValues} className="canClick 2">Load More Articles</button>
    </section>
  );
};

export default ArticlesSection;
