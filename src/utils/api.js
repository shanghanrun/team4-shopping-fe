import axios from "axios";
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROXY_URL = process.env.REACT_APP_PROXY_URL+'/api';
// const REACT_APP_CLOUDTYPE_BACKEND_URL='https://port-0-team4-shopping-be-ly2ihcepd6d25f57.sel5.cloudtype.app'
console.log('proxy_url', PROXY_URL)

const api = axios.create({
  // baseURL: LOCAL_BACKEND+'/api', //로컬용
  // baseURL: PROXY_URL,
  // baseURL: 'https://port-0-team4-shopping-be-ly2ihcepd6d25f57.sel5.cloudtype.app/api', // 클라우드 타입사용시
  baseURL: process.env.REACT_APP_ORACLE_BACKEND_URL + '/api',
  headers: {
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
