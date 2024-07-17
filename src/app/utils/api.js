export async function fetchArticles() {
    try {
      const res = await fetch('http://localhost:8000/articles', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch articles');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }
  
  export async function fetchAuthors() {
    try {
      const res = await fetch('http://localhost:8000/authors', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch authors');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  }
  