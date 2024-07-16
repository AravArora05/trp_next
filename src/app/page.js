"use client";

import useFetch from './hooks/useFetch';
import FeaturedArticle from './components/FeaturedArticle';
import SiteHeader from './components/SiteHeader';
import ArticlesSection from './components/ArticlesSection';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const { data, error, loading } = useFetch('http://localhost:8000/articles');
  const [articles, setArticles] = useState([]);
  const id = 1;

  useEffect(() => {
    if (data) {
      setArticles(data.sort((a, b) => {
        let firstDate = a.date.replace(/(\d+)(st|nd|rd|th)/, '$1');
        let secondDate = b.date.replace(/(\d+)(st|nd|rd|th)/, '$1');
        let date1 = new Date(firstDate);
        let date2 = new Date(secondDate);
        return date2 - date1;
      }).filter((article) => Number(article.id) !== Number(id)));
    }
  }, [data]);

  if (error) {
    return <div className="notWorking">{error}</div>;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <SiteHeader />
      {data && <FeaturedArticle article={data[id - 1]} />}
      <div className="latest-information">
        <h2>LATEST STORIES</h2>
        <hr className="divider" />
      </div>
      <ArticlesSection articles={articles} />
    </>
  );
};

export default HomePage;
