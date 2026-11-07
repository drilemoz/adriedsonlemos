# Adriedson Lemos | Tecnologia & Projetos v2.0.0

Portfólio estático de **Adriedson Lemos**, disponível em <https://adriedsonlemos.vercel.app/>, sem framework ou dependências externas.

## O que mudou na versão 2.0.0

- Redesign completo **Tech Dark** com tema escuro inicial, alternativa clara, responsividade e preferência persistida localmente.
- **Home** com quatro projetos destacados: Vigia IA, Explorador XP, GitHub Manager e UAI Cortes. Os cartões são renderizados a partir da curadoria local e reconciliados com a API pública do GitHub.
- **Catálogo secundário** de até dez projetos adicionais selecionados, com pesquisa, filtros e consulta sob demanda de Releases/Artifacts.
- **Não mostrar** repositórios arquivados, desativados, privados, forks, entradas desconhecidas ou sem seleção editorial quando a API responde. Em falha de rede, usa a lista local verificada em 07/11/2026, identificando que pode estar desatualizada.
- Nova **página `contato.html`**, com WhatsApp `(37) 99874-7642` no formato wa.me, e-mail, GitHub, LinkedIn e chave Pix `drilemoz@gmail.com` com botão para copiar.
- SEO de ambas as páginas, sitemap atualizado, sem token GitHub no navegador nem dados falsos de downloads.
- Histórico profissional, PDF do currículo e informações sobre formação preservados.

## Organização

- `index.html`: Home, destaques, catálogo, apresentação, habilidades e experiência.
- `contato.html` e `contato.js`: canais públicos e cópia da chave Pix.
- `styles.css`: identidade e responsividade.
- `src/projects.mjs`: curadoria dos 14 repositórios não arquivados conferidos em 07/11/2026.
- `src/catalog.mjs`: filtragem conservadora de status e classificação.
- `src/github.mjs`: API pública do GitHub, cache, Releases e Artifacts.
- `src/ui.mjs`: geração de cartões seguros, shell, tema e menu.
- `app.js`: inicialização do catálogo e sincronização com GitHub.
- `tests/`: testes Node.js de catálogo, privacidade, interface, API, contato, versão e SEO.

## Executar e testar

```sh
node --test tests/*.test.cjs
python3 -m http.server 8080
```

Abra `http://localhost:8080`. Não abra via `file://`, pois há módulos ES.

## Publicar

Site para implantação estática na Vercel, com a raiz do repositório como diretório público, sem build. Configuração em `vercel.json`.

## Limites importantes

O GitHub é fonte para existência e situação dos repositórios, mas não confirma que o APK foi testado. Sem API, o site deixa claro que o catálogo local é uma fotografia datada, e não disponibilidade verificada em tempo real. Capas SVG são ilustrações, não capturas reais. O botão Pix copia a chave, não gera uma cobrança nem um QR Code.

A mudança do nome de usuário GitHub exige revisão de referências estáticas e da constante `INITIAL_GITHUB_USER`; a detecção de redirecionamento não é garantida.

Histórico de versões anteriores: [CHANGELOG.md](CHANGELOG.md).
