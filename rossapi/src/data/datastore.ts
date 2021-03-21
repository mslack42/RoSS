import mongoose from "mongoose";
import events from "events";
import { dbConnectionString } from "../config";

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}

mongoose.connect(dbConnectionString, mongooseConfig);
export const db = mongoose.connection;

export const dbEventEmitter = new events.EventEmitter();

db.once("open", function() {
    console.log("Database connection established");
    dbEventEmitter.emit("dbConnect");
})

