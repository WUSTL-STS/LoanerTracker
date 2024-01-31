import express from "express";
import Loaner from "../models/Loaner";
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('login')
  }
  try {
    const r = await Loaner.find().lean();
    res.json(r);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
