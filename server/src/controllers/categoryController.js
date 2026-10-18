import * as categoryService from "../services/categoryService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const list = asyncHandler(async (req, res) => res.json(await categoryService.listCategories()));
export const get = asyncHandler(async (req, res) => res.json(await categoryService.getCategory(req.params.slug)));
export const create = asyncHandler(async (req, res) => res.status(201).json(await categoryService.createCategory(req.body)));
export const update = asyncHandler(async (req, res) => res.json(await categoryService.updateCategory(req.params.id, req.body)));
export const remove = asyncHandler(async (req, res) => {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).end();
});