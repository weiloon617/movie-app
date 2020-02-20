import axios from "axios";

// request header configuration
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Accept"] = "application/json";

/**
 * handle GET request
 * @param url
 * @param options
 * @constructor
 */
export const GET = (url, options) => fetch(url, { ...options, method: "GET" });

/**
 * handle POST request
 * @param url
 * @param options
 * @constructor
 */
export const POST = (url, options) =>
  fetch(url, { ...options, method: "POST" });

/**
 * handle PUT request
 * @param url
 * @param options
 * @constructor
 */
export const PUT = (url, options) => fetch(url, { ...options, method: "PUT" });

/**
 * handle delete request
 * @param url
 * @param options
 * @constructor
 */
export const DELETE = (url, options) =>
  fetch(url, { ...options, method: "DELETE" });

/**
 * Overall fetch method
 * @param url
 * @param options
 * @returns {Promise<{data: *, status: *} | never>}
 */
const fetch = (url, options) =>
  requestMethod(url, options)
    .then(checkApiStatus)
    .then(handleResponseData)
    .catch(handleThrowError);

/**
 * handle check request method
 * based on method, use axios to handle request
 * @param url
 * @param options
 * @returns {Promise<AxiosResponse<T>>}
 */
const requestMethod = (url, options = {}) => {
  const { method = "GET", ...option } = options;
  switch (method) {
    case "GET":
      return axios.get(url, option);
    case "POST":
      return axios.post(url, option);
    case "PUT":
      return axios.put(url, option);
    case "DELETE":
      return axios.delete(url, option);
    default:
      return axios.get(url, option);
  }
};

/**
 * Check the response status
 * @param res
 * @returns {*}
 */
const checkApiStatus = res => {
  if (res.status >= 200 && res.status < 300) return res;
  // TODO: if status is 404 then redirect to 404 page
  // TODO: if status is 500 then redirect to 500 page
};

/**
 * handle response data format
 * @param res
 * @returns {Promise<{data: *, message: *, status: *}>}
 */
const handleResponseData = res => {
  const { data } = res;
  return Promise.resolve({ ...data });
};

/**
 * handle throw error
 * @param err
 * @returns {Promise<never>}
 */
const handleThrowError = err => {
  const reason = err.response.data.message || err.response.statusText;
  return Promise.reject(reason);
};
