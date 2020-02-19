import { GET } from "../request";

const api_key = "9ac880e4d688d1f1fb52c31a429b8d0a";

const baseUrl = "https://api.themoviedb.org/3";

/**
 * Get Porpular Movie List
 * @param {*} payload
 */
export async function getPopularMovieList(payload) {
  return GET(`${baseUrl}/movie/popular?api_key=${api_key}`, payload);
}

/**
 * Get Trending Movie List
 * based on mediaType and timeWindow
 * @param {*} payload
 */
export async function getTrendingMovieList(payload) {
  const { mediaType, timeWindow } = payload;

  return GET(
    `${baseUrl}trending/${mediaType}/${timeWindow}?api_key=${api_key}`
  );
}
