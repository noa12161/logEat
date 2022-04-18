import { Router } from "express";
import User from "../models/User.js";
import { changeToStringFormat } from "../functions/userFunctions.js";
const router = Router();

// 몸무게 추가
router.post("/bodyweight", async (req, res) => {
  const { username, date, weight } = req.body;
  const userExist = await User.find({ username });
  if (!userExist) return res.status(409).send(`no user as ${username}`);

  // username 한테 bodyWeight 필드에 객체 추가
  try {
    const user = await User.findOneAndUpdate(
      { username },
      {
        $push: {
          bodyWeight: { date, weight },
        },
      },
      { new: true }
    );

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//현재 몸무게 변경
router.post("/currentbodyweight", async (req, res) => {
  const { username, weight, date } = req.body;
  console.log(username, weight);
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(409).send("no user");

    // 전달받은 날짜가 몸무게 배열에 있나 확인 && 전달받은 날짜가 오늘인지 확인
    const hasSameDate = user.findBodyWeightDate(date);
    const isToday = date === changeToStringFormat(new Date());
    console.log(hasSameDate, isToday);

    // 몸무게 배열에 같은날짜가 없으면.
    if (!hasSameDate) {
      console.log("!hasSameDate");
      //오늘이면... 몸무게배열에 push && 현재몸무게 set
      if (isToday) {
        console.log("isToday");
        user = await User.findOneAndUpdate(
          { username },
          {
            $push: { bodyWeight: { date, weight } },
            $set: { currentWeight: weight },
          },
          { new: true }
        );
        return res.status(200).send(user);
      }
      //오늘이 아니면... 몸무게 배열에만 push...
      console.log("!isToday");
      user = await User.findOneAndUpdate(
        { username },
        {
          $push: { bodyWeight: { date, weight } },
        },
        { new: true }
      );
      return res.status(200).send(user);
    }

    //몸무게 배열에 같은날짜가 있으면
    console.log("hasSameDate");
    //오늘이면... 전달받은 날짜와 같은 객체의 값을 set... && 현재몸무게 set...
    if (isToday) {
      console.log("isToday");
      user = await User.findOneAndUpdate(
        { username },
        {
          $set: { "bodyWeight.$[elemX].weight": weight, currentWeight: weight },
        },
        {
          arrayFilters: [{ "elemX.date": date }],
          new: true,
        }
      );
      return res.status(200).send(user);
    }
    //오늘이 아니면... 전달받은 날짜와 같은 객체의 값을 set...
    console.log("!isToday");
    user = await User.findOneAndUpdate(
      { username, "bodyWeight.date": date },
      {
        $set: { "bodyWeight.$": { date, weight } },
      },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// 목표 칼로리 변경
router.post("/currenttargetcalories", async (req, res) => {
  const { username, calories } = req.body;

  try {
    let user = await User.find({ username });
    if (!user) return res.status(409).send("no user");

    user = await User.findOneAndUpdate(
      { username },
      {
        $set: { currentTargetCalories: calories },
      },
      { new: true }
    );

    return res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// 목표 영양성분 비율 변경.
router.post("/targetratio", async (req, res) => {
  const { username, ratio } = req.body;

  try {
    let user = await User.find({ username });
    if (!user) return res.status(409).send("no user");

    user = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          targetRatio: {
            carb: ratio.carb,
            protein: ratio.protein,
            fat: ratio.fat,
          },
        },
      },
      { new: true }
    );

    return res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
