import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { router as authRoutes } from "./routes/auth.js";
import { router as companyRoutes } from "./routes/companies.js";
import { router as articlesRoutes } from "./routes/articles.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`db is connected and server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/articles", articlesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "welcome to adventure-insights API" });
});
