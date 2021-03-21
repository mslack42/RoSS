import mongoose from "mongoose";

const Schema = mongoose.Schema;

let user = new Schema(
    {
        name: String,
        discordId: {
            type: String,
            unique: true
        },
        feeds: [{
            name: String,
            feedId: String,
            lastDataTime: Date
        }]
    }
)

export const userModel = mongoose.model("users", user);