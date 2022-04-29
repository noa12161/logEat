import axios from 'axios';
// 전체 포스트 조회
export const getAllPosts = async () => {
  return await axios.get('/api/posts');
};

// 특정 포스트 조회
export const getPost = async (id) => {
  return await axios.get(`/api/posts/${id}`);
};

// 포스트 생성
export const createPost = async () => {
  return await axios.post(`/api/posts`);
};

// 포스트 삭제
export const deletePost = async (id) => {
  return await axios.delete(`/api/posts/${id}`);
};

//포스트 수정
export const updatePost = async (id) => {
  return await axios.put(`/api/posts/${id}`);
};
