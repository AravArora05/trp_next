// pages/author/[id]/index.js
import SiteHeader from '../../../src/app/components/SiteHeader';
import ArticlesSection from '../../../src/app/components/ArticlesSection';
import AuthorDescription from '../../../src/app/components/AuthorDescription';
import { fetchArticles, fetchAuthors } from '../../../src/app/utils/api';
import Footer from '@/app/components/Footer';
import '../../../src/app/globals.css';

export default function SelectedAuthor({ author, articles }) {
  return (
    <>
      <SiteHeader />
      <AuthorDescription author={author} />
      <ArticlesSection articles={articles} />
      <Footer/>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const value = parseInt(id);

  try {
    const authors = await fetchAuthors();
    const articles = await fetchArticles();

    if (isNaN(value) || value < 1 || value > authors.length) {
      return { notFound: true };
    }

    const selectedAuthor = authors.filter(author => Number(author.id) === value);
    const selectedArticles = articles.filter(article => Number(article.authorId) === value);

    return {
      props: {
        author: selectedAuthor,
        articles: selectedArticles,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const authors = await fetchAuthors();
    const paths = authors.map(author => ({
      params: { id: author.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
