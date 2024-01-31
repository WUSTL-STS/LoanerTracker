import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import { create, engine } from "express-handlebars";
import bodyParser from "body-parser";
import dayjs from "dayjs";
import path from "path";
import DBConnect from "./config/db";
import bootstrapDefaultLoaners from "./scripts/defaultLoanerCreation";
import "dotenv/config"

const app = express(); // Create the express server
mongoose.set("debug", false);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// parse application/json
app.use(bodyParser.json());

declare module 'express-session' {
  export interface SessionData {
    loggedIn: boolean;
  }
}

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET ?? "secret",
  cookie: {
    maxAge: 60000 * 60 // Valid for an hour
  },
}))

mongoose.set("strictQuery", false);
DBConnect();
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

bootstrapDefaultLoaners();

// Serve static CSS and JS files/icons
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")),
)
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/jquery/dist")),
)
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")),
)
app.use(
  "/icons",
  express.static(path.join(__dirname, "../node_modules/bootstrap-icons")),
);

// Serve static files
app.use("/static", express.static(path.join(__dirname, "/static")));

const handlebars = create({
  extname: ".hbs",
  helpers: {
    dateFormat(date: Date | undefined) {
      if (date !== undefined) {
        return dayjs(date).format("MM/DD");
      }
      return "-";
    },
    checkoutFormat(date: Date | undefined) {
      return dayjs(date ?? Date.now()).format("YYYY-MM-DD");
    },
    followUpFormat(date: Date | undefined) {
      return date != null ? dayjs(date).format("YYYY-MM-DD") : "-";
    },
  },
});
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/loaners", require("./routes/loaners"));
app.use("/records", require("./routes/records"));
app.use("/export", require("./routes/export"));

const port = 8080;
app.listen(port, () => {
  console.log(`Server hosted on port ${port} -- http://localhost:${port}`);
  if (process.env.NODE_ENV === "production") {
    console.log(`Server hosted on port ${port}`);
  }
});
