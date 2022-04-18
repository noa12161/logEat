import axios from "axios";

import { Router } from "express";

const router = Router();

const decodeServiceKey = decodeURIComponent(process.env.FOOD_API_SEC);
const URLENDPOINT =
  "http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1";
const pageNum = 1;

const checkGraterThanZero = (num) => {
  return num >= 0 ? num : 0;
};

// 공공 데이터포털 api 요청
router.post("/search", async (req, res) => {
  const { nameOfFood } = req.body;

  const responseFromApi = await axios(URLENDPOINT, {
    params: {
      serviceKey: decodeServiceKey,
      desc_kor: nameOfFood,
      pageNo: pageNum,
      numOfRows: 80,
      type: "json",
    },
  });
  if (responseFromApi.data.body.totalCount === 0) {
    return res.send("noData");
  }
  const foodData = responseFromApi.data.body.items.map((item) => ({
    id: item.DESC_KOR + item.ANIMAL_PLANT + item.BGN_YEAR,
    foodName: item.DESC_KOR,
    oneServCal: checkGraterThanZero(Number(item.NUTR_CONT1)),
    oneServCarb: checkGraterThanZero(Number(item.NUTR_CONT2)),
    oneServProtein: checkGraterThanZero(Number(item.NUTR_CONT3)),
    oneServFat: checkGraterThanZero(Number(item.NUTR_CONT4)),
    qtt: 1, //  용량 if unit == 1 && qtt==100 --> 1 * 100
    unit: Number(item.SERVING_WT), // 용량 단위 eg) 1g, 1serv...
    servSizeWeight: item.SERVING_WT > 0 ? Number(item.SERVING_WT) : 1,
  }));
  res.send(foodData);
});

export default router;
