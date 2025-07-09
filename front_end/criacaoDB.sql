CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- CRIAÇÃO DA TABELA LOGIN
CREATE TABLE IF NOT EXISTS public.login (
  id UUID PRIMARY KEY DEFAULT id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senha TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL UNIQUE
);


-- CRIAÇÃO DA TABELA TAREFAS
CREATE TABLE IF NOT EXISTS public.tarefas (
  id UUID PRIMARY KEY DEFAULT id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL,
  tarefa TEXT NOT NULL,
  CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES public.login(id) ON DELETE CASCADE
);

-- SELECT * FROM login
-- SELECT * FROM tarefas

-- INSERIR 2 USUÁRIOS
INSERT INTO login (senha, nome, email)
VALUES
  ('0000', 'Daniel', 'dvs.veiga78@gmail.com'),
  ('0001', 'Tais', 'tr.abreuveiga@gmail.com');

-- INSERIR 2 TAREFAS
INSERT INTO tarefas (usuario_id, tarefa)
VALUES
  ('ff89f669-3a92-405f-aed8-49bca4e951f2', 'Regar todas as plantas da estufa A'),
  ('ff89f669-3a92-405f-aed8-49bca4e951f2', 'Correr'),
  ('4195dbcb-7741-4cb2-81a0-0f00dc775b78', 'Verificar nível de adubo nos viveiros');
