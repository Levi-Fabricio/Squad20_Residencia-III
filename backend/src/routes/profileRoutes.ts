import { Router } from "express";
import controller from "../controller/profileController";
import { authorize } from "../middleware/authorization";

const router = Router();
router.get("/", authorize("perfis:ler"), controller.list);
router.get("/:id", authorize("perfis:ler"), controller.get);
router.post("/", authorize("perfis:gerenciar"), controller.create);
router.put("/:id", authorize("perfis:gerenciar"), controller.update);
router.delete("/:id", authorize("perfis:gerenciar"), controller.remove);
export default router;

