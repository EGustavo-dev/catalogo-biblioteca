# Testes de interface para celular

A execução [42073598553](https://github.com/EGustavo-dev/catalogo-biblioteca/actions/runs/42073598553) concluiu seis testes com sucesso em 5 de novembro de 2026. Foram usadas larguras de 320, 390 e 768 pixels no Chromium, com toque e emulação de dispositivo móvel.

Os testes cobrem formulário de login, mensagem de senha incorreta, cadastro, pesquisa sem resultado, limpeza de filtros, seleção de autor, abertura da ficha e consulta da prateleira, retorno da conta ao catálogo e consulta dos empréstimos com aviso de atraso. Há verificações de largura para detectar conteúdo que extrapola a tela.

As respostas da API e os dados de contas, livros e empréstimos são simulados no teste. Isso permite conferir os fluxos da interface sem criar contas no banco de produção. A validação de novas credenciais reais e a compatibilidade com aparelhos físicos ficam fora desse ensaio.

As capturas de tela e o relatório HTML ficam nos artefatos de cada execução por sete dias. As rotinas estão em [mobile.spec.js](../tests/mobile/mobile.spec.js), e as próximas alterações no site disparam a verificação automaticamente pelo GitHub Actions.

O workflow usa Ubuntu 24.04 e Playwright 1.56.1 para manter um ambiente compatível. Para executar em uma cópia local, instale as dependências de `tests/mobile`, instale o Chromium pelo Playwright e rode `npx playwright test` nessa pasta.
