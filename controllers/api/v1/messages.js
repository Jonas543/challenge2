import Message from "../../../models/api/v1/Message.js";

export const list = async (req, res) => {
    try {
        const user = req.query.user;

        let messages;

        if (user) {
            messages = await Message.find({ user: user });
        } else {
            messages = await Message.find({});
        }

        const result = {
            status: "success",
            message: user
                ? `Messages from user ${user}`
                : "GETTING messages",
            data: {
                messages: messages
            }
        };

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

export const create = async (req, res) => {
    try {
        const messageData = req.body.message;

        const message = new Message();
        message.user = messageData.user;
        message.text = messageData.text;

        await message.save();

        const result = {
            status: "success",
            message: "Message saved",
            data: {
                message: message
            }
        };

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

export const get = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: `GETTING message ${req.params.id}`,
            data: {
                message: message
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

export const update = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found"
            });
        }

        message.text = req.body.message.text;

        await message.save();

        res.status(200).json({
            status: "success",
            message: "Message updated",
            data: {
                message: message
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

export const remove = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Message deleted",
            data: {
                message: {
                    _id: message._id
                }
            }
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};