import "dotenv/config";
import connectDatabase from "./src/config/database.js";

const requiredEnvironment = [
	"MONGO_URI",
	"JWT_SECRET",
	"CLIENT_URL",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
	"GOOGLE_CALLBACK_URL",
	"CLOUDINARY_CLOUD_NAME",
	"CLOUDINARY_API_KEY",
	"CLOUDINARY_API_SECRET",
];
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);

if (missingEnvironment.length) {
	console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
	process.exit(1);
}

if (process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET.startsWith("replace-with-")) {
	console.error("JWT_SECRET must be replaced with a random value of at least 32 characters");
	process.exit(1);
}

const port = Number(process.env.PORT) || 5000;
let server;

try {
	const { default: app } = await import("./src/app.js");
	await connectDatabase();
	server = app.listen(port, () => console.log(`API listening on port ${port}`));
} catch (error) {
	console.error("Failed to start the API", error);
	process.exit(1);
}

async function shutdown(signal) {
	console.log(`${signal} received; shutting down`);
	server?.close(async () => {
		const mongoose = await import("mongoose");
		await mongoose.default.disconnect();
		process.exit(0);
	});
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
