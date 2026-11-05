\set ON_ERROR_STOP on
-- Uso: psql "$BIBLIOTECA_DATABASE_URL" -v snapshot_id=ID -f ops/recover-business-data.sql
-- Execute primeiro em uma cópia isolada do banco, com as mesmas tabelas e contas Auth.
begin;
select set_config('library_backup.restore_id', :'snapshot_id', true);
select pg_advisory_xact_lock(682451921);
lock table public.books, public.shelves, public.loans, public.favorites, public.profiles in access exclusive mode;
select library_backup.verify_snapshot(current_setting('library_backup.restore_id')::bigint);
select library_backup.take_snapshot('before-manual-recovery');
do $restore$
declare data jsonb; restored jsonb;
begin
  select payload into strict data from library_backup.snapshots
    where id=current_setting('library_backup.restore_id')::bigint;
  if exists (
    select 1 from jsonb_populate_recordset(null::public.profiles,data->'profiles') p
    where not exists(select 1 from auth.users a where a.id=p.id)
  ) then raise exception 'Há contas Auth ausentes. Recupere as contas pelo procedimento do Supabase antes de continuar.'; end if;
  insert into public.profiles
    select * from jsonb_populate_recordset(null::public.profiles,data->'profiles') where true
    on conflict(id) do update set email=excluded.email,name=excluded.name,role=excluded.role;
  delete from public.favorites;
  delete from public.loans;
  delete from public.books;
  delete from public.shelves;
  insert into public.shelves select * from jsonb_populate_recordset(null::public.shelves,data->'shelves');
  insert into public.books select * from jsonb_populate_recordset(null::public.books,data->'books');
  insert into public.loans select * from jsonb_populate_recordset(null::public.loans,data->'loans');
  insert into public.favorites select * from jsonb_populate_recordset(null::public.favorites,data->'favorites');
  select jsonb_build_object(
    'books',(select coalesce(jsonb_agg(to_jsonb(b) order by b.id),'[]'::jsonb) from public.books b),
    'shelves',(select coalesce(jsonb_agg(to_jsonb(s) order by s.prateleira),'[]'::jsonb) from public.shelves s),
    'loans',(select coalesce(jsonb_agg(to_jsonb(l) order by l.id),'[]'::jsonb) from public.loans l),
    'favorites',(select coalesce(jsonb_agg(to_jsonb(f) order by f.user_id,f.book_key),'[]'::jsonb) from public.favorites f)
  ) into restored;
  if restored <> data - 'profiles' then raise exception 'A conferência da recuperação falhou. A transação será revertida.'; end if;
  perform setval(pg_get_serial_sequence('public.books','id'),
    greatest(coalesce((select max(id) from public.books),1),(select last_value from public.books_id_seq)),true);
end
$restore$;
commit;
