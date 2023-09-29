import mongoose from "mongoose";

export default async function DBConnect(): Promise<void> {
  try {
    if (process.env.NODE_ENV === "production") {
      const conn = await mongoose.connect("mongodb://db:27017/loanertracker");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      const conn = await mongoose.connect(
        "mongodb://localhost:27017/loanertracker",
      );
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
