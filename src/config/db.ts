import mongoose from "mongoose";

export default async function DBConnect(): Promise<void> {
  try {
    if (process.env.MONGO_USER) {
      const user = process.env.MONGO_USER
      const pass = process.env.MONGO_PASSWORD
      if (process.env.NODE_ENV === "production") {
        console.log("prod")
        const conn = await mongoose.connect(`mongodb://${user}:${pass}@mongo:27017/loanertracker`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } else {
        console.log(`mongodb://${user}:${pass}@localhost:27017/loanertracker`)
        const conn = await mongoose.connect(`mongodb://${user}:${pass}@localhost:27017/loanertracker`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      }
    }
    else {
      const conn = await mongoose.connect(`mongodb://mongo:27017/loanertracker`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
