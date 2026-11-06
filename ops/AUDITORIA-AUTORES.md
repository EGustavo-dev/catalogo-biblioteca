# Revisão de título e autoria — 2026-11-06

Foram examinados 1.432 registros e corrigidos 654 no Supabase. A separação preserva book_key, IDs, quantidades, prateleiras e vínculos. Backup privado validado antes da atualização (snapshot 4). Conferência posterior: zero alterações em outros campos.

66 registros sem autoria segura foram mantidos para conferência da folha de rosto/ISBN. Editoras e nomes de coleções não foram promovidos automaticamente a autores. A separação de metadados existentes não certifica a edição bibliográfica.

Capas geradas em covers/completas/*.svg passam a usar a capa verificada quando disponível, ou a capa provisória construída com os campos atuais. Imagens personalizadas continuam preservadas.

Validação: node tests/cover-title-audit.cjs — cinco casos de resolução de capas.
