# Arquitetura do portal — v1.8.0

## Objetivos

Separar dados editoriais, regras de negócio, acesso à API e apresentação, sem alterar o conteúdo público nem exigir ferramentas de compilação. O portal é hospedável como site estático; requer apenas servidor HTTP(S) para servir ES Modules com o MIME type JavaScript.

## Módulos

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo estático, SEO, estudos técnicos e elementos acessíveis de navegação. |
| `styles.css` | Design tokens, temas e layout responsivo. Não depende de JavaScript para estilização de conteúdo estático. |
| `src/projects.mjs` | Instantâneo editorial dos 21 repositórios confirmados em 01/11/2026. |
| `src/catalog.mjs` | Categorias inferidas conservadoramente, limpeza de dados da API, deduplicação, filtros e ordenação. |
| `src/github.mjs` | Cliente HTTP, resolução de usuário, listagem, Releases, tags, Artifacts e armazenamento temporário. |
| `src/ui.mjs` | Cartões, estado de download, navegação, tema e atualização segura da árvore DOM. |
| `app.js` | Estado de filtro/busca, renderização, observação sob demanda e sincronização opcional com o GitHub. |

## Fluxo

1. O HTML carrega `app.js` como módulo JavaScript nativo (`type="module"`), após o parsing do documento.
2. O catálogo local é exibido imediatamente; não depende de internet nem de credenciais.
3. A aplicação resolve o login do repositório público e tenta consultar os repositórios pela API GitHub. Em caso de falha, mantém o catálogo editorial.
4. Busca e filtros utilizam funções puras. Os cartões são montados por `createElement` e `textContent`, sem `innerHTML` para dados externos.
5. As consultas de Release ocorrem somente quando os cartões entram na região próxima ao viewport. Até três consultas completas executam em paralelo. Re-renderizações compartilham requisições e resultados em andamento.
6. Para APKs, somente URLs HTTPS com domínio GitHub e caminho de download da Release do projeto são aceitas. Artifacts são exibidos como link para a execução, não como APK pronto.

## Falhas e limites

- Sem rede: catálogo editorial offline funciona; apenas atualizações em tempo real e downloads dependem da API.
- HTTP 403 com `x-ratelimit-remaining: 0` ou HTTP 429: evita novas consultas na sessão ativa; não exige token.
- Cache de sessão de Releases: 15 minutos, associado ao usuário e repositório; não guarda erros transitórios.
- Dados de Releases e tags não comprovam que o aplicativo Android compilou ou passou em testes físicos.
- Atualização de dados editoriais é manual e datada. A consulta online encontra novos repositórios, mas pode não obter categorização apropriada sem metadados descritivos.
- ES Modules não são suportados adequadamente ao abrir a página via `file://` devido às restrições de origem dos navegadores. Executar `python3 -m http.server 8080` e acessar `http://localhost:8080`.

## Como desenvolver

1. Atualize descrições/versões editoriais apenas após verificar os READMEs oficiais e registrar a data.
2. Adicione um objeto em `src/projects.mjs`, capa correspondente em `assets/projects/` e teste de regressão no catálogo.
3. Preserve o comportamento da API em `src/github.mjs` e testes com `request` injetável; nunca inclua tokens no site público.
4. Execute `node --test tests/*.test.cjs`.
5. A cada versão, sincronize `VERSION`, `VERSION_CODE`, `github-manager.json`, meta HTML, rodapé, README e CHANGELOG.
