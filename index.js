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

let messages = [
    {
        _id: "911",
        user: "John",
        text: "Hello"
    },
    {
        _id: "912",
        user: "Jane",
        text: "Hi"
    }
];


// HOME
app.get("/", (req, res) => {
    res.send("Hello jonas!");
});

// UPDATE MESSAGE
app.put("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;

    const message = messages.find(message => message._id === id);

    if (!message) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    message.user = "pikachu";
    message.text = "Hi! I'm an updated message";
    message.__v = 0;

    res.status(200).send({
        status: "success",
        message: "Message updated",
        data: {
            message: message
        }
    });
});


// DELETE MESSAGE
app.delete("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;

    const index = messages.findIndex(message => message._id === id);

    if (index === -1) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    messages.splice(index, 1);

    res.status(200).send({
        status: "success",
        message: "Message deleted",
        data: {
            message: {
                _id: id
            }
        }
    });
});


app.listen(port, () => {
});