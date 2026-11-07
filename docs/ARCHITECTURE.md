# Arquitetura v2.0.0

Site estático em duas páginas: `index.html` e `contato.html`. CSS único com temas. A Home usa `app.js` e os módulos `src/projects.mjs`, `src/catalog.mjs`, `src/github.mjs`, `src/ui.mjs`; Contato usa `contato.js` e a rotina de navegação/tema `setupShell` do módulo UI.

O catálogo editorial é uma lista fechada de 14 repositórios públicos conferidos em 07/11/2026, sendo quatro destacados na primeira seção. Uma atualização da API pública filtra repositórios privados, arquivados, desativados, forks e projetos sem curadoria. O site não apresenta automaticamente um novo repositório sem seleção explícita. Quando a API falha, mostra a lista local e explicita sua data.

Todas as descrições do GitHub entram no DOM via `textContent`. Somente domínios e caminhos de download APK validados podem aparecer como links diretos. Consultas de releases são escalonadas por IntersectionObserver. Não há token ou segredo no frontend; o Pix é apenas uma chave pública, com cópia por interação do usuário.

Conferir os testes com `node --test tests/*.test.cjs`. A compilação não exige bundler.


## v2.1.0 — Páginas e tema

- `:root` e `data-theme=light` são o tema inicial; `data-theme=dark` é escolha explícita em armazenamento local (chave `adriedson-theme-v21`).
- `projetos/*.html`: HTML estático com conteúdo indexável, informações editoriais e links reais.
- `detalhe.js`: usa `createGithubClient` e `applyRelease` para consultar versões/APKs públicos, com cache de sessão.
- Cartões destacados também consultam Releases e links de APK ao entrarem na tela.
- O contador do catálogo indica resultados visíveis e total de projetos secundários.
