import React from 'react';

/*
  제목 클릭시 -> link to='/:postId'
  이름 클릭스 -> link to='/?username='
  태그 클릭시 -> link to='/?tag='
  
*/
const PostLists = ({ posts }) => {
  return (
    <div>
      {posts.map((p) => (
        <div>{p.title}</div>
      ))}
    </div>
  );
};

export default PostLists;
