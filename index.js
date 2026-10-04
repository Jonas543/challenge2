import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [
    {
        user: "John",
        text: "Hello"
    },
    {
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
        message: user ? `Messages from user ${user}` : "GETTING messages",
        data: {
            messages: filteredMessages
        }
    });
});


// GET ONE MESSAGE
app.get("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;
    const message = messages[id];

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
    const user = req.body.user;
    const text = req.body.text;

    if (!user || !text) {
        return res.status(400).send({
            status: "fail",
            message: "User and text are required"
        });
    }

    const newMessage = {
        user: user,
        text: text
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


// PUT / UPDATE MESSAGE
app.put("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;

    if (!messages[id]) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    const user = req.body.user;
    const text = req.body.text;

    if (!user || !text) {
        return res.status(400).send({
            status: "fail",
            message: "User and text are required"
        });
    }

    messages[id] = {
        user: user,
        text: text
    };

    res.status(200).send({
        status: "success",
        message: "Message updated",
        data: {
            message: messages[id]
        }
    });
});


// DELETE MESSAGE
app.delete("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;

    if (!messages[id]) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    const deletedMessage = messages[id];

    messages.splice(id, 1);

    res.status(200).send({
        status: "success",
        message: "Message deleted",
        data: {
            message: deletedMessage
        }
    });
});


// START SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});