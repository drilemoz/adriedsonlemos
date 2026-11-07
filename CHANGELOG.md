# Histórico de alterações

## v2.1.0 — 07/11/2026

- Tema **claro por padrão**, mantendo escuro opcional pelo botão e persistência apenas após escolha explícita.
- Cartões secundários compactos no celular; contador de resultados passa a indicar `N de total` conforme filtros e busca.
- Destaques com páginas individuais de detalhes, tecnologias, funcionalidades, limites e links de documentação.
- Downloads/Releases consultados também nos quatro cartões principais e nas páginas individuais, sem inventar APK nem afirmar builds válidas sem evidência.
- WhatsApp recebe botão de copiar número; Pix informa sucesso/erro de cópia; seção Contato ocupa menos espaço vertical.
- Sitemap/SEO/README/versões atualizados para `2.1.0` e código `11`.
- Preservada a curadoria de projetos ativos e a arquitetura HTML/CSS/JS sem dependências extras.

## v2.0.0 — 07/11/2026

- Novo design Tech Dark responsivo, tema claro opcional, Home com quatro destaques e catálogo secundário.
- Página `contato.html` com WhatsApp, e-mail, LinkedIn, GitHub e chave Pix com cópia.
- Projetos curados por repositórios públicos não arquivados: 14 em 07/11/2026. Na consulta online: excluir `archived`, `disabled`, `private`, `fork` e não selecionados.
- Fallback datado em falhas da API; não alegar verificação atual quando indisponível.
- Versionamento 2.0.0, código 10, sitemap, documentação e testes atualizados.

# Histórico de alterações

## v1.8.0 · 01/11/2026

- **Refatoração modular:** `app.js` passa a orquestrar a interface; `src/projects.mjs`, `src/catalog.mjs`, `src/github.mjs` e `src/ui.mjs` separam dados, regras puras, API e DOM.
- **Sem dependências ou build:** JavaScript ES Modules nativo, site ainda estático e pronto para Vercel; `index.html` carrega `app.js` com `type="module"`.
- **Resiliência do GitHub:** concorrência máxima de três consultas de Release, deduplicação de pedidos, cache de sessão de 15 minutos, validação de URLs APK e fallback editorial sem rede.
- **Segurança e testes:** renderização somente por `textContent`, verificação de metadados públicos, testes de entradas suspeitas e 10 grupos de testes Node.js.
- **Documentação e versão:** README, arquitetura, validação, `VERSION=1.8.0`, `VERSION_CODE=9` e `github-manager.json` sincronizados. Layout, catálogo de 21 projetos, estudos técnicos e imagens preservados.
- **Limites:** teste de navegador automatizado não executado por bloqueio de navegação do ambiente. Deploy e teste na Vercel pendentes. Nenhuma alteração no GitHub remoto foi feita.

## v1.7.0 · 01/11/2026

- Catálogo local atualizado de 17 para 21 repositórios públicos após comparação com os READMEs do GitHub. Novos projetos: UAI Cortes, Quanto Sobra?, Finanças da Viagem e Internet XP.
- Inclusão de quatro capas SVG conceituais locais, com texto alternativo e aviso de que não representam capturas reais.
- Descrições, tecnologias e categorias dos 21 projetos revistas. Categorias de novos repositórios são inferidas apenas quando metadados explícitos permitem; caso contrário continuam visíveis no filtro Todos.
- Revisão editorial e técnica dos quatro estudos existentes: Vigia IA (1.0.323+323), Nexora (alpha.38), Pulso Bateria (alpha.73) e Minha Câmera (1.4.76), com ressalvas de CI, testes físicos e recursos experimentais.
- Número de versão do código dos projetos exibido como instantâneo datado (01/11/2026), separado dos identificadores de Releases/tags e dos downloads APK reais.
- Versionamento do portal em 1.7.0 / código 8, documentação e testes sincronizados. O currículo, contatos, temas e estrutura visual foram mantidos.
- Os dados dos READMEs refletem o momento da consulta; futuras alterações nos repositórios exigirão revisão editorial. Sem mudança automática de produção implícita neste pacote.


## v1.6.0 · 17/10/2026

- Criada vitrine técnica com quatro estudos em profundidade: Vigia IA, Nexora, Pulso Bateria e Minha Câmera.
- Cada estudo identifica desafio, abordagem tecnológica, fluxo simplificado, tecnologias, estado de verificação e ressalvas específicas documentadas, com links diretos ao código e às evidências públicas.
- Diferencia explicitamente testes estáticos/Kotlin-JVM de build Android e testes físicos; não apresenta metas de FPS, ganhos de desempenho ou autonomia como resultados medidos.
- Acrescentada navegação por projetos em destaque, links do catálogo para os quatro estudos e preservadas as capas conceituais, com aviso de que não são capturas reais.
- Mantidos todos os 17 projetos, o currículo profissional, o tema, os filtros, os downloads e o tratamento de dados pessoais da v1.5.0.
- Versão 1.6.0 / código 7 sincronizados em metadados, interface, documentação e testes. Nenhuma publicação remota realizada.


## v1.5.0 · 17/10/2026

- Nova seção de experiência profissional com três funções e empregadores documentados no currículo de 2024.
- Nova seção de habilidades por área, separando suporte/infraestrutura de programação e experimentação.
- Atualização da apresentação, dos links de navegação e dos botões de currículo.
- Inclusão do currículo profissional público em PDF, com formação trancada informada corretamente.
- Remoção do número de telefone do site e exclusão de detalhes médicos, civis e outros dados pessoais do currículo público.
- Link para LinkedIn como contato, mantendo o e-mail profissional já divulgado.
- Atualização sequencial para 1.5.0 / código 6, teste de privacidade e metadados sincronizados.

## Versões anteriores

## 1.4.0 — 17/10/2026

- Adicionadas capas SVG conceituais, locais e acessíveis aos 17 projetos, com indicação de que não são capturas reais.
- Indicadores editoriais de estágio do desenvolvimento e selos dinâmicos de Release ou tag pública, sem confundir tag com APK disponível.
- Corrigida consulta de versões nos navegadores sem IntersectionObserver.
- Novos metadados de compartilhamento/SEO com imagem PNG, dados estruturados, robots e sitemap; domínio declarado requer verificação após publicar.
- Metadados, documentação e testes atualizados. Versão 1.4.0, code 5.


## 1.3.0 — 17/10/2026

- Catálogo local sincronizado com 17 repositórios públicos, excluindo o repositório do portfólio.
- Incluídos Nexora, Uai Vozes, Minha Câmera, Baixa Fácil, MeuGiga, Meu Vercel, Tática Manager, Lista de Compras e Termux Manager Android.
- Retirados do catálogo de fallback seis nomes que não estão mais entre os repositórios públicos atuais; nenhuma exclusão remota foi realizada.
- Atualizadas descrições, categorias, tecnologias e projetos em destaque.
- Versionamento e testes atualizados; tema e consulta de downloads preservados.

## 1.2.0

- Adicionadas opções de contato público por e-mail e telefone, com links nativos `mailto:` e `tel:`.
- Rodapé informa a versão corrente do portal e direciona para este histórico.
- Identidade e controle sequencial de versão por `VERSION`, `VERSION_CODE` e `github-manager.json`.
- Mantidas as melhorias 1.1.0 de APKs, GitHub Actions e Termux Manager.

## 1.1.0

- Tratamento de projetos sem Releases públicas.
- Termux Manager aponta para instalação no README quando não há Release.
- Consulta de até 100 Releases públicas para encontrar APKs reais.
- Acesso à execução do GitHub Actions quando existe Artifact APK público não expirado.
- Distinção explícita entre download APK, Artifact ZIP e link para compilações.
- Atualizado nome de usuário de referência para drilemoz.

## 1.0.0

- Primeira versão do portfólio estático, temas branco/preto, filtros e integração GitHub.
