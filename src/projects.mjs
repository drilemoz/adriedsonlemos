/* Catálogo editorial offline verificado em 01/11/2026.
 * Valores do código-fonte não equivalem a APKs publicados ou builds aprovados.
 * A UI consulta Releases e Artifacts separadamente.
 */
export const PROJECTS = Object.freeze([
  {
    "repo": "Vigia-IA",
    "name": "Vigia IA",
    "stage": "Em evolução",
    "description": "App modular de monitoramento com IA local e câmeras IP/Android. Mapas offline, navegação ciclística e ajuste de ritmo durante a rota; transmissão e diagnóstico seguem em evolução.",
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
    "featured": true,
    "sourceVersion": "1.0.323+323"
  },
  {
    "repo": "Nexora",
    "name": "Nexora",
    "stage": "Alfa",
    "description": "IA local Android com modelos GGUF e llama.cpp. Inclui biblioteca independente de Wikipédia offline com arquivos ZIM, índice SQLite FTS4 e leitor de artigos; integração da Wikipédia à IA ainda não implementada.",
    "categories": [
      "android"
    ],
    "kind": "Android / IA offline",
    "stack": [
      "Kotlin",
      "llama.cpp",
      "ZIM / SQLite"
    ],
    "icon": "✧",
    "featured": true,
    "sourceVersion": "0.1.0-alpha.38"
  },
  {
    "repo": "Minha-Camera",
    "name": "Minha Câmera",
    "stage": "Em testes",
    "description": "Usa um Android como câmera pela rede local. MJPEG, pareamento e comandos autenticados, lanterna remota conforme hardware e H.264 experimental; requer validação de estabilidade e FPS em aparelhos.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Câmera",
    "stack": [
      "Kotlin",
      "MJPEG / H.264",
      "Wi-Fi local"
    ],
    "icon": "◉",
    "featured": true,
    "sourceVersion": "1.4.76"
  },
  {
    "repo": "Pulso",
    "name": "Pulso Bateria",
    "stage": "Alfa",
    "description": "Monitoramento de bateria offline com leituras identificadas, histórico e Labs de energia solar/carga/consumo. Painel remoto autorizado pela LAN, previsões condicionadas a dados e relatórios de testes.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Energia",
    "stack": [
      "Kotlin",
      "Compose",
      "Room / LAN"
    ],
    "icon": "◍",
    "featured": true,
    "sourceVersion": "0.1.0-alpha.73"
  },
  {
    "repo": "UAI-Cortes",
    "name": "UAI Cortes",
    "stage": "Alfa",
    "description": "Editor de vídeo Android com cortes, união, PiP, legendas e exportação MP4. Presets de legendas, sincronização de palavras e reconhecimento opcional; modo Vosk offline preservado.",
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
    "sourceVersion": "0.1.90"
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
    "sourceVersion": "0.1.0-alpha.16"
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
    "sourceVersion": "1.0.1"
  },
  {
    "repo": "InternetXP",
    "name": "Internet XP",
    "stage": "Em testes",
    "description": "Navegador Android com motor Mozilla GeckoView e visual inspirado no Windows XP. Abas, histórico, favoritos, downloads, menus contextuais e análise seletiva de mídias.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Navegador",
    "stack": [
      "GeckoView",
      "Android",
      "Navegação"
    ],
    "icon": "◫",
    "sourceVersion": "1.0.40"
  },
  {
    "repo": "Explorador-XP",
    "name": "Explorador XP",
    "stage": "Alfa",
    "description": "Explorador de arquivos Android com bibliotecas de fotos/vídeos via MediaStore, players multimídia, ZIP, WebDAV, SMB2/SMB3 e acesso à rede quando autorizado. Preparação para Google Play em andamento.",
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
    "sourceVersion": "0.1.0-alpha.143"
  },
  {
    "repo": "GitHub-Manager",
    "name": "GitHub Manager",
    "stage": "Em evolução",
    "description": "Administra repositórios, releases, GitHub Actions, downloads, Secrets e versões pelo Android. Inclui busca por AAB de Play em Releases/Artifacts, confirmação de arquivos e notificações opcionais.",
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
    "sourceVersion": "2.0.137"
  },
  {
    "repo": "UaiVozes",
    "name": "Uai Vozes",
    "stage": "Alfa",
    "description": "Texto para áudio no Android por ElevenLabs, com biblioteca de MP3 e salvamento via seletor SAF. Também oferece leitura por sintetizador Android sem consumir créditos do serviço.",
    "categories": [
      "android"
    ],
    "kind": "Android / Áudio",
    "stack": [
      "Flutter",
      "ElevenLabs",
      "TTS Android"
    ],
    "icon": "♫",
    "sourceVersion": "0.1.0-alpha.26+26"
  },
  {
    "repo": "BaixaFacil",
    "name": "Baixa Fácil",
    "stage": "Alfa",
    "description": "Navegador e gerenciador de downloads Android com histórico e favoritos. Busca local de endereços e sugestões online apenas quando ativadas, além de controles de transferência.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Downloads",
    "stack": [
      "Android",
      "WebView",
      "Downloads"
    ],
    "icon": "↓",
    "sourceVersion": "0.1.0-alpha.84"
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
    "sourceVersion": "0.1.9"
  },
  {
    "repo": "Meu-Vercel",
    "name": "Meu Vercel",
    "stage": "Em testes",
    "description": "Cliente Android da API Vercel para projetos e deploys. Permite promover deploys e solicitar rollback de produção com confirmação, sujeitos a permissões, plano e validação do resultado.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Deploys",
    "stack": [
      "Android",
      "Vercel API",
      "Deploys"
    ],
    "icon": "△",
    "sourceVersion": "1.6.0"
  },
  {
    "repo": "MonitorRemoto",
    "name": "Monitor Remoto",
    "stage": "Alfa",
    "description": "Gerenciamento remoto autorizado entre Androids com telemetria, arquivos e temperatura pela LAN/VPN. Foto remota depende de permissão e preparo explícito no aparelho monitorado.",
    "categories": [
      "android",
      "ferramentas"
    ],
    "kind": "Android / Rede",
    "stack": [
      "Kotlin",
      "LAN / VPN",
      "Autorização"
    ],
    "icon": "⇄",
    "sourceVersion": "0.1.0-alpha.105"
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
    "sourceVersion": "0.1.1.148"
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
    "sourceVersion": "1.0.46+50"
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
    "sourceVersion": "1.4.12"
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
    "sourceVersion": "0.1.0-alpha.5"
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
    "sourceVersion": "1.0.133"
  },
  {
    "repo": "LoteriasFacil",
    "name": "Loterias Fácil",
    "stage": "Beta",
    "description": "Aplicativo nativo Kotlin e Jetpack Compose para consulta de resultados, conferência de jogos e análises locais de loterias, com dados em SQLite.",
    "categories": [
      "android"
    ],
    "kind": "Android / Dados",
    "stack": [
      "Kotlin",
      "Compose",
      "SQLite"
    ],
    "icon": "◈",
    "sourceVersion": "3.0.0-beta.7"
  }
] .map((project) => Object.freeze(project)));
