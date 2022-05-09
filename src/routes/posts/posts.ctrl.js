import Post from "../../models/Post.js";
import cloudinary from "../../middleWare/cloudinary.js";

// postId로 게시글 조회
export const getPostById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    // 포스트를 찾지 못했으면...
    if (!post) return res.status(404).sed("wrong postId");

    // 포스트를 찾았으면...
    req.post = post;
    next();
  } catch (e) {
    res.status(500);
  }
};

// 내 포스트인지 확인
export const checkMyPost = (req, res, next) => {
  const { post, user } = req;
  if (post.user._id.toString() !== user._id.toString()) {
    res.status(403).send("forbidden");
    ctx.status = 403;
    return;
  }
  next();
};

// 전체 포스트 조회
// 쿼리에 값이 들어올수있음...
// ?username=&tag=&page=
export const getAllPosts = async (req, res) => {
  const { username, tag } = req.query;
  const page = parseInt(req.query.page ? req.query.page : "1");
  const query = {
    ...(username ? { "user.username": username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    const lastPage = Math.ceil(postCount / 10);
    res.status(200).send({
      posts,
      lastPage,
    });
  } catch (e) {
    res.status(500);
  }
};

// 특정 포스트 조회
export const getPost = (req, res) => {
  res.status(200).send(req.post);
};

// 포스트 생성
/* 필요한 요소들...
  제목, 내용, 이미지?, 태그?, 유저정보(req.user 사용)
*/
export const createPost = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newPost = await Post.create({
      ...req.body,
      image: {
        imageUrl: result.secure_url,
        imageId: result.public_id,
      },
      user: {
        _id: req.user._id,
        username: req.user.username,
      },
    });
    res.status(200).send(newPost);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

// 포스트 삭제
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    await cloudinary.uploader.destroy(post.image.imageId);

    const deletedPost = await Post.findByIdAndDelete(req.params.postId);

    res.status(200).send(deletedPost);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

//포스트 수정
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    // cloudinary 삭제후 업로드 (수정)
    await cloudinary.uploader.destroy(post.image.imageId);
    const result = await cloudinary.uploader.upload(req.file.path);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        ...req.body,
        image: {
          imageUrl: result.secure_url,
          imageId: result.public_id,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedPost);
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};
