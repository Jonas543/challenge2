import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
    res.send("Hello World!");
});


// GET ALL MESSAGES + FILTER BY USER
app.get("/api/v1/messages", (req, res) => {
    const user = req.query.user;

    let filteredMessages = messages;

    if (user) {
        filteredMessages = messages.filter(
            message => message.user.toLowerCase() === user.toLowerCase()
        );
    }

    res.status(200).send({
        status: "success",
        message: user
            ? `Messages from user ${user}`
            : "GETTING messages",
        data: {
            messages: filteredMessages
        }
    });
});


// GET ONE MESSAGE
app.get("/api/v1/messages/:id", (req, res) => {
    const id = Number(req.params.id);

    const message = messages.find(message => message.id === id);

    if (!message) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    res.status(200).send({
        status: "success",
        message: `GETTING message ${id}`,
        data: {
            message: message
        }
    });
});


// POST NEW MESSAGE
app.post("/api/v1/messages", (req, res) => {
    const message = req.body.message;

    if (!message || !message.user || !message.text) {
        return res.status(400).send({
            status: "fail",
            message: "User and text are required"
        });
    }

    const newMessage = {
        user: message.user,
        text: message.text,
        _id: Date.now().toString()
    };

    messages.push(newMessage);

    res.status(200).send({
        status: "success",
        message: "Message saved",
        data: {
            message: newMessage
        }
    });
});

// UPDATE MESSAGE
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
    const id = Number(req.params.id);

    const index = messages.findIndex(message => message.id === id);

    if (index === -1) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    const deletedMessage = messages[index];

    messages.splice(index, 1);

    res.status(200).send({
        status: "success",
        message: "Message deleted",
        data: {
            message: deletedMessage
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});