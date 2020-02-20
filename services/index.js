import { GET } from "../request";

import link from "../constants/links";

/**
 * Get Porpular Movie List
 * @param {*} payload
 */
export async function getPopularMovieList(payload) {
  return GET(`${link.baseUrl}/movie/popular?api_key=${link.api_key}`, payload);
}

/**
 * Get Trending Movie List
 * based on mediaType and timeWindow
 * @param {*} payload
 */
export async function getTrendingMovieList(payload) {
  const { mediaType, timeWindow } = payload;

  return GET(
    `${link.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${link.api_key}`
  );
}

/**
 * Get Movie Details
 * @param {*} payload
 */
export async function getMovieDetails(payload) {
  return GET(`${link.baseUrl}/movie/${payload}?api_key=${link.api_key}`);
}

/**
 * Get Movie Credits
 * @param {*} payload
 */
export async function getMovieCredits(payload) {
  return GET(
    `${link.baseUrl}/movie/${payload}/credits?api_key=${link.api_key}`
  );
}

/**
 * Search Movies
 * @param {*} payload
 */
export async function searchMovies(payload) {
  return GET(`${link.baseUrl}/search/movie?api_key=${api_key}`);
}
