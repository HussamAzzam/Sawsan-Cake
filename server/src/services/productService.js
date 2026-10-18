import mongoose from "mongoose";
import Category from "../models/Categroy.js";
import Like from "../models/Like.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function validateCategory(categoryId, subcategory) {
    if (!mongoose.isValidObjectId(categoryId)) throw new AppError("A valid category is required", 400);
    const category = await Category.findById(categoryId);
    if (!category) throw new AppError("Category not found", 400);
    if (subcategory && !category.subcategories.includes(subcategory)) {
        throw new AppError("Subcategory does not belong to this category", 400);
    }
}

export async function listProducts(query) {
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
        const expression = new RegExp(escapeRegex(query.search.trim()), "i");
        filter.$or = [{ name: expression }, { description: expression }];
    }

    const sort = query.sort === "popular" ? { likesCount: -1 } :
        query.sort === "name" ? { name: 1 } : { createdAt: -1 };
    const [products, total] = await Promise.all([
        Product.find(filter).populate("category", "slug name").sort(sort).skip((page - 1) * limit).limit(limit),
        Product.countDocuments(filter),
    ]);
    return { products, page, pages: Math.ceil(total / limit), total };
}

export async function getProduct(id) {
    const product = await Product.findById(id).populate("category", "slug name");
    if (!product) throw new AppError("Product not found", 404);
    return product;
}

export async function createProduct(data) {
    await validateCategory(data.category, data.subcategory);
    return Product.create(data);
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