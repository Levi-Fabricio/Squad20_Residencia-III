import type { Request, RequestHandler } from "express";
import model from "../models/profileModel";
import { profileIdSchema } from "./validations/schemas/profileSchema";

// O middleware de autenticação deve preencher req.user após validar o JWT.
type AuthenticatedRequest = Request & { user?: { id: string } };
export const authorize = (permission: string): RequestHandler => async (req, res, next) => {
  const identity = profileIdSchema.safeParse((req as AuthenticatedRequest).user?.id);
  if (!identity.success) {
    res.status(401).json({ message: "Autenticação necessária" });
    return;
  }
  try {
    const permissions = await model.permissions(identity.data);
    if (permissions === null) {
      res.status(401).json({ message: "Usuário não está ativo" });
      return;
    }
    if (!permissions.includes(permission)) {
      res.status(403).json({ message: "Permissão insuficiente" });
      return;
    }
    next();
  } catch {
    res.status(500).json({ message: "Não foi possível verificar as permissões" });
  }
};

