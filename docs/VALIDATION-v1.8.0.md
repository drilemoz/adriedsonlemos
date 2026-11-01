# Verificação da refatoração v1.8.0 — 01/11/2026

## Ambiente

- Fonte de partida: ZIP v1.7.0 gerado nesta conversa.
- Node.js 22 disponível; sem `npm install`, sem dependências de projeto e sem chamada de APIs reais pelos testes automatizados.
- Código novo: ES Modules nativos em `src/*.mjs`; arquivo principal `app.js` enxuto.

## Resultados

- `node --test tests/*.test.cjs`: dez grupos de testes aprovados (catálogo, repositórios futuros, integridade de versões e contatos, cenários de downloads, privacidade do currículo, estudos técnicos, Releases e tags, interface de cartões, validação visual estática e arquitetura).
- `node --check`: validação sintática de todos os arquivos JavaScript e módulos, incluída em `tests/architecture.test.cjs`.
- Casos negativos: URLs de APK fora do domínio GitHub ou fora do caminho da Release do repositório, categorias sem evidência, repositórios privados, rate limit, cache expirado, pedidos duplicados, conteúdo não confiável em texto, Releases ausentes e rede indisponível.

## Pendente

- Uma tentativa de abrir a página no Chromium/Playwright falhou por `ERR_BLOCKED_BY_ADMINISTRATOR`, inclusive com rota HTTP simulada. **Não** é evidência de defeito do site e **não** equivale a teste visual aprovado.
- Conferir desktop e smartphone em servidor HTTP real e no deploy Vercel.
- Publicação do repositório GitHub: não executada; a integração de GitHub não possuía permissão de escrita (HTTP 403 na tentativa anterior).

A refatoração não modifica os aplicativos catalogados, seus READMEs e suas Releases.
