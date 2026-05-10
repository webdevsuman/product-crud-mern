import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
