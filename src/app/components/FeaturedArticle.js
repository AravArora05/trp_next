"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FeaturedArticle = ({ article }) => {
  const router = useRouter();

  return (
    <div className="featured-article">
      <img 
        src={article.imageSrc} 
        alt={article.title} 
        onClick={() => router.push(`/article/${article.id}`)} 
        className="featured-article-image" 
      />
      <h3 className="featured-article-category">
        <Link className="navLink1" href={`/sports/${article.sport}`}>
          {article.sport}
        </Link>
      </h3>
      <div className="featured-article-content">
        <h1 className="featured-article-title">
          <Link className="navLink1" href={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h1>
        <h4 className="featured-article-author">
          <Link className="navLink1" href={`/author/${article.authorId}`}>
            {article.authorName}
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default FeaturedArticle;
