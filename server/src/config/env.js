import dotenv from "dotenv";
import dns from "dns";

if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
dotenv.config();