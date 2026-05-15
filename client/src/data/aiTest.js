export const questions = [
  {
    id: 1,
    category: 'Culture',
    type: 'mcq',
    question: "C'est quoi exactement un LLM ?",
    options: [
      { id: 'a', label: "Un Large Language Model : un réseau de neurones entraîné sur d'énormes corpus de texte pour prédire et générer du langage", correct: true },
      { id: 'b', label: "Un système qui interroge internet en temps réel pour répondre à tes questions", correct: false },
      { id: 'c', label: "Un moteur de raisonnement basé sur des règles logiques codées en dur par des experts", correct: false },
      { id: 'd', label: "Une IA capable de générer images, vidéos et texte simultanément (multi-modale)", correct: false },
    ],
    explanation:
      "Un LLM, c'est avant tout un modèle entraîné sur du texte pour générer du langage. La recherche web (B), le raisonnement symbolique (C) ou le multi-modal (D) sont des capacités ajoutées ou des paradigmes différents — pas le LLM lui-même.",
  },
  {
    id: 2,
    category: 'Culture',
    type: 'mcq',
    question: "Concrètement, c'est quoi la différence entre un chatbot et un agent IA ?",
    options: [
      {
        id: 'a',
        label: "Un chatbot répond à des questions ; un agent peut utiliser des outils, faire des actions et enchaîner plusieurs étapes pour atteindre un objectif",
        correct: true,
      },
      { id: 'b', label: "Un chatbot fonctionne en temps réel ; un agent tourne en tâche de fond sans supervision", correct: false },
      { id: 'c', label: "Un chatbot utilise les modèles d'IA classiques ; un agent utilise uniquement les modèles les plus récents type Claude Opus", correct: false },
      { id: 'd', label: "Un chatbot répond message par message ; un agent garde en mémoire toute l'historique de la conversation", correct: false },
    ],
    explanation:
      "L'agent se distingue par sa capacité à AGIR : utiliser des outils (Folk, Slack, Drive), prendre des décisions intermédiaires, enchaîner des étapes pour atteindre un objectif. La mémoire (D), le mode async (B) ou le modèle sous-jacent (C) sont des features possibles mais pas le critère qui distingue les deux.",
  },
  {
    id: 3,
    category: 'Culture',
    type: 'mcq',
    question: "Une 'hallucination' en IA, c'est quand le modèle...",
    options: [
      { id: 'a', label: "Plante", correct: false },
      { id: 'b', label: "Refuse de répondre", correct: false },
      { id: 'c', label: "Invente une info qui semble vraie mais est fausse", correct: true },
      { id: 'd', label: "Lit trop de contexte", correct: false },
    ],
    explanation:
      "Toujours vérifier les chiffres, dates, noms. L'IA est confiante même quand elle invente.",
  },
  {
    id: 4,
    category: 'Pragmatique',
    type: 'mcq',
    question:
      "Tu as 200 fiches contacts à structurer dans le même format JSON pour les importer dans Folk. Le meilleur réflexe ?",
    options: [
      {
        id: 'a',
        label: "Tu colles 10 fiches dans Claude, tu vérifies, tu continues fiche par fiche",
        correct: false,
      },
      {
        id: 'b',
        label: "Tu crées un agent Dust avec le format JSON en system prompt et tu lui donnes le batch complet",
        correct: true,
      },
      {
        id: 'c',
        label: "Tu demandes à ChatGPT de te faire une formule Excel qui fait la conversion",
        correct: false,
      },
      { id: 'd', label: "Tu le fais à la main, l'IA peut se tromper sur des données contacts", correct: false },
    ],
    explanation:
      "Volume + format strict + reproductible = c'est exactement ce qu'un agent Dust fait bien.",
  },
  {
    id: 5,
    category: 'Pragmatique',
    type: 'mcq',
    question:
      "Quand est-ce que ça vaut vraiment le coup de créer un agent Dust plutôt que d'utiliser Claude en chat à chaque fois ?",
    options: [
      { id: 'a', label: "Dès que la tâche est compliquée", correct: false },
      {
        id: 'b',
        label:
          "Quand la tâche est répétée régulièrement, OU faite par plusieurs personnes, OU doit s'enchaîner avec d'autres outils",
        correct: true,
      },
      { id: 'c', label: "Quand tu n'as pas le temps de faire le travail toi-même", correct: false },
      { id: 'd', label: "Quand tu veux accéder à un meilleur modèle d'IA", correct: false },
    ],
    explanation:
      "Un agent coûte du temps à construire — il devient rentable s'il sert souvent, à plusieurs, ou s'il connecte plusieurs outils.",
  },
  {
    id: 6,
    category: 'Sens critique',
    type: 'mcq',
    question: "Laquelle de ces tâches NE devrait PAS être faite par un agent IA sans supervision humaine ?",
    options: [
      { id: 'a', label: "Pré-rédiger un mail interne", correct: false },
      { id: 'b', label: "Trier les CV reçus par catégorie", correct: false },
      { id: 'c', label: "Envoyer un engagement juridique à un fournisseur", correct: true },
      { id: 'd', label: "Faire une veille concurrentielle", correct: false },
    ],
    explanation:
      "Un agent peut préparer, mais ce qui engage Rise — contrats, juridique, paiements, comms externes — reste validé par un humain.",
  },
  {
    id: 7,
    category: "Création d'agent",
    type: 'checkbox',
    question:
      "Tu veux créer un agent Dust pour aider Léa à préparer les CR des meetings d'Olivier. Sélectionne tous les éléments que tu mettrais dans l'agent (au moins 3 pour valider la question).",
    options: [
      { id: 'a', label: "Une structure type de CR (objectifs, décisions, actions)", correct: true },
      { id: 'b', label: "Le ton attendu (factuel, concis, action-oriented)", correct: true },
      { id: 'c', label: "Les sources à utiliser (transcripts Granola, agenda)", correct: true },
      { id: 'd', label: "Les sujets sensibles à ne pas mettre par écrit", correct: true },
      { id: 'e', label: "Le format de sortie (markdown, longueur)", correct: true },
      { id: 'f', label: "Les destinataires habituels du CR", correct: true },
      { id: 'g', label: "Un exemple de CR bien fait à imiter", correct: true },
    ],
    explanation:
      "Un bon agent = structure + ton + sources + exemple. Plus tu donnes de contexte, plus l'agent sera précis et fiable.",
    minCorrect: 3,
  },
];
