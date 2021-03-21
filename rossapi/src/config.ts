import dotenv from "dotenv";

dotenv.config();

export const gatherFrequencyMS = +process.env.GATHER_FREQUENCY_MS;
export const dbConnectionString = process.env.DB_CONNECTION_STRING;
