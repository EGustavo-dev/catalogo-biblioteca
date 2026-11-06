-- Execute como operador no SQL Editor. As tabelas do ensaio são temporárias.
begin;
do $test$
declare snapshot library_backup.snapshots; table_name text; reconstructed jsonb; restored_count bigint;
begin
  select * into strict snapshot from library_backup.snapshots order by id desc limit 1;
  perform library_backup.verify_snapshot(snapshot.id);
  foreach table_name in array array['books','shelves','profiles','favorites','loans'] loop
    execute format('create temporary table %I (like public.%I including all) on commit drop',
      'backup_rehearsal_'||table_name,table_name);
    execute format('insert into pg_temp.%I select * from jsonb_populate_recordset(null::public.%I,$1)',
      'backup_rehearsal_'||table_name,table_name) using snapshot.payload->table_name;
    execute format('select coalesce(jsonb_agg(to_jsonb(t)),''[]''::jsonb),count(*) from pg_temp.%I t',
      'backup_rehearsal_'||table_name) into reconstructed,restored_count;
    if restored_count <> jsonb_array_length(snapshot.payload->table_name)
       or not (reconstructed @> (snapshot.payload->table_name) and reconstructed <@ (snapshot.payload->table_name)) then
      raise exception 'Recovery rehearsal failed for %',table_name;
    end if;
    raise notice 'Recovery OK for %: % rows',table_name,restored_count;
  end loop;
end;
$test$;
rollback;
