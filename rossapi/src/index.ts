import express from "express";
import { dbEventEmitter } from "./data/datastore";
import { initialise as initialiseFeeder } from "./feeder/feeder";
import { gatherFrequencyMS } from "./config";

var app = express();

dbEventEmitter.on("dbConnect", () => {
    initialiseFeeder(gatherFrequencyMS);
})