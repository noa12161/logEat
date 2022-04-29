import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__filename);
console.log(__dirname);
console.log(path.join(__dirname, "../client/build"));
// 라우터
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/food.js";
import searchRoutes from "./routes/searchFood.js";
import userRouter from "./routes/user.js";
import postsRouter from "./routes/posts/index.js";
import verifyJwt from "./middleWare/verifyJwt.js";

const app = express();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to DB"))
  .catch((e) => console.log(`err: ${e}`));

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(verifyJwt);

// app.use("/", (req, res) => {
//   res.json({ username: "유저 명" });
// });
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/searchFood", searchRoutes);
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => console.log(`running server on ${PORT}`));
