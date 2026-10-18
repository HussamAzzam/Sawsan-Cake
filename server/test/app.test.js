import assert from "node:assert/strict";
import { after, before, test } from "node:test";

process.env.NODE_ENV = "test";
process.env.CLIENT_URL = "http://localhost:5173";
process.env.GOOGLE_CLIENT_ID = "test-client";
process.env.GOOGLE_CLIENT_SECRET = "test-secret";
process.env.GOOGLE_CALLBACK_URL = "http://localhost:5000/api/auth/google/callback";
process.env.JWT_SECRET = "test-secret-for-api-smoke-tests-only";
process.env.CLOUDINARY_CLOUD_NAME = "test-cloud";
process.env.CLOUDINARY_API_KEY = "test-key";
process.env.CLOUDINARY_API_SECRET = "test-secret";

const { default: app } = await import("../src/app.js");
let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test("health endpoint reports the API as ready", async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
});

test("protected product likes require authentication", async () => {
    const response = await fetch(`${baseUrl}/api/products/507f1f77bcf86cd799439011/like`);
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: "Authentication required" });
});

test("unknown API paths return a JSON 404", async () => {
    const response = await fetch(`${baseUrl}/api/unknown`);
    assert.equal(response.status, 404);
    assert.match((await response.json()).message, /Route not found/);
});