import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import CategoryHeader from '../../components/CategoryHeader';
import ArticlesSection from '../../components/ArticlesSection';

async function getArticles() {
  const res = await fetch('http://localhost:8000/articles', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default async function CurrentSport({ params }) {
  const allowedSports = ["NBA", "MLB", "Soccer", "NFL"];
  const { sport } = params;

  if (!allowedSports.includes(sport)) {
    notFound();
  }

  try {
    const articles = await getArticles();
    const filteredArticles = articles.filter(article => article.sport === sport);

    return (
      <>
        <SiteHeader />
        <CategoryHeader name={sport} />
        <ArticlesSection articles={filteredArticles} />
      </>
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return <div>Error: Unable to load articles</div>;
  }
}