import { Router } from "express";
import * as controller from "../controllers/categoryController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", controller.list);
router.get("/:slug", controller.get);
router.post("/", requireAuth, requireAdmin, controller.create);
router.patch("/:id", requireAuth, requireAdmin, controller.update);
router.delete("/:id", requireAuth, requireAdmin, controller.remove);

export default router;