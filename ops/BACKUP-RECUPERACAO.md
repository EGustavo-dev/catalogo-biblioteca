# Backup e recuperação da biblioteca

As cópias automáticas estão ativas no Supabase todos os dias às 03h de Brasília (06h UTC), com retenção de 14 dias. A configuração foi escolhida para limitar o uso de armazenamento no plano gratuito.

Cada cópia contém livros, prateleiras, perfis, favoritos e empréstimos. O conteúdo fica no schema privado `library_backup`, sem acesso pelos leitores, pelo navegador ou pela API pública. A função de backup usa as permissões do operador do banco e verifica o checksum e a reconstrução das cinco tabelas.

As contas e senhas do Supabase Auth, arquivos de Storage, segredos e configuração de serviços precisam do procedimento próprio de backup do Supabase. As cópias automáticas internas ajudam a recuperar alterações nos dados e ficam no mesmo banco. Uma cópia externa completa continua necessária para recuperação após perda do projeto.

1. No SQL Editor do Supabase, confira o agendamento e as cópias.

```sql
select jobname,schedule,active from cron.job where jobname='library-daily-backup';
select id,created_at,reason,row_counts,verified_at
from library_backup.snapshots order by created_at desc;
select jobid,status,start_time,end_time,return_message
from cron.job_run_details
where jobid=(select jobid from cron.job where jobname='library-daily-backup')
order by start_time desc limit 10;
```

2. Para criar uma cópia antes de uma manutenção, execute o comando abaixo como operador do banco.

```sql
select library_backup.verify_snapshot(library_backup.take_snapshot('before-maintenance'));
```

3. Para recuperação dos dados operacionais, teste primeiro em uma cópia isolada do banco que tenha a estrutura atual, as contas Auth e o snapshot desejado. Defina a variável de conexão `BIBLIOTECA_DATABASE_URL` de forma privada. Execute `ops/recover-business-data.sql` com `psql` e o identificador selecionado. O script valida o snapshot e as referências às contas, cria uma cópia antes da operação, bloqueia gravações concorrentes e confere os dados antes de confirmar a transação. Perfis adicionais criados depois do snapshot são preservados. Sessões de login e senhas não são restauradas.

```powershell
psql "$env:BIBLIOTECA_DATABASE_URL" -v snapshot_id=ID_ESCOLHIDO -f ops/recover-business-data.sql
```

4. Para guardar uma cópia externa, use PostgreSQL 17 ou compatível e uma conexão privada com o banco. Guarde o arquivo em armazenamento privado, pois contém dados de pessoas. Valide o arquivo e ensaie a recuperação em um banco separado.

```powershell
pg_dump --format=custom --no-owner --no-acl --file=biblioteca.dump "$env:BIBLIOTECA_DATABASE_URL"
pg_restore --list biblioteca.dump
```

A cópia externa depende da conexão privada e de um destino controlado pela escola. Ela não foi enviada ao GitHub. O código do site é versionado no GitHub e cada publicação da Vercel identifica o commit correspondente.

Documentação oficial — [backups Supabase](https://supabase.com/docs/guides/platform/backups), [pg_dump](https://www.postgresql.org/docs/17/app-pgdump.html), [pg_restore](https://www.postgresql.org/docs/17/app-pgrestore.html).
