import dotenv from "dotenv";
dotenv.config();
import { Server } from "./config/server";

try {
  const server = Server.instance;

  server.start();
} catch (error) {
  console.log(error);
}
