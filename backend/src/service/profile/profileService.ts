import model, { ProfileError } from "../../models/profileModel";
import { profileSchema, profileIdSchema, assignmentSchema } from "../../middleware/validations/schemas/profileSchema";

const success = (message: unknown, status = 200) => ({ message, status });
const execute = async (operation: () => Promise<{ message: unknown; status: number }>) => {
  try { return await operation(); }
  catch (cause) {
    if (cause instanceof ProfileError) return { message: cause.message, status: cause.status };
    const error = cause as { code?: string };
    if (error.code === "23505") return { message: "Nome de perfil já cadastrado", status: 409 };
    if (error.code === "23503") return { message: "Perfil ou usuário possui vínculos que impedem a operação", status: 409 };
    throw cause;
  }
};
const checkId = (id: string) => {
  if (!profileIdSchema.safeParse(id).success) throw new ProfileError(400, "ID inválido");
};
const list = () => execute(async () => success(await model.list()));
const get = (id: string) => execute(async () => {
  checkId(id);
  const profile = await model.get(id);
  if (!profile) throw new ProfileError(404, "Perfil não encontrado");
  return success(profile);
});
const save = (body: unknown, id?: string) => execute(async () => {
  if (id !== undefined) checkId(id);
  const result = profileSchema.safeParse(body);
  if (!result.success) throw new ProfileError(400, result.error.issues.map(issue => issue.message).join("; "));
  return success(id === undefined ? await model.create(result.data) : await model.update(id, result.data), id === undefined ? 201 : 200);
});
const remove = (id: string) => execute(async () => {
  checkId(id);
  await model.remove(id);
  return success("Perfil excluído com sucesso");
});
const assign = (userId: string, body: unknown, removing = false) => execute(async () => {
  checkId(userId);
  const result = assignmentSchema.safeParse(body);
  if (!result.success) throw new ProfileError(400, "Informe um perfil_id UUID válido");
  await model.assign(userId, result.data.perfil_id, removing);
  return success(removing ? "Perfil removido do usuário" : "Perfil atribuído ao usuário");
});
export default { list, get, save, remove, assign };

