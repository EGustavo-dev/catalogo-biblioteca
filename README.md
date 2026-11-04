# Catálogo Biblioteca

Catálogo digital da Biblioteca Monteiro Lobato. O site estático fica em `site/` e a configuração de hospedagem em `vercel.json`.

A versão de produção usa o endereço https://catalogogastavalle.vercel.app/. O Supabase mantém os dados do catálogo e valida as sessões. A função publicada já autoriza o endereço de produção.

Para publicar pela integração Git do Vercel, conecte este repositório ao projeto existente. Use a branch `main`, a raiz do repositório e a configuração do arquivo `vercel.json`.
