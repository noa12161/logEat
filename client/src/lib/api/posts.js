import axios from 'axios';
// 전체 포스트 조회
export const getAllPostsApi = async (queryString) => {
  const url = queryString ? `/api/posts?${queryString}` : `/api/posts`;
  return await axios.get(url);
};

// 특정 포스트 조회
export const getPostApi = async (postId) => {
  return await axios.get(`/api/posts/${postId}`);
};
/*{
  title
  message
  image
  tags
} */
// 포스트 생성
export const createPostApi = async (formData) => {
  return await axios.post(`/api/posts`, formData);
};

// 포스트 삭제
export const deletePostApi = async (postId) => {
  return await axios.delete(`/api/posts/${postId}`);
};

//포스트 수정
export const updatePostApi = async (formData, postId) => {
  return await axios.put(`/api/posts/${postId}`, formData);
};
