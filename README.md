# Catálogo Biblioteca

Catálogo digital da Biblioteca Monteiro Lobato. O site estático fica em `site/` e a configuração de hospedagem em `vercel.json`.

A versão de produção usa o endereço https://catalogogastavalle.vercel.app/. O Supabase mantém os dados do catálogo e valida as sessões. A função publicada já autoriza o endereço de produção.

Para publicar pela integração Git do Vercel, conecte este repositório ao projeto existente. Use a branch `main`, a raiz do repositório e a configuração do arquivo `vercel.json`.

## Rodapé

O componente React está em `components/ui/footer.tsx` e os estilos Tailwind em `styles/footer.css`. O alias `@/components/ui` é o caminho configurado para componentes de interface do shadcn. Em um projeto novo, o comando `npx shadcn@latest init` configura os aliases e a base de estilos. Este catálogo já inclui `components.json` e `tsconfig.json`.

Para editar e gerar novamente o rodapé, execute `npm ci`, `npm run typecheck` e `npm run footer`. Envie ao Git os arquivos gerados em `site/` junto com as alterações do componente. A Vercel serve o HTML e o CSS gerados como arquivos estáticos.
