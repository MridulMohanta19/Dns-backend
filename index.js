import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import AWS from "aws-sdk";
import domainRoute from "./routes/domain.js";
const PORT = 5000;
// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let origin = process.env.CORS_ORIGIN;
app.use(cors({
    credentials: true,
    origin
}));

// aws
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
console.log("PORT" , PORT);
// routes
app.use("/domain", domainRoute);

app.get('/', function (req, res) {
    res.send(`Hello World, running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});