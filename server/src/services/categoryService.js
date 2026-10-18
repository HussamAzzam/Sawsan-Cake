import Category from "../models/Categroy.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

export async function listCategories() {
    return Category.find().sort({ name: 1 }).populate("productsCount");
}

export async function getCategory(slug) {
    const category = await Category.findOne({ slug }).populate("productsCount");
    if (!category) throw new AppError("Category not found", 404);
    return category;
}

export async function createCategory(data) {
    return Category.create(data);
}

export async function updateCategory(id, data) {
    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!category) throw new AppError("Category not found", 404);
    return category;
}

export async function deleteCategory(id) {
    const hasProducts = await Product.exists({ category: id });
    if (hasProducts) throw new AppError("Move or delete this category's products first", 409);
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new AppError("Category not found", 404);
}