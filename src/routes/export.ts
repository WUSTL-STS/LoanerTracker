import express from "express";
import Record from "../models/Record";
import { Parser } from "@json2csv/plainjs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const fields = [
      "name",
      "email",
      "phone",
      "studentID",
      "ticketINC",
      "loanerID",
      "openDate",
      "closeDate",
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    if (req.body.startDate === "" && req.body.endDate === "") {
      const r = await Record.find().sort({ closeDate: "descending" }).lean();
      const csv = parser.parse(r);
      res.header("Content-Type", "text/csv");
      res.attachment("records.csv");
      return res.send(csv);
    }

    const r = await Record.find({
      openDate: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
    })
      .sort({ closeDate: "descending" })
      .lean();
    const csv = parser.parse(r);
    res.header("Content-Type", "text/csv");
    res.attachment("records.csv");
    return res.send(csv);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
