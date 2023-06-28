import dotenv from "dotenv";
dotenv.config();
import * as http from "http"; //ES 6
import dbConnect from "./config/dbConnect.js";
import { app } from "./app/app.js";

dbConnect();
const PORT = process.env.PORT || 2020;

// Create HTTP server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
