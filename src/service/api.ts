import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.9:3333",
  // baseURL: 'http://challenge90-api.herokuapp.com',
});

export default api;
