import User from "../models/User.js";

const adminEmails = () => new Set(
    (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
);

export async function upsertGoogleUser({ googleId, email, name, avatar }) {
    if (!email || !name) {
        throw new Error("Google did not provide the required account details");
    }

    const normalizedEmail = email.toLowerCase();
    const isConfiguredAdmin = adminEmails().has(normalizedEmail);
    const update = {
        $set: { email: normalizedEmail, name, avatar },
        ...(!isConfiguredAdmin ? { $setOnInsert: { role: "user" } } : {}),
    };
    if (isConfiguredAdmin) update.$set.role = "admin";

    const user = await User.findOneAndUpdate(
        { googleId },
        update,
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return user;
}