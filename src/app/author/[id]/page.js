import SiteHeader from '../../components/SiteHeader';
import ArticlesSection from '../../components/ArticlesSection';
import AuthorDescription from '../../components/AuthorDescription';
import { notFound } from 'next/navigation'; 

async function getAuthor() {
  const res = await fetch('http://localhost:8000/authors', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch authors');
  }
  return res.json();
}

async function getArticles() {
  const res = await fetch('http://localhost:8000/articles', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default async function SelectedAuthor({ params }) {
  const { id } = params;
  try {
    const authorData = await getAuthor();
    const articleData = await getArticles();
    const value = parseInt(id);
    
    if (isNaN(value) || value > authorData.length || value < 1) {
      notFound();
    }

    const selectedAuthor = authorData.filter(author => Number(author.id) === Number(value));
    const selectedArticles = articleData.filter(article => Number(article.authorId) === Number(value));

    return (
      <>
        <SiteHeader />
        <AuthorDescription author={selectedAuthor} />
        <ArticlesSection articles={selectedArticles} />
      </>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error: Unable to load data</div>;
  }
}
