import axios from 'axios';

const api = axios.create({
    // baseURL: "http://192.168.1.10:3333",
    baseURL: 'http://challenge-api-com.umbler.net',
});

export default api;