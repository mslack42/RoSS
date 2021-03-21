import mongoose from "mongoose";

const Schema = mongoose.Schema;

let rssFeed = new Schema(
    {
        url: {
            type: String,
            unique: true
        },
        lastPollTime: Date,
        pollFrequencyMS: Number,
        items: [{
            title: String,
            description: String,
            link: String,
            pubDate: Date,
            creator: String
        }]
    }
);

export const rssFeedModel = mongoose.model("rssFeeds", rssFeed);