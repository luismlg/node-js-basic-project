import dotenv from "dotenv";
dotenv.config();
import { Server } from "./config/server";

try {
  Server.instance.start();
} catch (error) {
  console.log(error);
}
