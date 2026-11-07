/* Curadoria de projetos públicos não arquivados, conferida em 07/11/2026.
 * A API do GitHub confirma o estado atual quando disponível.
 * Não adicionar projetos sem validação editorial.
 */
export const PROJECTS = Object.freeze([
  {
    "repo": "Vigia-IA",
    "name": "Vigia IA",
    "stage": "Em evolução",
    "description": "Plataforma Android modular com mapas offline, navegação, câmeras e IA local. Desenvolvida com foco em testes reais, autonomia e cicloviagem.",
    "categories": [
      "android"
    ],
    "kind": "Android / IA e mapas",
    "stack": [
      "Flutter",
      "IA local",
      "Mapas offline"
    ],
    "icon": "◎",
    "featured": true
  },
  {
    "repo": "Explorador-XP",
    "name": "Explorador XP",
    "stage": "Alfa",
    "description": "Gerenciador de arquivos Android com ferramentas de organização, visualização de mídia e acesso autorizado à rede local.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Arquivos",
    "stack": [
      "Kotlin",
      "MediaStore",
      "SMB / WebDAV"
    ],
    "icon": "▦",
    "featured": true
  },
  {
    "repo": "GitHub-Manager",
    "name": "GitHub Manager",
    "stage": "Em evolução",
    "description": "Aplicativo para administrar repositórios, Actions, Releases e arquivos do GitHub diretamente no Android.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / DevTools",
    "stack": [
      "Android",
      "GitHub API",
      "CI/CD"
    ],
    "icon": "⌘",
    "featured": true
  },
  {
    "repo": "UAI-Cortes",
    "name": "UAI Cortes",
    "stage": "Alfa",
    "description": "Editor de vídeo Android com cortes, legendas, organização de mídias e recursos de produção audiovisual.",
    "categories": [
      "android"
    ],
    "kind": "Android / Edição de vídeo",
    "stack": [
      "Kotlin",
      "Compose",
      "Media3"
    ],
    "icon": "▹",
    "featured": true
  },
  {
    "repo": "Celular-Remoto",
    "name": "Celular Remoto",
    "stage": "Em evolução",
    "description": "Controle e diagnóstico autorizados de dispositivos Android pela rede local, com pareamento e proteções de acesso.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Rede local",
    "stack": [
      "Kotlin",
      "Android",
      "LAN"
    ],
    "icon": "↔",
    "featured": false
  },
  {
    "repo": "eureciclo",
    "name": "Eu Reciclo",
    "stage": "Em evolução",
    "description": "Calculadora de materiais recicláveis com preços editáveis, histórico de vendas, metas de compra e backup. Aplicativo híbrido em Vue/Capacitor.",
    "categories": [
      "android",
      "web"
    ],
    "kind": "Web / Android",
    "stack": [
      "Vue 3",
      "Vite",
      "Capacitor"
    ],
    "icon": "♻",
    "featured": false
  },
  {
    "repo": "Finan-as-Viagens",
    "name": "Finanças da Viagem",
    "stage": "Em evolução",
    "description": "Finanças offline de cicloviagem: receitas, gastos, carteiras, orçamento, planejamento, recicláveis e backups. Distingue ganhos e despesas do dia sem contar transferências como receita.",
    "categories": [
      "android"
    ],
    "kind": "Android / Cicloviagem",
    "stack": [
      "Kotlin",
      "Compose",
      "SQLite"
    ],
    "icon": "₢",
    "featured": false
  },
  {
    "repo": "Lista-de-Compras",
    "name": "Lista de Compras",
    "stage": "Em evolução",
    "description": "Listas de compras offline para Android com orçamento, histórico de preços e organização de itens. Backup de dados é importante na migração entre identificadores de aplicativo.",
    "categories": [
      "android"
    ],
    "kind": "Android / Compras",
    "stack": [
      "Kotlin",
      "Material 3",
      "Offline"
    ],
    "icon": "☷",
    "featured": false
  },
  {
    "repo": "Meu-Site",
    "name": "IguatamaOnline",
    "stage": "Em evolução",
    "description": "Portal de notícias locais em PHP e MySQL, com painel editorial, mídia, métricas e backup.",
    "categories": [
      "web"
    ],
    "kind": "Web / Notícias",
    "stack": [
      "PHP",
      "MySQL",
      "JavaScript"
    ],
    "icon": "▤",
    "featured": false
  },
  {
    "repo": "MeuGiga",
    "name": "MeuGiga",
    "stage": "Em testes",
    "description": "Acompanha o consumo de dados móveis por aplicativo, com histórico e alertas de franquia. Consulta de Wi-Fi permanece separada dos cálculos da franquia móvel.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Dados móveis",
    "stack": [
      "Kotlin",
      "Android",
      "UsageStats"
    ],
    "icon": "▥",
    "featured": false
  },
  {
    "repo": "QuantoSobra",
    "name": "Quanto Sobra?",
    "stage": "Alfa",
    "description": "Simulador offline de orçamento pessoal: renda CLT, MEI, PJ e outras modalidades, despesas, reservas e resultado mensal. Tributos editáveis não substituem apuração fiscal.",
    "categories": [
      "android"
    ],
    "kind": "Android / Finanças",
    "stack": [
      "Kotlin",
      "Compose",
      "Offline"
    ],
    "icon": "◈",
    "featured": false
  },
  {
    "repo": "Tatica-Manager",
    "name": "Tática Manager",
    "stage": "Em evolução",
    "description": "Jogo Android de gerenciamento de futebol em Flutter com partida 2D via Flame, elenco, estratégia, simulação e narração de eventos.",
    "categories": [
      "android"
    ],
    "kind": "Android / Jogo",
    "stack": [
      "Flutter",
      "Dart",
      "Flame"
    ],
    "icon": "⚽",
    "featured": false
  },
  {
    "repo": "Termux-Manager",
    "name": "Termux Manager Android",
    "stage": "Experimental",
    "description": "Integração experimental do aplicativo Termux a um snapshot do TermuxManager em APK privado para Android; não é o mesmo projeto que a ferramenta de terminal.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Termux",
    "stack": [
      "Android",
      "Termux",
      "Integração"
    ],
    "icon": "▣",
    "featured": false
  },
  {
    "repo": "TermuxManager",
    "name": "Termux Manager",
    "stage": "Estável",
    "description": "Gerenciador modular de projetos para o Termux: importa, prepara, executa, acompanha logs, gera backups e verifica atualizações com consentimento.",
    "categories": [
      "ferramentas"
    ],
    "kind": "Terminal / Ferramenta",
    "stack": [
      "Termux",
      "CLI",
      "Automação"
    ],
    "icon": ">_",
    "featured": false
  }
] .map(project => Object.freeze(project)));
