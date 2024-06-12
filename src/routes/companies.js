import { Router } from "express";
import Company from "../models/companies.js";

const router = Router();
router.post("/new", async (req, res) => {
  const { name, location,description } = req.body;
  try {
    const company = await Company.findOne({ title });
    if (company) {
      return res.status(400).json({ message: "company already exists" });
    }
    
    const newCompany = new Company({
      name,
      location,
      description,

    });
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const company  = await Company.find();
    return res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    return res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location,description } = req.body;
    const update = {
      name,
      location,
      description,
      
    };

    const companyUpdate = await Company.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });

    return res.status(200).json(companyUpdate);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const companyDelete = await Company.findOneAndDelete({ _id: id });

    return res.status(400).json(companyDelete);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { router };
