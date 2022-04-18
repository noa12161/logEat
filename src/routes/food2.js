import User from "../models/User2.js";
import { Router } from "express";

const router = Router();

/* 
mealObj form...
{
		food
		foodName
		oneServCal
		oneServCarb
		oneServProtein
		oneServFat
		qtt,
		unit = 1회제공량값 or 1 
		servSizeWeight = 1회제공량
}
*/
router.get("/test", (req, res) => {
  res.send("work!");
});
//음식 등록/추가
router.post("/add", async (req, res) => {
  const { username, date, mealObj } = req.body;
  try {
    // 유저 확인
    let user = await User.findOne({ username });
    if (!user) return res.status(400).send("cant find user");
    // 날짜 확인
    const hasSameDate = user.findDate(date); //return index of same date or -1
    //중복 날짜 없으면..
    if (hasSameDate < 0) {
      user = await User.findOneAndUpdate(
        { username },
        {
          $push: { foodData: { date, meals: mealObj } },
        },
        { new: true }
      );
      return res.status(200).send(user);
    }
    //중복 날짜 있으면...
    // 중복 음식 확인
    const hasSameMeal = user.findSameMeal(mealObj.id, hasSameDate);
    // 중복 음식 없으면...
    if (!hasSameMeal) {
      // 전달받은 날짜에 해당하는 meals에 mealObj 그대로 추가(push)
      user = await User.findOneAndUpdate(
        {
          username,
          "foodData.date": date,
        },
        {
          $push: {
            "foodData.$.meals": mealObj,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).send(user);
    }
    // 중복 음식 있으면...
    // 중복 용량 단위(unit) 확인
    const hasSameUnit = user.findSameUnit(mealObj.unit, hasSameDate);
    //중복 용량 단위(unit)이 없으면... 전달받은 mealObj 그대로 추가(push)
    if (!hasSameUnit) {
      user = await User.findOneAndUpdate(
        {
          username,
          "foodData.date": date,
        },
        {
          $push: {
            "foodData.$.meals": mealObj,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).send(user);
    }
    //중복 용량 단위 있으면... 해당 객체의 용량(qtt) 만 증감
    user = await User.findOneAndUpdate(
      {
        username,
      },
      {
        $inc: {
          "foodData.$[elemX].meals.$[elemY].qtt": mealObj.qtt,
        },
      },
      {
        arrayFilters: [
          { "elemX.date": date }, // foodData[X]
          {
            "elemY.unit": mealObj.unit, //meals[Y],
            "elemY.id": mealObj.id,
          },
        ],
        new: true,
      }
    );
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// 음식 삭제
router.post("/delete", async (req, res) => {
  const { username, date, mealObj } = req.body;
  try {
    // mealObj 의 id, unit 과 동일한 id, unit을 갖은 meals안의 요소 삭제
    const deletedUserInfo = await User.findOneAndUpdate(
      {
        username,
        "foodData.date": date,
      },
      {
        $pull: {
          "foodData.$.meals": {
            id: mealObj.id,
            unit: mealObj.unit,
          },
        },
      },
      {
        new: true,
      }
    );
    res.send(deletedUserInfo);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// 음식 수정
router.post("/update", async (req, res) => {
  const { username, date, mealObj } = req.body;
  try {
    // 해당 user의 date에 해당하는 객체의 meals중 전달받은 id와 같은
    // 요소의 qtt(양) 을 수정
    const updatedUserInfo = await User.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          "foodData.$[elemX].meals.$[elemY].qtt": mealObj.qtt,
        },
      },
      {
        arrayFilters: [
          { "elemX.date": date }, // foodData[X]
          {
            "elemY.unit": mealObj.unit, //meals[Y],
            "elemY.id": mealObj.id,
          },
        ],
        new: true,
      }
    );
    res.send(updatedUserInfo);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/practice", async (req, res) => {});
export default router;
