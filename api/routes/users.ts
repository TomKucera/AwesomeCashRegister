import express from "express";

const router = express.Router();

// GET home page.
router.get("/", (req, res, next) => {
  res.render("respond with a resource");
});

export default router;