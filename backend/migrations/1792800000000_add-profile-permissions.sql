-- Up Migration
ALTER TABLE perfis ADD COLUMN permissoes text[] NOT NULL DEFAULT '{}';
-- Código interno preserva a identidade do perfil de sistema mesmo se o nome mudar.
ALTER TABLE perfis ADD COLUMN codigo varchar(50) UNIQUE;

INSERT INTO perfis (nome, descricao, codigo, permissoes) VALUES
('Administrador', 'Administração de perfis e atribuições de usuários', 'administrador',
 ARRAY['perfis:ler', 'perfis:gerenciar', 'usuarios:gerenciar-perfis']),
('Gestor de Frota', 'Gestão da frota', 'gestor_frota', '{}'),
('Solicitante', 'Solicitação de serviços', 'solicitante', '{}'),
('Motorista', 'Motorista da frota', 'motorista', '{}'),
('Motorista Coringa', 'Motorista que atua em diferentes frotas', 'motorista_coringa', '{}')
ON CONFLICT (nome) DO UPDATE SET codigo = EXCLUDED.codigo, permissoes = EXCLUDED.permissoes;

ALTER TABLE usuarios_perfis DROP CONSTRAINT usuarios_perfis_perfil_id_fkey;
ALTER TABLE usuarios_perfis ADD CONSTRAINT usuarios_perfis_perfil_id_fkey
 FOREIGN KEY (perfil_id) REFERENCES perfis(id) ON DELETE RESTRICT;

-- Down Migration
ALTER TABLE usuarios_perfis DROP CONSTRAINT usuarios_perfis_perfil_id_fkey;
ALTER TABLE usuarios_perfis ADD CONSTRAINT usuarios_perfis_perfil_id_fkey
 FOREIGN KEY (perfil_id) REFERENCES perfis(id) ON DELETE CASCADE;
ALTER TABLE perfis DROP COLUMN codigo;
ALTER TABLE perfis DROP COLUMN permissoes;
-- Preserva os perfis e vínculos existentes para evitar perda de dados no rollback.

