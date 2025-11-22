import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
