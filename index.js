import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let messages = [
    {
        user: "John",
        message: "Hello"
    },
    {
        user: "Jane",
        message: "Hi"
    }
];

// Bestaande route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// NIEUWE GET ROUTE HIER
app.get("/api/v1/messages", (req, res) => {
    const user = req.query.user;

    let filteredMessages = messages;

    if (user) {
        filteredMessages = messages.filter(message => message.user === user);
    }

    const result = {
        status: "success",
        data: {
            messages: filteredMessages
        }
    };

    res.status(200).send(result);
});

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
        data: {
            message: message
        }
    });
});

app.post("/api/v1/messages", (req, res) => {
    const user = req.body.user;
    const message = req.body.message;

    if (!user || !message) {
        return res.status(400).send({
            status: "fail",
            data: {
                message: "User and message are required"
            }
        });
    }

    const newMessage = {
        user: user,
        message: message
    };

    messages.push(newMessage);

    const result = {
        status: "success",
        data: {
            message: newMessage
        }
    };

    res.status(200).send(result);
});

app.put("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body.user;
    const message = req.body.message;

    if (!messages[id]) {
        return res.status(404).send({
            status: "error",
            message: "Message not found"
        });
    }

    if (!user || !message) {
        return res.status(400).send({
            status: "fail",
            data: {
                message: "User and message are required"
            }
        });
    }

    messages[id] = {
        user: user,
        message: message
    };

    res.status(200).send({
        status: "success",
        data: {
            message: messages[id]
        }
    });
});

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
        data: {
            message: deletedMessage
        }
    });
});

// app.listen altijd onderaan
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});