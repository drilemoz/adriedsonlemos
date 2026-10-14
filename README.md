# Adriedson Lemos | Portfólio pessoal

Site estático em **HTML, CSS e JavaScript puro**, criado para apresentar a trajetória de Adriedson Lemos e seus projetos públicos do GitHub.

## Funcionalidades

- **Tema claro por padrão**: fundo branco. Botão para alternar para tema escuro com fundo quase preto (`#08090c`); escolha fica salva no navegador.
- Layout responsivo para celular, tablet e desktop.
- Seções: apresentação, sobre mim, projetos, jornada e contato pelo GitHub.
- Catálogo inicial de projetos conhecidos, renderizado mesmo sem acesso à API do GitHub.
- Consulta opcional à API pública do GitHub para listar os repositórios públicos (sem tokens).
- Busca e filtros por tipo de projeto.
- Consulta sob demanda às Releases, à medida que os cartões entram na tela: exibe um **link direto para APK** somente se uma Release pública tiver um arquivo `.apk` válido. Caso contrário, mantém o link de Releases.
- Nenhum SDK de analytics, nenhuma conta exigida e nenhuma dependência JavaScript externa.

## Arquivos

- `index.html`: conteúdo e estrutura semântica.
- `styles.css`: design, responsividade e temas.
- `app.js`: catálogo, busca, filtros, tema, integração GitHub, APKs.
- `favicon.svg`: identidade visual minimalista.
- `vercel.json`: cabeçalhos de segurança para Vercel.

## Publicar na Vercel

1. Crie ou use o repositório `adriedsonlemos` no GitHub.
2. Envie **todos os arquivos deste diretório para a raiz** do repositório (não envie apenas o `.zip`).
3. Em <https://vercel.com/new>, importe o repositório do GitHub.
4. Em **Framework Preset**, selecione **Other** (site estático). Não configure comando de build nem diretório de saída personalizado; a raiz contém `index.html`.
5. Publique. O endereço `.vercel.app` final depende da disponibilidade do nome.
6. A partir daí, as alterações feitas na branch conectada podem gerar novas implantações automaticamente.

Para testar localmente, abra `index.html` no navegador ou use:

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080` dentro da pasta do site.

## GitHub e mudança futura do nome de usuário

O nome atual configurado no topo de `app.js` é:

```js
const INITIAL_GITHUB_USER = 'adriedsonlemoz';
const PORTFOLIO_REPO = 'adriedsonlemos';
```

O código tenta descobrir automaticamente o nome atual a partir da URL do repositório, aproveitando o redirecionamento de URLs antigas feito pelo GitHub. **Isso não é garantia permanente**, especialmente se o login antigo for assumido por outra conta. Ao mudar de usuário, atualize `INITIAL_GITHUB_USER`, as URLs de fallback em `index.html`, e qualquer link em redes sociais e integrações. 

## Como funciona o download de APKs

A API pública de Releases é consultada sem autenticação e sem segredo. Para cada projeto visto na tela, o site procura nas últimas 12 Releases públicas um asset terminado em `.apk`. Se encontrar, usa o endereço oficial `github.com/<conta>/<repo>/releases/download/...`. Se não encontrar ou se a API falhar, apresenta somente o link **Ver versões**. **O site não armazena APKs** e não inventa arquivos que não existem.

*Limitação:* APKs guardados apenas como artefatos de GitHub Actions, ou em Releases privadas, não aparecem como download direto. Se a Release mais recente não contiver APK, o site poderá apontar para um APK de uma Release anterior. Consulte a página de versões para conferir o histórico e o estado de cada compilação.

O GitHub aplica limites à API pública não autenticada. O site usa consultas de Releases ao aparecerem na tela e mantém um cache por aba de 30 minutos; quando o limite é alcançado, o catálogo inicial ainda funciona.

## Observações

- Site pessoal em português brasileiro.
- Descrições resumidas baseadas nos READMEs públicos dos projetos e nos interesses informados pelo autor.
- Fotos, contatos adicionais, empregadores, endereço e dados privados não foram incluídos.
- Alguns projetos estão em fase de desenvolvimento, pré-lançamento ou validação. Links de repositório não equivalem a APK estável.
- Antes de divulgar o domínio final, confira a descrição pessoal e os links de downloads.
