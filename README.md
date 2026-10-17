# Adriedson Lemos | Portfólio pessoal v1.3.0

Site estático em **HTML, CSS e JavaScript puro**, criado para apresentar a trajetória de Adriedson Lemos e seus projetos públicos do GitHub.

## Funcionalidades

- **Tema claro por padrão**: fundo branco. Botão para alternar para tema escuro com fundo quase preto (`#08090c`); escolha fica salva no navegador.
- Layout responsivo para celular, tablet e desktop.
- Seções: apresentação, sobre mim, projetos, jornada e contato por e-mail, telefone e GitHub.
- Catálogo inicial com os 17 projetos públicos identificados em 17/10/2026, renderizado mesmo sem acesso à API do GitHub. A consulta online pode descobrir projetos novos depois dessa data.
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
- `VERSION`, `VERSION_CODE` e `github-manager.json`: metadados explícitos de versão e identidade para importação do site no GitHub Manager. Não é APK e não usa identificador Android.
- `CHANGELOG.md`: histórico de evolução mostrado no rodapé do site.
- `tests/portfolio.test.cjs`: testes automatizados de links APK, Releases vazias e Artifacts do Actions, executados com Node.js, sem dependências externas.

Para testar a lógica de downloads:

```bash
node tests/portfolio.test.cjs
```

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
const INITIAL_GITHUB_USER = 'drilemoz';
const PORTFOLIO_REPO = 'adriedsonlemos';
```

O código tenta descobrir automaticamente o nome atual a partir da URL do repositório, aproveitando o redirecionamento de URLs antigas feito pelo GitHub. **Isso não é garantia permanente**, especialmente se o login antigo for assumido por outra conta. Ao mudar de usuário, atualize `INITIAL_GITHUB_USER`, as URLs de fallback em `index.html`, e qualquer link em redes sociais e integrações. 

## Downloads: Releases, Actions e projetos sem APK (v1.1.0)

- **Releases públicas:** consulta até 100 Releases, incluindo pré-lançamentos. O botão **Baixar APK** só aparece se existir um arquivo `.apk` real entre os assets da Release. Uma tag ou uma Release com nome de APK, mas sem arquivo anexado, **não** é link de download.
- **GitHub Actions:** se não encontrar APK nas Releases de um projeto Android, consulta os Artifacts públicos recentes. Se encontrar um Artifact não expirado com nome associado a APK, mostra **Ver APK no Actions**, levando à execução de origem (não tenta download direto). O visitante deve entrar no GitHub para baixar o Artifact, geralmente ZIP, que expira segundo a retenção configurada.
- **Sem Release nem Artifact:** projetos Android mostram **Ver compilações** (sem garantia de existir APK). Projetos que não são Android ficam apenas com **Ver código**. Se houver uma Release sem APK, mostra **Ver versões** com aviso.
- **Termux Manager:** não é aplicativo APK: é uma ferramenta para Termux. Quando não há Releases, o botão leva ao README e se chama **Como instalar**. Assim não é exibida uma página de Releases vazia.
- **Falha na API ou limite de requisições:** não anuncia que não há Releases; informa indisponibilidade temporária da consulta, mantendo o link para o código.

O site não armazena APKs, não usa credenciais nem cria links de download temporário ou fictícios. Por depender de APIs públicas, a seção de downloads pode sofrer com limites de taxa, erros de rede e expiração dos Artifacts. As consultas de cada projeto são feitas conforme os cartões aparecem e ficam em cache por aba por 15 minutos.

## Atualização 1.3.0 (17/10/2026)

- Catálogo local revisado com base nos **17 repositórios públicos de projetos** da conta `drilemoz` (além do repositório deste portfólio).
- Novos cartões conhecidos: **Nexora**, **Minha Câmera**, **Uai Vozes**, **Baixa Fácil**, **MeuGiga**, **Meu Vercel**, **Tática Manager**, **Lista de Compras** (`Lista-de-Compras`) e **Termux Manager Android** (`Termux-Manager`).
- Removidos do catálogo de reserva os projetos **Saldo Real**, **Lista Nômade**, **Lista de Mercado**, **Meu PC**, **Guia DOA** e **Meu Bolsa Família**, não encontrados entre os repositórios públicos atuais. Eles podem continuar existindo fora da conta pública; a alteração não exclui repositórios nem seus dados.
- Atualizadas as descrições das ferramentas que permaneceram no catálogo; diferenciado o projeto Android `Termux-Manager` da ferramenta de terminal `TermuxManager`.
- Preservados tema claro/escuro, busca, filtros, links de GitHub, lógica de Releases/APKs e atualização automática pela API. Se a API pública falhar, a página usa os 17 projetos catalogados localmente.
- Versão do portal `1.3.0`, `VERSION_CODE` `4`, metadados, rodapé e testes sincronizados.

## Atualização 1.2.0

- Incluídos e-mail `drilemoz@gmail.com` e telefone `+55 (37) 99874-7642` com atalhos para envio de mensagem por aplicativo de e-mail e ligação no celular.
- Adicionado número **v1.2.0** no rodapé, com link para o histórico público de alterações.
- Criados `VERSION`, `VERSION_CODE` e `github-manager.json`, para oferecer identidade e versão explícitas ao GitHub Manager, sem simular projeto Android.
- Mantidos o tema branco padrão e o preto profundo opcional, a navegação responsiva e os links aos projetos.

### Versionamento do portal

Atualize **juntos** os arquivos `VERSION`, `VERSION_CODE`, `github-manager.json`, rodapé no `index.html`, README e CHANGELOG em cada nova entrega. `VERSION_CODE` é um contador sequencial de entregas do site (`4` nesta versão), não um código Android. A identificação efetiva depende da versão instalada do GitHub Manager.

**Privacidade:** o e-mail e o telefone estão visíveis no HTML público do portal e também podem ser coletados por robôs da internet. Não foi implementado envio por servidor nem formulário que armazene dados.

## Atualização 1.1.0

- Corrigido botão de Releases vazias, inclusive Termux Manager.
- Corrigida distinção entre arquivo APK real, nome de Release, e Artifact do Actions.
- Atualizado o usuário do GitHub para `drilemoz` nos links iniciais, mantendo a descoberta automática do proprietário pela API.
- Mantidos os modos branco padrão e escuro quase preto, layout, filtros e estrutura estática sem dependências.

## Observações

- Site pessoal em português brasileiro.
- Descrições resumidas baseadas nos READMEs públicos dos projetos e nos interesses informados pelo autor.
- Fotos, empregadores, endereço residencial e outras informações privadas não foram incluídos. O e-mail e telefone publicados foram fornecidos explicitamente para a seção de contato.
- Alguns projetos estão em fase de desenvolvimento, pré-lançamento ou validação. Links de repositório não equivalem a APK estável.
- Antes de divulgar o domínio final, confira a descrição pessoal e os links de downloads.
