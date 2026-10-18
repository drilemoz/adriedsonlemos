# Adriedson Lemos | Portfólio pessoal v1.6.0

Site estático em **HTML, CSS e JavaScript puro**, criado para apresentar a trajetória de Adriedson Lemos e seus projetos públicos do GitHub.

## Funcionalidades

- **Tema claro por padrão**: fundo branco. Botão para alternar para tema escuro com fundo quase preto (`#08090c`); escolha fica salva no navegador.
- Layout responsivo para celular, tablet e desktop.
- Seções: apresentação, sobre mim, experiência profissional, habilidades, quatro estudos técnicos em destaque, catálogo completo, jornada e contato profissional por e-mail, LinkedIn e GitHub.
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
- `assets/docs/curriculo-adriedson-lemos.pdf`: currículo profissional público de 2026, com experiência comprovada pelo documento de 2024, formação identificada como trancada e projetos de desenvolvimento. Sem telefone, endereço, idade ou condição de saúde.
- `assets/projects/*.svg`: capas ilustrativas vetoriais dos 17 projetos, sem dependências externas.
- `og-image.png`, `robots.txt`, `sitemap.xml`: apresentação nas redes e configuração de indexação.
- `vercel.json`: cabeçalhos de segurança para Vercel.
- `VERSION`, `VERSION_CODE` e `github-manager.json`: metadados explícitos de versão e identidade para importação do site no GitHub Manager. Não é APK e não usa identificador Android.
- `CHANGELOG.md`: histórico de evolução mostrado no rodapé do site.
- `tests/*.test.cjs`: sete grupos de testes automatizados para catálogo, privacidade, versão, estudos técnicos, links APK, Releases e Artifacts, executados com Node.js, sem dependências externas.

Para testar a lógica de downloads:

```bash
node tests/portfolio.test.cjs
node tests/visual-version.test.cjs
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

## Atualização 1.6.0 (17/10/2026)

- Quatro estudos técnicos antes do catálogo de 17 projetos: Vigia IA, Nexora, Pulso Bateria e Minha Câmera. Cada estudo mostra desafio, implementação, fluxo conceitual, tecnologias e estágio de validação, com acesso a README/documentação do projeto.
- As quatro vitrines têm ilustrações SVG locais identificadas como conceituais; nenhuma captura real foi obtida ou simulada. Não foram fabricados resultados de benchmarking de CPU, memória, FPS ou bateria.
- Destaque especial às limitações: transmissão Kotlin do Vigia IA ainda experimental, ganhos do Nexora não quantificados, no Pulso Bateria a validação alpha.36 inclui testes estáticos e Kotlin/JVM mas não build Android, e Minha Câmera ainda investiga instabilidades em MJPEG/H.264.
- Navegação principal ganhou **Destaques** e os quatro cartões correspondentes têm **Análise técnica**. Todos os 17 projetos são preservados no catálogo completo.
- Página estática sem JavaScript de terceiros; continuam os links às fontes públicas e a API GitHub já existente. Nenhum backend ou integração adicional.
- `VERSION` 1.6.0, `VERSION_CODE` 7 e metadados sincronizados. Pendente: publicação na hospedagem e confirmação da URL canônica.

## Atualização 1.5.0 (17/10/2026)

- Apresentação reforçada com experiência em suporte e infraestrutura de TI, sem confundir empregos anteriores e projetos atuais.
- Nova seção **Experiência profissional**: Atacadão (2019–2022), MEDGRUPO (2018–2019) e Prefeitura de Iguatama (2012–2014), conforme currículo de 2024 fornecido pelo titular.
- Nova seção **Habilidades**: desenvolvimento, infraestrutura, ferramentas/dados e projetos pessoais, distinguindo conhecimento declarado de prática em projetos.
- Formação indicada corretamente como **graduação trancada em Análise e Desenvolvimento de Sistemas (Estácio EAD)**, sem declarar diploma concluído.
- PDF do currículo profissional revisado gerado localmente, incluído no site e acessível pelos botões **Baixar currículo** e **Visualizar PDF**. Fonte original de 2024 permanece fora do site, por conter dados pessoais e informações médicas.
- Contato público: e-mail já existente e novo link ao LinkedIn informado no currículo. O telefone público anterior foi removido da página e **não** consta no PDF para reduzir a exposição de dados pessoais. Não publica condição médica, CID, estado civil, idade ou endereço.
- Navegação, estilo responsivo e modo AMOLED/claro preservados. Sem bibliotecas ou servidores externos adicionados.
- Versão `1.5.0`, código `6`, README, CHANGELOG, testes e `github-manager.json` sincronizados. A URL canônica herdada deve ser conferida antes da publicação.

## Atualização 1.4.0 (17/10/2026)

- Foram adicionadas **17 capas vetoriais locais e leves**, uma por projeto catalogado. São **ilustrações conceituais**, não capturas reais dos aplicativos. O rótulo e o texto alternativo deixam isso explícito. Futuras capturas verificadas poderão substituir os arquivos em `assets/projects/`.
- Os cartões agora mostram o estágio indicativo do desenvolvimento (Alfa, Beta, Em testes, Em evolução, Experimental ou Estável). Os estágios são editoriais, com base na documentação pública consultada; não são certificação de segurança/estabilidade do APK nem substituem testes em aparelho.
- Adicionado selo de versão obtida sob demanda pela API do GitHub: **Release** para uma Release pública ou **Tag** para um repositório sem Release. Nunca deduz download a partir do nome de uma tag; o APK segue exigindo asset `.apk` real.
- Corrigido fallback sem IntersectionObserver para consultar todas as versões, no máximo três requisições de cartões em paralelo, em vez de apenas os oito primeiros cartões.
- SEO: metadados Open Graph/Twitter, imagem social PNG local, URL canônica, `robots.txt`, `sitemap.xml` e dados estruturados básicos. **A URL pública foi herdada do campo `website` de `github-manager.json` e deve ser verificada na hospedagem** antes de divulgar. Nenhuma implantação foi feita nesta entrega.
- Atualizados VERSION, VERSION_CODE 5, identidade, documentação, rodapé e testes. Sem analytics, SDK externo, imagens de terceiros ou mudanças nos contatos públicos.

## Atualização 1.3.0 (17/10/2026)

- Catálogo local revisado com base nos **17 repositórios públicos de projetos** da conta `drilemoz` (além do repositório deste portfólio).
- Novos cartões conhecidos: **Nexora**, **Minha Câmera**, **Uai Vozes**, **Baixa Fácil**, **MeuGiga**, **Meu Vercel**, **Tática Manager**, **Lista de Compras** (`Lista-de-Compras`) e **Termux Manager Android** (`Termux-Manager`).
- Removidos do catálogo de reserva os projetos **Saldo Real**, **Lista Nômade**, **Lista de Mercado**, **Meu PC**, **Guia DOA** e **Meu Bolsa Família**, não encontrados entre os repositórios públicos atuais. Eles podem continuar existindo fora da conta pública; a alteração não exclui repositórios nem seus dados.
- Atualizadas as descrições das ferramentas que permaneceram no catálogo; diferenciado o projeto Android `Termux-Manager` da ferramenta de terminal `TermuxManager`.
- Preservados tema claro/escuro, busca, filtros, links de GitHub, lógica de Releases/APKs e atualização automática pela API. Se a API pública falhar, a página usa os 17 projetos catalogados localmente.
- Versão do portal `1.3.0`, `VERSION_CODE` `4`, metadados, rodapé e testes sincronizados.

## Atualização 1.2.0

- Incluídos e-mail profissional e telefone para contato na versão histórica 1.2.0 (telefone removido do site na 1.5.0).
- Adicionado número **v1.2.0** no rodapé, com link para o histórico público de alterações.
- Criados `VERSION`, `VERSION_CODE` e `github-manager.json`, para oferecer identidade e versão explícitas ao GitHub Manager, sem simular projeto Android.
- Mantidos o tema branco padrão e o preto profundo opcional, a navegação responsiva e os links aos projetos.

### Versionamento do portal

Atualize **juntos** os arquivos `VERSION`, `VERSION_CODE`, `github-manager.json`, rodapé no `index.html`, README e CHANGELOG em cada nova entrega. `VERSION_CODE` é um contador sequencial de entregas do site (`7` nesta versão), não um código Android. A identificação efetiva depende da versão instalada do GitHub Manager.

**Privacidade atual (v1.6.0):** somente o e-mail profissional e os links de GitHub/LinkedIn aparecem no contato. O telefone da versão antiga foi removido. Não há analytics nem formulário com armazenamento; o e-mail visível ainda pode ser coletado por robôs.

## Atualização 1.1.0

- Corrigido botão de Releases vazias, inclusive Termux Manager.
- Corrigida distinção entre arquivo APK real, nome de Release, e Artifact do Actions.
- Atualizado o usuário do GitHub para `drilemoz` nos links iniciais, mantendo a descoberta automática do proprietário pela API.
- Mantidos os modos branco padrão e escuro quase preto, layout, filtros e estrutura estática sem dependências.

## Observações

- Site pessoal em português brasileiro.
- Descrições resumidas baseadas nos READMEs públicos dos projetos e nos interesses informados pelo autor.
- Os empregadores anteriores aparecem a partir do currículo de 2024. Não incluímos fotos privadas, endereço, telefone, estado civil, idade ou informações médicas. O e-mail público é o mesmo do site anterior.
- Alguns projetos estão em fase de desenvolvimento, pré-lançamento ou validação. Links de repositório não equivalem a APK estável.
- Antes de divulgar o domínio final, confira a descrição pessoal e os links de downloads.
