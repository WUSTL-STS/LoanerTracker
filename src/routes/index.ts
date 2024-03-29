import express from "express";

import Record from "../models/Record";
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('login')
  }
  try {
    const records = await Record.find({ isOpen: "true" })
      .sort({ nextContactDate: "ascending" })
      .lean();
    res.render("index", {
      records,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
