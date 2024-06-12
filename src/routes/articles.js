import { Router } from "express";
import Article from "../models/articles.js";

const router = Router();
router.post("/new", async (req, res) => {
  const { title, location,description, placestovisit, hotels,uid } = req.body;
  try {
    const article = await Article.findOne({ title });
    if (article) {
      return res.status(400).json({ message: "Article already exists" });
    }
    console.log(placestovisit)
    const newArticle = new Article({
      title,
      location,
      description,
      placestovisit,
      hotels,
      uid,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const articles  = await Article.find();
    return res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article  = await Article.findById(id);

    return res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location,description, placestovisit, hotels,uid } = req.body;
    const update = {
      title,
      location,
      description,
      placestovisit,
      hotels,
      uid,
    };

    const articleUpdate = await Article.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });

    return res.status(200).json(articleUpdate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const articleDelete = await Article.findOneAndDelete({ _id: id });

    return res.status(400).json(articleDelete);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { router };
