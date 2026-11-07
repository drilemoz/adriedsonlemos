# Validação local v2.1.0 — 07/11/2026

## Escopo
- Tema claro inicial, modo escuro por escolha manual e persistência entre páginas.
- Cartões compactos, contador filtrado, Releases nos quatro destaques e páginas individuais.
- Copiar número do WhatsApp e Pix; metadados, SEO, sitemap e versão 2.1.0/11.

## Garantias e limites
- Sem token do GitHub no navegador; URLs de APK validadas pela origem GitHub e repositório correto.
- Dados de Releases/Artifacts só aparecem quando a API respondeu; Artifacts podem exigir login/expirar.
- Páginas individuais documentam funções e limites, sem alegar teste físico ou imagens reais do aplicativo.
- Snapshot local de repositórios é datado e pode diferir do estado do GitHub quando offline.
- Testes de unidade/integração e inspeção visual precisam ser registrados após execução; não equivalem a homologação em aparelhos Android.

## Resultados executados neste ambiente
- `node --test tests/*.test.cjs`: **12 grupos aprovados, 0 falhas**.
- `node --check` nos módulos JavaScript: sintaxe válida.
- Análise HTML/XML: seis páginas com um H1 cada, sitemap XML válido com seis URLs e nenhum recurso local apontando para arquivo inexistente.
- Inspeção de código: nomes dos quatro repositórios destacados e regras de filtro conservador mantidos.
- Inspeção visual via Chromium/Playwright: **não concluída**, navegador bloqueado pelas restrições do ambiente. Não equivale a aprovação visual em Android ou na Vercel.
- Publicação GitHub: conector retornou **HTTP 403** ao criar árvore Git para nova versão, sem alteração do repositório. Distribuição do ZIP pelo GitHub Manager fica como alternativa.
