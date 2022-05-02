import axios from 'axios';
// 전체 포스트 조회
export const getAllPostsApi = async (queryString) => {
  console.log(queryString);
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
export const createPostApi = async (form) => {
  return await axios.post(`/api/posts`, form);
};

// 포스트 삭제
export const deletePostApi = async (id) => {
  return await axios.delete(`/api/posts/${id}`);
};

//포스트 수정
export const updatePostApi = async (form, postId) => {
  return await axios.put(`/api/posts/${postId}`, form);
};
