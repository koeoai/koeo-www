/**
 * French form content for all forms
 */
import type {
  BetaFormContent,
  CareerFormContent,
  PartnerFormContent,
  ValidationMessages,
  FormButtonLabels,
  FormStatusMessages,
} from "../types";

/**
 * Common validation messages (French)
 */
export const COMMON_VALIDATION: ValidationMessages = {
  required: "Ce champ est requis",
  email: "L'adresse courriel est requise",
  invalidEmail: "Veuillez entrer une adresse courriel valide",
  selectOne: "Veuillez sélectionner une option",
  selectAtLeastOne: "Veuillez sélectionner au moins une option",
  fileType: "Veuillez téléverser un document PDF ou Word",
  fileSize: "La taille du fichier doit être inférieure à 5 Mo",
};

/**
 * Common button labels (French)
 */
export const COMMON_BUTTONS: FormButtonLabels = {
  submit: "Soumettre",
  submitting: "Envoi en cours...",
  apply: "Postuler",
  applying: "Envoi en cours...",
};

/**
 * Common status messages (French)
 */
export const COMMON_STATUS: FormStatusMessages = {
  success: {
    title: "Merci !",
    message: "Nous avons bien reçu votre soumission et vous contacterons bientôt.",
  },
  error: "Une erreur s'est produite. Veuillez réessayer.",
  privacyNotice: "Nous ne partagerons pas vos informations en dehors de notre équipe",
};

/**
 * Beta signup form content (French)
 */
export const BETA_FORM_CONTENT: BetaFormContent = {
  heading: "Parlez-nous de votre cas d'utilisation et nous vous contacterons.",
  sections: {
    aboutYou: {
      title: "À propos de vous",
      description: "Quelques informations sur vous et comment vous contacter.",
    },
    aiUsage: {
      title: "Votre utilisation de l'IA",
      description: "Un aperçu rapide de pourquoi vous utilisez l'IA.",
    },
    currentSetup: {
      title: "Votre configuration actuelle",
      description: "Comment et où vos modèles fonctionnent aujourd'hui.",
    },
    painPoints: {
      title: "Points de friction",
      description: "Ce qui est difficile, ennuyeux, lent ou coûteux.",
    },
    features: {
      title: "Ce qui vous aiderait le plus",
    },
  },
  fields: {
    fullName: {
      label: "Nom complet",
      placeholder: "Marie Dupont",
    },
    email: {
      label: "Courriel",
      placeholder: "marie@entreprise.com",
      helperText: "Nous l'utiliserons uniquement pour vous recontacter. Pas de spam.",
    },
    organizationName: {
      label: "Nom de l'organisation",
      placeholder: "ex. Université McGill, Startup IA en mode furtif",
      helperText: "Où vous travaillez ou étudiez.",
    },
    role: {
      label: "Rôle / Persona",
      placeholder: "Sélectionnez votre rôle",
    },
    segment: {
      label: "Segment",
      placeholder: "Sélectionnez votre segment",
    },
    aiUseCase: {
      label: "À quoi utilisez-vous l'IA ?",
      placeholder: "Dites-nous sur quoi vous travaillez...",
      helperText: "Un langage simple est parfait.",
    },
    workloadTypes: {
      label: "Types de charges de travail",
      helperText: "Sélectionnez tout ce qui s'applique.",
    },
    currentInfraSources: {
      label: "Sources d'infrastructure actuelles",
      helperText: "Sélectionnez tout ce qui s'applique.",
    },
    monthlySpend: {
      label: "Dépenses mensuelles approximatives en IA/GPU",
      placeholder: "Sélectionnez votre fourchette de dépenses",
    },
    workflow: {
      label: "Comment travaillez-vous aujourd'hui ?",
      placeholder: "ex. 'Développement local + appel API OpenAI'",
    },
    topPainPoints: {
      label: "Principaux points de friction",
      helperText: "Concentrez-vous sur les 2-3 qui font vraiment mal.",
    },
    painNotes: {
      label: "Notes sur les difficultés",
      placeholder: "Tout contexte supplémentaire...",
    },
    mostValuableFeatures: {
      label: "Fonctionnalités les plus précieuses",
      helperText: "Choisissez celles qui vous importent vraiment.",
    },
    anythingElse: {
      label: "Autre chose à partager ?",
      placeholder: "Cas particuliers, idées, préoccupations, souhaits...",
    },
  },
  options: {
    roles: [
      { value: "Student", label: "Étudiant(e)" },
      { value: "Professor / Lecturer", label: "Professeur(e) / Chargé(e) de cours" },
      { value: "Researcher / PI", label: "Chercheur(se) / Responsable de recherche" },
      { value: "TA / PhD student", label: "Assistant(e) / Doctorant(e)" },
      { value: "ML Engineer / Data Scientist", label: "Ingénieur(e) ML / Data Scientist" },
      { value: "AI Startup Founder / Co-founder", label: "Fondateur(trice) / Co-fondateur(trice) de startup IA" },
      { value: "Product Manager / Product Lead", label: "Chef de produit / Responsable produit" },
      { value: "AI / Data Consultant", label: "Consultant(e) IA / Data" },
      { value: "IT / Infra / DevOps", label: "IT / Infra / DevOps" },
      { value: "Other", label: "Autre" },
    ],
    segments: [
      { value: "Education", label: "Éducation" },
      { value: "Startup / Scaleup", label: "Startup / Scaleup" },
      { value: "Enterprise / Product company", label: "Entreprise / Société de produits" },
      { value: "Consultancy", label: "Cabinet de conseil" },
      { value: "Other", label: "Autre" },
    ],
    workloadTypes: [
      { value: "Training small/medium models", label: "Entraînement de petits/moyens modèles" },
      { value: "Fine-tuning", label: "Ajustement fin (Fine-tuning)" },
      { value: "Inference (LLM / RAG / vision)", label: "Inférence (LLM / RAG / vision)" },
      { value: "Data preprocessing / ETL", label: "Prétraitement de données / ETL" },
      { value: "Prototyping / experimentation only", label: "Prototypage / expérimentation uniquement" },
    ],
    infraSources: [
      { value: "University / on-prem HPC", label: "Université / HPC sur site" },
      { value: "AWS", label: "AWS" },
      { value: "Azure", label: "Azure" },
      { value: "GCP", label: "GCP" },
      { value: "Specialized GPU clouds (RunPod, Lambda, etc.)", label: "Clouds GPU spécialisés (RunPod, Lambda, etc.)" },
      { value: "Colab / free tiers", label: "Colab / niveaux gratuits" },
      { value: "Personal GPU / workstation", label: "GPU personnel / station de travail" },
      { value: "Mostly CPU / no GPU yet", label: "Principalement CPU / pas encore de GPU" },
      { value: "Other", label: "Autre" },
      { value: "Don't know", label: "Je ne sais pas" },
    ],
    monthlySpend: [
      { value: "0–100", label: "0–100 $" },
      { value: "100–500", label: "100–500 $" },
      { value: "500–2k", label: "500–2k $" },
      { value: "2k–10k", label: "2k–10k $" },
      { value: "10k–50k", label: "10k–50k $" },
      { value: "50k+", label: "50k+ $" },
      { value: "Don't know", label: "Je ne sais pas" },
    ],
    painPoints: [
      { value: "Capacity / queues", label: "Capacité / files d'attente" },
      { value: "Cost / unpredictable bills", label: "Coût / factures imprévisibles" },
      { value: "Environment setup (drivers, CUDA, dependencies)", label: "Configuration d'environnement (pilotes, CUDA, dépendances)" },
      { value: "Onboarding new people (students, devs)", label: "Intégration de nouvelles personnes (étudiants, développeurs)" },
      { value: "Hard to deploy models as services", label: "Difficile de déployer des modèles comme services" },
      { value: "Data residency / compliance", label: "Résidence des données / conformité" },
      { value: "Many accounts / keys to manage", label: "Nombreux comptes / clés à gérer" },
      { value: "Poor observability / usage tracking", label: "Mauvaise observabilité / suivi d'utilisation" },
      { value: "Other", label: "Autre" },
    ],
    valuableFeatures: [
      { value: "OpenAI-compatible API", label: "API compatible OpenAI" },
      { value: "Canadian / region-specific GPUs", label: "GPU canadiens / spécifiques à une région" },
      { value: "Bring-your-own-model (Hugging Face / custom)", label: "Apportez votre propre modèle (Hugging Face / personnalisé)" },
      { value: "Per-course / per-team budgets & quotas", label: "Budgets et quotas par cours / par équipe" },
      { value: "\"No infra\" (we don't manage GPUs or Kubernetes)", label: "« Sans infra » (nous ne gérons pas les GPU ou Kubernetes)" },
      { value: "Logs & metrics", label: "Journaux et métriques" },
      { value: "SLAs / reliability", label: "SLA / fiabilité" },
      { value: "Friendly pricing for education / startups", label: "Tarification avantageuse pour l'éducation / startups" },
    ],
  },
  validation: {
    ...COMMON_VALIDATION,
    required: "Ce champ est requis",
  },
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Postuler",
    submitting: "Envoi en cours...",
  },
  status: {
    success: {
      title: "Merci pour vos informations !",
      message: "Nous examinerons vos réponses et vous contacterons si vous avez exprimé un intérêt pour le pilote.",
    },
    error: "Une erreur s'est produite. Veuillez réessayer.",
    privacyNotice: "Nous ne partagerons pas vos réponses en dehors de notre équipe",
  },
};


/**
 * Career form content (French)
 */
export const CAREER_FORM_CONTENT: CareerFormContent = {
  sections: {
    contact: {
      title: "Coordonnées",
      description: "Comment pouvons-nous vous joindre ?",
    },
    background: {
      title: "Votre parcours",
      description: "Parlez-nous de votre expérience.",
    },
    whyKoeo: {
      title: "Pourquoi Koeo ?",
      description: "Aidez-nous à comprendre pourquoi vous seriez un excellent ajout.",
    },
    resume: {
      title: "CV",
      description: "Téléversez votre CV pour que nous puissions en apprendre plus sur vous.",
    },
    anythingElse: {
      title: "Autre chose ?",
    },
  },
  fields: {
    fullName: {
      label: "Nom complet",
      placeholder: "Marie Dupont",
    },
    email: {
      label: "Courriel",
      placeholder: "marie@exemple.com",
    },
    phone: {
      label: "Numéro de téléphone",
      placeholder: "+1 (555) 123-4567",
    },
    linkedIn: {
      label: "Profil LinkedIn",
      placeholder: "https://linkedin.com/in/votreprofil",
    },
    portfolio: {
      label: "Portfolio / GitHub / Site web",
      placeholder: "https://github.com/votrenom",
    },
    currentRole: {
      label: "Poste actuel / titre",
      placeholder: "ex. Ingénieur logiciel senior",
    },
    yearsExperience: {
      label: "Années d'expérience",
      placeholder: "Sélectionnez votre niveau d'expérience",
    },
    areasOfInterest: {
      label: "Domaines d'intérêt",
      helperText: "Quel type de travail vous passionne ?",
    },
    whyKoeo: {
      label: "Pourquoi êtes-vous intéressé(e) par Koeo ?",
      placeholder: "Qu'est-ce qui vous attire dans notre mission ? Qu'est-ce qui vous passionne dans l'infrastructure IA ?",
    },
    whatYouBring: {
      label: "Qu'apporteriez-vous à l'équipe ?",
      placeholder: "Parlez-nous de vos compétences, expériences ou perspectives qui feraient de vous un ajout précieux...",
    },
    resume: {
      label: "CV",
      placeholder: "Cliquez pour téléverser un PDF ou document Word (max 5 Mo)",
      helperText: "Formats acceptés : PDF, DOC, DOCX",
    },
    anythingElse: {
      label: "Y a-t-il autre chose que vous aimeriez nous faire savoir ?",
      placeholder: "Projets personnels, intérêts, questions pour nous...",
    },
  },
  options: {
    experience: [
      { value: "0-2", label: "0-2 ans" },
      { value: "3-5", label: "3-5 ans" },
      { value: "6-10", label: "6-10 ans" },
      { value: "10+", label: "10+ ans" },
    ],
    interests: [
      { value: "Engineering", label: "Ingénierie" },
      { value: "Product", label: "Produit" },
      { value: "Design", label: "Design" },
      { value: "Operations", label: "Opérations" },
      { value: "Sales & Partnerships", label: "Ventes et partenariats" },
      { value: "Marketing", label: "Marketing" },
      { value: "Other", label: "Autre" },
    ],
  },
  validation: COMMON_VALIDATION,
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Soumettre ma candidature",
    submitting: "Envoi en cours...",
  },
  status: {
    success: {
      title: "Merci pour votre intérêt !",
      message: "Nous avons bien reçu votre candidature et la conserverons. Si un poste correspondant à votre profil s'ouvre, nous vous contacterons.",
    },
    error: "Une erreur s'est produite. Veuillez réessayer.",
    privacyNotice: "Nous ne partagerons pas vos informations en dehors de notre équipe",
  },
};

/**
 * Partner form content (French)
 */
export const PARTNER_FORM_CONTENT: PartnerFormContent = {
  heading: "Prêt à rejoindre le réseau ?",
  subheading: "Remplissez le formulaire ci-dessous et nous vous contacterons pour discuter des opportunités de partenariat.",
  sections: {
    organization: {
      title: "À propos de votre organisation",
      description: "Qui êtes-vous et où êtes-vous basé ?",
    },
    contact: {
      title: "Coordonnées",
      description: "Qui KOEO devrait-il contacter ?",
    },
    infrastructure: {
      title: "Profil d'infrastructure",
      description: "Comprendre quel type d'infrastructure / capacité vous avez.",
    },
    readiness: {
      title: "Disponibilité et prochaines étapes",
      description: "Qualifier le calendrier et s'aligner sur la façon de s'engager.",
    },
  },
  fields: {
    partnerName: {
      label: "Nom de l'organisation / partenaire",
      placeholder: "Exemple : HydroCloud DC Montréal",
      helperText: "Le nom de votre entreprise ou organisation.",
    },
    website: {
      label: "Site web",
      placeholder: "https://votreentreprise.com",
      helperText: "Site web principal ou page d'accueil, si disponible.",
    },
    countryRegion: {
      label: "Pays / région",
      placeholder: "Canada – Québec",
      helperText: "Où se trouvent vos principales installations ou opérations pertinentes pour KOEO.",
    },
    cityLocation: {
      label: "Ville / emplacement des installations",
      placeholder: "Montréal ou Toronto DC1",
      helperText: "Ville et, si pertinent, l'installation ou le site spécifique.",
    },
    contactName: {
      label: "Votre nom",
      placeholder: "Marie Dupont",
      helperText: "Point de contact principal pour ce partenariat.",
    },
    contactRole: {
      label: "Votre rôle / titre",
      placeholder: "CTO, Responsable des opérations du centre de données, Fondateur…",
      helperText: "Votre position dans l'organisation.",
    },
    contactEmail: {
      label: "Courriel professionnel",
      placeholder: "nom@votreentreprise.com",
      helperText: "Nous l'utiliserons pour vous recontacter concernant les détails du partenariat KOEO.",
    },
    contactPhone: {
      label: "Téléphone",
      placeholder: "+1 514 555 1234",
      helperText: "Seulement si vous préférez un appel rapide. Incluez l'indicatif du pays.",
    },
    partnershipType: {
      label: "Type de partenariat",
      placeholder: "Sélectionnez une option…",
      helperText: "Sélectionnez l'option qui décrit le mieux comment vous travailleriez avec KOEO.",
    },
    capacityMw: {
      label: "Capacité disponible (MW)",
      placeholder: "1 ou 2,5",
      helperText: "Estimation approximative de la capacité électrique que vous pourriez allouer aux charges de travail IA. Une approximation suffit.",
    },
    supportedPlatforms: {
      label: "Plateformes / services pris en charge",
      helperText: "Quels types d'infrastructure ou de services offrez-vous actuellement ou prévoyez-vous d'offrir ?",
    },
    aiReadiness: {
      label: "Quelle est la maturité de votre infrastructure pour les charges de travail IA ?",
      placeholder: "Sélectionnez une option…",
      helperText: "Cela nous aide à comprendre à quelle vitesse nous pouvons collaborer.",
    },
    infraDetails: {
      label: "Parlez-nous de votre infrastructure",
      placeholder: "Nous exploitons une installation de 5 MW alimentée par l'hydroélectricité près de Montréal avec une connectivité de niveau 1 et ajoutons des racks avec des GPU NVIDIA et AMD…",
      helperText: "2-4 phrases sur l'alimentation, le refroidissement, le réseau, les types de GPU, les régions ou tout autre élément pertinent.",
    },
    onboardingTimeline: {
      label: "Dans combien de temps pourriez-vous intégrer les charges de travail KOEO ?",
      placeholder: "Sélectionnez une option…",
      helperText: "Même une estimation approximative est utile pour la planification.",
    },
    goals: {
      label: "Qu'espérez-vous que KOEO puisse vous aider à accomplir ?",
      placeholder: "Nous aimerions attirer des clients IA vers notre installation au Québec et leur offrir une plateforme GPU fiable sans construire tout le logiciel nous-mêmes…",
      helperText: "Partagez vos principaux objectifs : remplir la capacité GPU, attirer des clients IA, positionnement de conformité, focus régional, etc.",
    },
    preferredNextStep: {
      label: "Prochaine étape préférée",
      placeholder: "Sélectionnez une option…",
      helperText: "Dites-nous comment vous aimeriez commencer la conversation.",
    },
  },
  options: {
    partnershipTypes: [
      { value: "Colocation", label: "Colocation" },
      { value: "Cloud provider", label: "Fournisseur cloud" },
      { value: "Edge / ISP", label: "Edge / FAI" },
      { value: "GPU owner / community host", label: "Propriétaire de GPU / hôte communautaire" },
      { value: "Other", label: "Autre" },
    ],
    supportedPlatforms: [
      { value: "GPU", label: "GPU" },
      { value: "CPU", label: "CPU" },
      { value: "TPU", label: "TPU" },
      { value: "Bare Metal", label: "Bare Metal" },
      { value: "Colocation only", label: "Colocation uniquement" },
      { value: "Cloud VMs", label: "VMs Cloud" },
      { value: "Edge nodes", label: "Nœuds Edge" },
      { value: "Other", label: "Autre" },
    ],
    aiReadiness: [
      { value: "Already hosting AI GPU workloads", label: "Héberge déjà des charges de travail GPU IA" },
      { value: "Hosting generic infra, adding AI soon", label: "Héberge une infra générique, ajout IA bientôt" },
      { value: "Planning AI-ready infra", label: "Planification d'une infra prête pour l'IA" },
      { value: "Exploratory / early discussions", label: "Exploratoire / discussions préliminaires" },
    ],
    onboardingTimeline: [
      { value: "Immediately / already operating", label: "Immédiatement / déjà en opération" },
      { value: "0–3 months", label: "0–3 mois" },
      { value: "3–6 months", label: "3–6 mois" },
      { value: "6+ months / exploratory", label: "6+ mois / exploratoire" },
    ],
    preferredNextStep: [
      { value: "Book a quick intro call", label: "Planifier un appel d'introduction rapide" },
      { value: "Email me more info first", label: "Envoyez-moi d'abord plus d'informations par courriel" },
      { value: "Just keep me in the loop", label: "Tenez-moi simplement informé" },
    ],
  },
  validation: COMMON_VALIDATION,
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Rejoindre notre réseau",
    submitting: "Envoi en cours...",
  },
  status: {
    success: {
      title: "Merci de nous avoir contactés !",
      message: "Nous examinerons vos informations et vous recontacterons selon votre prochaine étape préférée.",
    },
    error: "Une erreur s'est produite. Veuillez réessayer.",
    privacyNotice: "Nous ne partagerons pas vos informations en dehors de notre équipe",
  },
};
