import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mealSchema = new mongoose.Schema({
  id: String,
  foodName: String,
  cal: Number,
  carb: Number,
  protein: Number,
  fat: Number,
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
  },
  foodData: [
    {
      date: String,
      meals: [
        {
          id: String,
          foodName: String,
          oneServCal: Number,
          oneServCarb: Number,
          oneServProtein: Number,
          oneServFat: Number,
          qtt: Number,
          unit: Number,
          servSizeWeight: Number,
        },
      ],
    },
  ],
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    process.env.JWT_SEC, // 두번째 파라미터에는 JWT 암호를 넣습니다.
    {
      expiresIn: "1d", // 7일 동안 유요함.
    }
  );
  return token;
};

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; //true or false
};

UserSchema.methods.hidePassword = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.findDate = function (date) {
  const hasSameDate = this.foodData.findIndex((d) => d.date === date);
  return hasSameDate;
};
UserSchema.methods.findSameMeal = function (foodId, index) {
  console.log("in");
  console.log(foodId, index);
  console.log(this.foodData[index]);
  if (this.foodData[index].meals.length < 1) return false;
  const hasSameMeal = this.foodData[index].meals.find((m) => m.id === foodId);
  return hasSameMeal;
};
UserSchema.methods.findSameUnit = function (foodUnit, index) {
  const hasSameUnit = this.foodData[index].meals.find(
    (m) => m.unit === foodUnit
  );
  return hasSameUnit;
};

const User = mongoose.model("users2", UserSchema);

export default User;
