import { z } from "zod";

export const profileIdSchema = z.string().uuid("ID inválido");
export const profileSchema = z.object({
  nome: z.string().trim().min(3).max(50),
  descricao: z.string().trim().max(255).nullable().optional(),
  permissoes: z.array(z.string().regex(/^[a-z][a-z0-9_-]*:[a-z][a-z0-9_-]*$/, "Permissão deve usar recurso:acao"))
    .max(100).refine(values => new Set(values).size === values.length, "Permissões duplicadas"),
}).strict();
export const assignmentSchema = z.object({ perfil_id: profileIdSchema }).strict();
export type ProfileInput = z.infer<typeof profileSchema>;
export const ADMIN_PERMISSIONS = ["perfis:ler", "perfis:gerenciar", "usuarios:gerenciar-perfis"];

