import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;