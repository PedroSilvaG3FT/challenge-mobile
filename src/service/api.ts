import axios from 'axios';

const api = axios.create({
    baseURL: "https://homolog-challenge-api.herokuapp.com",
    // baseURL: "http://192.168.1.11:3333",
});

export default api;