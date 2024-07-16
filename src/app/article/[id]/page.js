import { notFound } from 'next/navigation';
import SiteHeader from '../../components/SiteHeader';
import ArticleHeader from '../../components/ArticleHeader';

async function getArticles() {
  const res = await fetch('http://localhost:8000/articles', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default async function Article({ params }) {
  const { id } = params;

  try {
    const data = await getArticles();
    const value = parseInt(id);

    if (isNaN(value) || value > data.length || value < 1) {
      notFound();
    }

    const article = data[value - 1];

    return (
      <>
        <SiteHeader />
        <ArticleHeader article={article} />
        <div className="article-information-container">
          {article.content.map((element, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: element }} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return <div>Error: Unable to load article</div>;
  }
}