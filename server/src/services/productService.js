import mongoose from "mongoose";
import Category from "../models/Categroy.js";
import Like from "../models/Like.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Matches أ/إ/آ/ا as one letter and ة/ه as one letter, and ignores diacritics in the query
function searchPattern(value) {
    return escapeRegex(value.replace(/[\u064B-\u065F]/g, ""))
        .replace(/[إأآا]/g, "[إأآا]")
        .replace(/[ةه]/g, "[ةه]");
}

const PRICE_SORTS = { price_asc: 1, price_desc: -1 };

async function addLikeStatus(products, userId) {
    const plain = products.map((p) => (typeof p.toObject === "function" ? p.toObject() : p));

    let likedIds = new Set();
    if (userId && plain.length > 0) {
        const likes = await Like.find({
            user: userId,
            product: { $in: plain.map((p) => p._id) },
        }).select("product");
        likedIds = new Set(likes.map((like) => String(like.product)));
    }

    return plain.map((p) => ({ ...p, isLiked: likedIds.has(String(p._id)) }));
}

export async function listProducts(query, userId) {
    const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 24, 1), 100);
    const filter = {};

    if (query.category) {
        const category = await Category.findOne({ slug: query.category });
        if (!category) return { products: [], page, pages: 0, total: 0 };
        filter.category = category._id;
    }
    if (query.subcategory) filter.subcategory = query.subcategory;
    if (query.search?.trim()) {
        const expression = new RegExp(searchPattern(query.search.trim()), "i");
        filter.$or = [{ name: expression }, { description: expression }];
    }

    const skip = (page - 1) * limit;
    const priceDirection = PRICE_SORTS[query.sort];

    const fetchPage = async () => {
        if (priceDirection) {
            // priceOptions is an array, so compute the cheapest option and sort on it.
            // _id is a tie-breaker so pages never repeat or skip products.
            const rows = await Product.aggregate([
                { $match: filter },
                { $addFields: { minPrice: { $min: "$priceOptions.value" } } },
                { $sort: { minPrice: priceDirection, _id: 1 } },
                { $skip: skip },
                { $limit: limit },
            ]);
            return Product.populate(rows, { path: "category", select: "slug name" });
        }

        const sort = query.sort === "popular" ? { likesCount: -1, _id: 1 } :
            query.sort === "name" ? { name: 1, _id: 1 } : { createdAt: -1, _id: 1 };

        return Product.find(filter)
            .populate("category", "slug name")
            .sort(sort)
            .skip(skip)
            .limit(limit);
    };

    const [rows, total] = await Promise.all([fetchPage(), Product.countDocuments(filter)]);
    const products = await addLikeStatus(rows, userId);

    return { products, page, pages: Math.ceil(total / limit), total };
}

async function validateCategory(categoryId, subcategory) {
    if (!mongoose.isValidObjectId(categoryId)) throw new AppError("A valid category is required", 400);
    const category = await Category.findById(categoryId);
    if (!category) throw new AppError("Category not found", 400);
    if (subcategory && !category.subcategories.includes(subcategory)) {
        throw new AppError("Subcategory does not belong to this category", 400);
    }
}

export async function updateProduct(id, data) {
    const existing = await Product.findById(id);
    if (!existing) throw new AppError("Product not found", 404);
    const categoryId = data.category ?? existing.category;
    const subcategory = data.subcategory ?? existing.subcategory;
    await validateCategory(categoryId, subcategory);
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .populate("category", "slug name");
    return product;
}

export async function deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new AppError("Product not found", 404);
    await Like.deleteMany({ product: id });
}
