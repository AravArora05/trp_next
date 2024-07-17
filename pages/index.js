import FeaturedArticle from '../src/app/components/FeaturedArticle';
import SiteHeader from '../src/app/components/SiteHeader';
import ArticlesSection from '../src/app/components/ArticlesSection';
import Footer from '@/app/components/Footer';
import '../src/app/globals.css';





export default function HomePage({ articles, featuredArticle }) {
  return (
    <>
      <SiteHeader />
      <FeaturedArticle article={featuredArticle} />
      <div className="latest-information">
        <h2>LATEST STORIES</h2>
        <hr className="divider" />
      </div>
      <ArticlesSection articles={articles} />
      <Footer/>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:8000/articles');
    if (!res.ok) {
      console.error('Failed to fetch articles:', res.statusText);
      throw new Error('Failed to fetch articles');
    }
    let articles = await res.json();

    console.log('Fetched articles:', articles);

    articles = articles.sort((a, b) => {
      let firstDate = new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
      let secondDate = new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
      return secondDate - firstDate;
    });

    const featuredArticle = articles[0];
    articles = articles.filter((article, index) => index !== 0);

    console.log('Sorted articles:', articles);
    console.log('Featured article:', featuredArticle);

    return {
      props: {
        articles,
        featuredArticle
      },
      revalidate: 10 
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        articles: [],
        featuredArticle: null
      },
    };
  }
}
