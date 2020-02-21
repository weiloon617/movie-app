// utils
import { GET } from "../utils/request";

// const
import link from "../constants/links";

/**
 * Get Porpular Movie List
 * @param {*} payload
 */
export async function getPopularMovieList(payload) {
  const { page } = payload;

  return GET(
    `${link.baseUrl}/movie/popular?api_key=${link.api_key}&page=${page}`
  );
}

/**
 * Get Trending Movie List
 * based on mediaType and timeWindow
 * @param {*} payload
 */
export async function getTrendingMovieList(payload) {
  const { mediaType, timeWindow, page } = payload;

  return GET(
    `${link.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${link.api_key}&page=${page}`
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
  const { page, query } = payload;

  return GET(
    `${link.baseUrl}/search/movie?api_key=${link.api_key}&query=${query}&page=${page}`
  );
}

/**
 * Get Person Details
 * @param {*} payload
 */
export async function getPersonDetails(payload) {
  return GET(`${link.baseUrl}/person/${payload}?api_key=${link.api_key}`);
}

/**
 * Get Person Movie Credits
 * @param {*} payload
 */
export async function getPersonMovieCredits(payload) {
  return GET(
    `${link.baseUrl}/person/${payload}/movie_credits?api_key=${link.api_key}`
  );
}
