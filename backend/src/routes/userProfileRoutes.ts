import { Router } from "express";
import controller from "../controller/profileController";
import { authorize } from "../middleware/authorization";

const router = Router();
router.post("/:id/perfis", authorize("usuarios:gerenciar-perfis"), controller.assign);
router.delete("/:id/perfis", authorize("usuarios:gerenciar-perfis"), controller.unassign);
export default router;

