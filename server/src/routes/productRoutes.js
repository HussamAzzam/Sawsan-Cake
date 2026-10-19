import { Router } from "express";
import * as controller from "../controllers/productController.js";
import { requireAdmin, requireAuth, optionalAuth } from "../middleware/auth.js";
import * as likeController from "../controllers/likeController.js";

const router = Router();

router.get("/", optionalAuth, controller.list);
router.get("/liked", requireAuth, likeController.listLiked);
router.get("/:productId/like", requireAuth, likeController.status);
router.post("/:productId/like", requireAuth, likeController.toggle);
router.get("/:id", controller.get);
router.post("/", requireAuth, requireAdmin, controller.create);
router.patch("/:id", requireAuth, requireAdmin, controller.update);
router.delete("/:id", requireAuth, requireAdmin, controller.remove);

export default router;
