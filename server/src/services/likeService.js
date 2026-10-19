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

export async function listLikedProducts(userId, query) {
    const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 12, 1), 50);

    const [likes, total] = await Promise.all([
        Like.find({ user: userId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({ path: "product", populate: { path: "category", select: "slug name" } }),
        Like.countDocuments({ user: userId }),
    ]);

    const products = likes.map((like) => like.product).filter(Boolean);
    return { products, page, pages: Math.ceil(total / limit), total };
}
