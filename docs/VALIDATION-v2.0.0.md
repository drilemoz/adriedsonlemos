# Validação da versão 2.0.0 — 07/11/2026

## Inspeção e alterações

- Base: ZIP v1.8.0 (`1f6061820359c39bd2b67fee53d384bfc5ee4fa2`), SHA dos arquivos de código conferido com a branch `main` do GitHub antes da edição.
- Curadoria: 16 repositórios retornados pela conta conectada, sendo 1 arquivado e 1 portfólio; 14 selecionados para exibição, dos quais 4 destaques.
- Filtragem em tempo de execução de `archived`, `disabled`, `private`, `fork` e repositórios não curados.
- Atualização de HTML, CSS, JS, README, CHANGELOG, metadados, sitemap, capas adicionais e testes.

## Testes

- `node --test tests/*.test.cjs`: 11 grupos aprovados.
- `node --check` nos módulos JavaScript novos/alterados: sem erros sintáticos.
- CSS analisado com `tinycss2`: sem erros de parsing em regras de topo.
- HTML das duas páginas inspecionado com `lxml`: documentos parseáveis.
- URLs de WhatsApp, Pix, GitHub, LinkedIn e caminhos internos testados estaticamente.
- **Pendente:** teste visual e interativo em navegador real (Chromium headless não terminou no ambiente disponível); verificar menu mobile, contraste, downloads, clipboard e sincronização após deploy.
- **Pendente:** confirmar implantação da versão 2.0.0 na Vercel e disponibilidade de cada Release/APK em conexão externa.

## Limites

O catálogo local é fotografia datada, não garante que um repositório permanecerá ativo. A API pública do GitHub pode impor limites ou falhar. Capas são ilustrativas; não há capturas reais dos aplicativos.
