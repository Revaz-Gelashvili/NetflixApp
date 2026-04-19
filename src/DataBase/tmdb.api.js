const API_KEY = "7f911a9b92625a0b62ba46d978ca4e33";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const [page1, page2] = await Promise.all([
      fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      ),
      fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
      ),
    ]);

    const data1 = await page1.json();
    const data2 = await page2.json();

    return [...data1.results, ...data2.results];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);

    const [res1, res2] = await Promise.all([
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=1`,
      ),
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=2`,
      ),
    ]);

    const data1 = await res1.json();
    const data2 = await res2.json();

    return [...(data1.results || []), ...(data2.results || [])];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 3. Детали фильма
export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
  return await response.json();
};
