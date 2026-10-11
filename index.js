import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import messagesRouter from "./routes/api/v1/messages.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB);

app.use("/api/v1/messages", messagesRouter);

// HOME
app.get("/", (req, res) => {
    res.send("Hello jonas!");
});

app.listen(port, () => {
});