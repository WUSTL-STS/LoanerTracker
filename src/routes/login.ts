import express from "express";
const router = express.Router();

router.get("/", async (_, res) => {
  res.render("login");
});

module.exports = router;
