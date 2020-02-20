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
