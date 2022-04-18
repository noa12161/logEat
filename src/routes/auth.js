import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { changeToStringFormat } from "../functions/userFunctions.js";

const router = Router();

// 회원가입
router.post("/register", async (req, res) => {
  console.log("in");
  const { username, password, startWeight, targetCalorie } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(409); //Conflict
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

    // const token = user.generateToken();
    // res.cookie("access_token", token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 1, //1일
    //   httpOnly: true,
    // });
  } catch (e) {
    res.status(500).json(e);
  }
});
//로그인
router.post("/login", async (req, res) => {
  console.log("in!");
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401); //Unauthorized
  }

  try {
    const user = await User.findOne({ username });
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      return res.status(401);
    }
    const valid = await user.checkPassword(password);
    if (!valid) return res.status(401).json("error");

    const accessToken = user.generateToken();
    res.cookie("access_token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 1, //1일
      httpOnly: true,
    });
    const secureUser = user.hidePassword();
    res.send({ ...secureUser, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});

//로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.status(204).json("logout success!");
});

const verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

router.post("/check", async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        return res.send(user);
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
