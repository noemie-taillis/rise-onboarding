export const PLAYBOOK_CATEGORIES = [
  {
    id: 'orientation',
    label: 'Orientation & Objectifs',
    rules: [
      {
        text: "Si un truc ne se passe pas comme prévu, tu vois avec ton manager.",
        subs: [],
      },
      {
        text: "Le Nord ne bouge pas. Tu veux aller à un endroit, si tu rencontres un problème dans l'exécution pour y aller, tu ne changes pas ton objectif et ta destination.",
        subs: [
          "Tu vois quelle alternative tu trouves pour y aller. Comment passer par la fenêtre si la porte est fermée.",
          "Si tu ne trouves pas, tu demandes à ton manager.",
          "Si ton manager ne trouve pas, tu remontes au manager du manager et ainsi jusqu'au CEO.",
        ],
      },
      {
        text: "Do not take NO for an answer — que ça vienne d'un client, d'un fournisseur ou de l'interne. Ça veut dire : tu cherches d'autres moyens d'atteindre le même objectif.",
        subs: [
          "Pas une idée de comment contourner ? Tu demandes autour de toi — à ton manager, à un pair. La solution existe souvent, il faut juste la trouver.",
        ],
      },
    ],
  },
  { id: 'critique',       label: 'Sens Critique',              rules: [] },
  { id: 'communication',  label: 'Communication',               rules: [] },
  { id: 'presentations',  label: 'Présentations & Données',     rules: [] },
  { id: 'vitesse',        label: 'Vitesse & Exécution',         rules: [] },
  { id: 'ai',             label: 'AI & Automatisation',         rules: [] },
  { id: 'management',     label: 'Management & Apprentissage',  rules: [] },
  { id: 'posture',        label: 'Posture & Collectif',         rules: [] },
];
