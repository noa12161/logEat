import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// 라우터
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import searchRoutes from "./routes/searchFood.js";
import userRouter from "./routes/user.js";

// 테스트 라우터
import authv2Routes from "./routes/auth2.js";
import foodv2Routes from "./routes/food2.js";

const app = express();
const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to DB"))
  .catch((e) => console.log(`err: ${e}`));

app.use(cookieParser());
app.use(cors());
app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({ username: "유저 명" });
// });
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/searchFood", searchRoutes);
app.use("/api/user", userRouter);

app.use("/api/auth2", authv2Routes); //테스트용
app.use("/api/food2", foodv2Routes); //테스트용

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(PORT, () => console.log(`running server on ${PORT}`));
