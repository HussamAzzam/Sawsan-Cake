import * as likeService from "../services/likeService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const status = asyncHandler(async (req, res) => {
    res.json(await likeService.getLikeStatus(req.user.id, req.params.productId));
});

export const toggle = asyncHandler(async (req, res) => {
    res.json(await likeService.toggleLike(req.user.id, req.params.productId));
});

export const listLiked = asyncHandler(async (req, res) => {
    res.json(await likeService.listLikedProducts(req.user.id, req.query));
});
