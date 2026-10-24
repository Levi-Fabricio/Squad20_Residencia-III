import type { Request, Response } from "express";
import service from "../service/profile/profileService";

const idFrom = (req: Request) => {
  const id = req.params.id;
  return (Array.isArray(id) ? id[0] : id)?.trim() ?? "";
};
const handle = (operation: (req: Request) => Promise<{ message: unknown; status: number }>) =>
  async (req: Request, res: Response) => {
    try {
      const { message, status } = await operation(req);
      res.status(status).json({ message });
    } catch {
      res.status(500).json({ message: "Não foi possível concluir a operação de perfis" });
    }
  };
export default {
  list: handle(() => service.list()),
  get: handle(req => service.get(idFrom(req))),
  create: handle(req => service.save(req.body)),
  update: handle(req => service.save(req.body, idFrom(req))),
  remove: handle(req => service.remove(idFrom(req))),
  assign: handle(req => service.assign(idFrom(req), req.body)),
  unassign: handle(req => service.assign(idFrom(req), req.body, true)),
};

