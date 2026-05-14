import express from "express";
import dbConnect from "./app/config/dbConnect.js";
import productApiRoute from "./app/routes/productApiRoutes.js";
import cors from "cors";

dbConnect();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", productApiRoute);

app.listen(port, () => console.log(`App is running on port: ${port}`));
