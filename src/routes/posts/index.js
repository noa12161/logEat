import { Router } from "express";
import * as postCtrl from "./posts.ctrl.js";
import checkLoggedIn from "../../middleWare/checkLoggedIn.js";
const router = Router();

/*  적용된 미들웨어
  verifyJwt // 쿠키에 access-token 확인후 있을시 검증해서 유저 정보를 req.user에 담음...
*/

// 전체 포스트 조회
router.get("/", postCtrl.getAllPosts);

// 특정 포스트 조회
router.get("/:postId", postCtrl.getPostById, postCtrl.getPost);

// 포스트 생성 (로그인 필요)
router.post("/", checkLoggedIn, postCtrl.createPost);

// 포스트 삭제 (로그인 필요) + (내 포스트 확인)
router.delete(
  "/:postId",
  checkLoggedIn,
  postCtrl.getPostById,
  postCtrl.checkMyPost,
  postCtrl.deletePost
);

//포스트 수정 (로그인 필요) + (내 포스트 확인)
router.put(
  "/:postId",
  checkLoggedIn,
  postCtrl.getPostById,
  postCtrl.checkMyPost,
  postCtrl.updatePost
);

export default router;
