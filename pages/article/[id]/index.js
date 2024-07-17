import SiteHeader from '../../../src/app/components/SiteHeader';
import ArticleHeader from '../../../src/app/components/ArticleHeader';
import { fetchArticles } from '../../../src/app/utils/api';
import '../../../src/app/globals.css';
import Footer from '@/app/components/Footer';

export default function Article({ article }) {
  return (
    <>
      <SiteHeader />
      <ArticleHeader article={article} />
      <div className="article-information-container">
        {article.content.map((element, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: element }} />
        ))}
      </div>
      <Footer/>
    </>
  );
}

export async function getStaticProps({ params }) {
  const articles = await fetchArticles();
  const article = articles.find(article => article.id === params.id);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
  };
}

export async function getStaticPaths() {
  const articles = await fetchArticles();
  const paths = articles.map(article => ({
    params: { id: article.id.toString() },
  }));

  return { paths, fallback: false }; 
}
