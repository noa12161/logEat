import React from 'react';
import PostItem from './PostItem';
import './posts.css';
/*
  제목 클릭시 -> link to='/:postId'
  이름 클릭스 -> link to='/?username='
  태그 클릭시 -> link to='/?tag='
  
*/

const PostLists = ({ posts, dispatch }) => {
  return (
    <div className="postLists_container">
      {posts.map((post, i) => (
        <PostItem post={post} key={i} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default PostLists;
