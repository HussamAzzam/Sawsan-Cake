import * as productService from "../services/productService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const list = asyncHandler(async (req, res) =>
    res.json(await productService.listProducts(req.query, req.user?.id))
);
export const get = asyncHandler(async (req, res) => res.json(await productService.getProduct(req.params.id)));
export const create = asyncHandler(async (req, res) => res.status(201).json(await productService.createProduct(req.body)));
export const update = asyncHandler(async (req, res) => res.json(await productService.updateProduct(req.params.id, req.body)));
export const remove = asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.status(204).end();
});
