import { Monitor, Phone, KeyRound, Sparkles, PenLine, FileCheck, Bot, Building2 } from 'lucide-react';

export const CHECKLIST_ITEMS = [
  {
    id: 'acces-bureau',
    icon: Building2,
    title: 'Avoir accès au bureau',
    description: "Récupère ton badge ou le code d'entrée et vérifie que tu peux accéder au bureau sans aide.",
  },
  {
    id: 'ordi',
    icon: Monitor,
    title: 'Configurer ton ordi',
    description: "Installe les apps essentielles et configure ton compte Rise.",
  },
  {
    id: 'teams',
    icon: Phone,
    title: 'Rejoindre Teams',
    description: "Télécharge Microsoft Teams, connecte-toi avec ton adresse Rise et rejoins les canaux de ton équipe.",
  },
  {
    id: 'outils',
    icon: KeyRound,
    title: 'Accéder aux outils',
    description: "Vérifie que tu as accès à tous les outils : Folk, Notion, Drive… et contacte quelqu'un si tu bloques.",
  },
  {
    id: 'formation-ia',
    icon: Sparkles,
    title: 'Faire ta formation IA',
    description: "Complète le test IA de l'onboarding et explore Dust pour voir comment on utilise l'IA chez Rise.",
  },
  {
    id: 'photo-signature',
    icon: PenLine,
    title: 'Photo & signature email',
    description: "Ajoute une vraie photo de profil et configure ta signature email au format Rise.",
  },
  {
    id: 'contrat',
    icon: FileCheck,
    title: 'Signer ton contrat',
    description: "Si ce n'est pas encore fait, signe ton contrat et renvoie les documents demandés par les RH.",
  },
  {
    id: 'dust',
    icon: Bot,
    title: 'Tester Dust',
    description: "Connecte-toi à Dust, explore les assistants disponibles et essaie d'en utiliser un sur une vraie tâche.",
  },
];
