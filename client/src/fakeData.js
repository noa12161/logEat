const fakeUserData = {
  _id: 'david123123',
  username: 'david',
  foodData: [
    {
      date: '20220322',
      meals: [
        {
          foodName: 'apple',
          cal: 50,
          carb: 20,
          protein: 3,
          fat: 1,
        },
        {
          foodName: 'banana',
          cal: 150,
          carb: 40,
          protein: 2,
          fat: 2,
        },
        {
          foodName: 'carrot',
          cal: 20,
          carb: 5,
          protein: 0,
          fat: 1,
        },
      ],
    },
    {
      date: '20220422',
      meals: [
        {
          foodName: 'chicken',
          cal: 550,
          carb: 30,
          protein: 40,
          fat: 26,
        },
        {
          foodName: 'brocoli',
          cal: 20,
          carb: 4,
          protein: 2,
          fat: 1,
        },
        {
          foodName: 'rice',
          cal: 200,
          carb: 50,
          protein: 6,
          fat: 2,
        },
      ],
    },
  ],
};

export default fakeUserData;
