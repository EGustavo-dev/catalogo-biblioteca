
create schema if not exists library_backup;
revoke all on schema library_backup from public, anon, authenticated, service_role;
create table library_backup.snapshots (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  reason text not null,
  format_version integer not null default 1,
  payload jsonb not null,
  row_counts jsonb not null,
  checksum text not null,
  verified_at timestamptz
);
alter table library_backup.snapshots enable row level security;
revoke all on all tables in schema library_backup from public, anon, authenticated, service_role;
revoke all on all sequences in schema library_backup from public, anon, authenticated, service_role;

create function library_backup.take_snapshot(backup_reason text default 'scheduled')
returns bigint language plpgsql security invoker set search_path = '' as $$
declare data jsonb; counts jsonb; snapshot_id bigint;
begin
  perform pg_catalog.pg_advisory_xact_lock(682451921);
  select jsonb_build_object(
    'books', (select coalesce(jsonb_agg(to_jsonb(b) order by b.id), '[]'::jsonb) from public.books b),
    'shelves', (select coalesce(jsonb_agg(to_jsonb(s) order by s.prateleira), '[]'::jsonb) from public.shelves s),
    'profiles', (select coalesce(jsonb_agg(to_jsonb(p) order by p.id), '[]'::jsonb) from public.profiles p),
    'favorites', (select coalesce(jsonb_agg(to_jsonb(f) order by f.user_id, f.book_key), '[]'::jsonb) from public.favorites f),
    'loans', (select coalesce(jsonb_agg(to_jsonb(l) order by l.id), '[]'::jsonb) from public.loans l)
  ) into data;
  select jsonb_object_agg(key, jsonb_array_length(value)) into counts from jsonb_each(data);
  insert into library_backup.snapshots(reason,payload,row_counts,checksum)
  values(left(coalesce(backup_reason,'manual'),200), data, counts,
    encode(extensions.digest(data::text, 'sha256'), 'hex')) returning id into snapshot_id;
  delete from library_backup.snapshots where created_at < now() - interval '14 days' and id <> snapshot_id;
  return snapshot_id;
end;
$$;
revoke all on function library_backup.take_snapshot(text) from public, anon, authenticated, service_role;

create function library_backup.verify_snapshot(backup_id bigint)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare snapshot library_backup.snapshots; restored jsonb;
begin
  select * into strict snapshot from library_backup.snapshots where id=backup_id;
  if snapshot.checksum <> encode(extensions.digest(snapshot.payload::text,'sha256'),'hex') then
    raise exception 'Backup checksum mismatch';
  end if;
  select jsonb_build_object(
    'books', (select coalesce(jsonb_agg(to_jsonb(b) order by b.id), '[]'::jsonb) from jsonb_populate_recordset(null::public.books,snapshot.payload->'books') b),
    'shelves', (select coalesce(jsonb_agg(to_jsonb(s) order by s.prateleira), '[]'::jsonb) from jsonb_populate_recordset(null::public.shelves,snapshot.payload->'shelves') s),
    'profiles', (select coalesce(jsonb_agg(to_jsonb(p) order by p.id), '[]'::jsonb) from jsonb_populate_recordset(null::public.profiles,snapshot.payload->'profiles') p),
    'favorites', (select coalesce(jsonb_agg(to_jsonb(f) order by f.user_id,f.book_key), '[]'::jsonb) from jsonb_populate_recordset(null::public.favorites,snapshot.payload->'favorites') f),
    'loans', (select coalesce(jsonb_agg(to_jsonb(l) order by l.id), '[]'::jsonb) from jsonb_populate_recordset(null::public.loans,snapshot.payload->'loans') l)
  ) into restored;
  if restored <> snapshot.payload then raise exception 'Backup does not match current table definitions'; end if;
  update library_backup.snapshots set verified_at=now() where id=backup_id;
  return jsonb_build_object('id',backup_id,'valid',true,'rows',snapshot.row_counts);
end;
$$;
revoke all on function library_backup.verify_snapshot(bigint) from public, anon, authenticated, service_role;
create function library_backup.run_daily()
returns jsonb language plpgsql security invoker set search_path = '' as $$
begin
  return library_backup.verify_snapshot(library_backup.take_snapshot('daily'));
end;
$$;
revoke all on function library_backup.run_daily() from public, anon, authenticated, service_role;
create extension if not exists pg_cron;
select cron.schedule('library-daily-backup', '0 6 * * *', 'select library_backup.run_daily();');
