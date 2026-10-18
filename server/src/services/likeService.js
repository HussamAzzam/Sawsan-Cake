import Like from "../models/Like.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

export async function getLikeStatus(userId, productId) {
    if (!await Product.exists({ _id: productId })) throw new AppError("Product not found", 404);
    return { liked: Boolean(await Like.exists({ user: userId, product: productId })) };
}

export async function toggleLike(userId, productId) {
    if (!await Product.exists({ _id: productId })) throw new AppError("Product not found", 404);

    const removed = await Like.findOneAndDelete({ user: userId, product: productId });
    if (removed) {
        await Product.updateOne({ _id: productId }, { $inc: { likesCount: -1 } });
        return { liked: false };
    }

    try {
        await Like.create({ user: userId, product: productId });
        await Product.updateOne({ _id: productId }, { $inc: { likesCount: 1 } });
        return { liked: true };
    } catch (error) {
        if (error.code === 11000) return { liked: true };
        throw error;
    }
}