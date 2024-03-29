import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { changeToStringFormat } from "../functions/userFunctions.js";
import verifyJwt from "../middleWare/verifyJwt.js";

const router = Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { username, password, startWeight, targetCalorie } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(409).send("existUsername"); // Conflict
    }

    const user = new User({
      username,
      bodyWeight: [
        {
          date: changeToStringFormat(new Date()),
          weight: Number(startWeight),
        },
      ],
      currentWeight: Number(startWeight),
      targetCalories: [
        {
          date: changeToStringFormat(new Date()),
          targetCalorie: Number(targetCalorie),
        },
      ],
      currentTargetCalories: Number(targetCalorie),
    });
    await user.setPassword(password);
    await user.save(); //데이터베이스에 저장

    //비밀번호를 제외한 유저 정보
    res.json(user.hidePassword());
  } catch (e) {
    res.status(500).json(e);
  }
});
//로그인
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400); //Bad Request
  }

  try {
    const user = await User.findOne({ username });
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      res.status(401).send("noUser");
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) return res.status(401).json("wrongPassword");

    const accessToken = user.generateToken();
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 1, //1일
      httpOnly: true, // 브라우저 자바스크립트로 접근 불가
    });
    const secureUser = user.hidePassword();
    res.send(secureUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

//로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json("logout success!");
});

router.post("/check", verifyJwt, async (req, res) => {
  console.log("in Check!");
  console.log(req.user);
  if (req.user) return res.status(200).send(true);
  res.status(500).send(false);
});

export default router;
