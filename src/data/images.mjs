// Manifeste des images du site.
// Chaque entrée génère : un emplacement vide dans les pages + une fiche dans IMAGE_PROMPTS.md
// Fichier attendu : assets/img/<id>.jpg  (ou .webp — voir README)
//
// negative : à passer au modèle si l'outil le supporte.
// Toutes les scènes sont neutres : aucun visage réel, aucun patient identifiable, aucun logo de marque.

export const SHARED_STYLE =
  'photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, ' +
  'palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ' +
  'ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, ' +
  'rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive';

export const SHARED_NEGATIVE =
  'texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, ' +
  'sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure';

export const images = [
  // ── Accueil ────────────────────────────────────────────────────────────
  {
    id: 'hero-portrait',
    ratio: '16/10',
    page: 'Accueil — Hero',
    alt: { fr: 'Dr Tamali Rayane dans son cabinet à Koléa', ar: 'الدكتورة تمالي ريان في عيادتها بالقليعة' },
    prompt:
      'Portrait horizontal d’une femme médecin algérienne d’une trentaine d’années, debout de trois quarts dans un cabinet médical clair et minimaliste. ' +
      'Blouse blanche impeccable, expression calme et bienveillante, regard direct vers l’objectif, sourire léger et naturel. ' +
      'Arrière-plan légèrement flou : mur ivoire, plante verte discrète, meuble laqué blanc. ' +
      'Le sujet est cadré à droite du cadre, large espace négatif à gauche pour recevoir du texte. ' +
      'Lumière naturelle latérale venant d’une grande fenêtre, ombres douces.',
  },
  {
    id: 'home-approach',
    ratio: '4/3',
    page: 'Accueil — Approche',
    alt: { fr: 'Consultation dans un cabinet calme', ar: 'استشارة داخل عيادة هادئة' },
    prompt:
      'Scène de consultation vue de côté : une praticienne en blouse blanche, assise, explique quelque chose en montrant un écran ou un schéma posé sur un bureau clair. ' +
      'La patiente est vue de dos, hors focus, non identifiable. Bureau minimaliste, dossier papier, stylo, petite plante. ' +
      'Ambiance feutrée, lumière de fin de matinée.',
  },

  // ── Cabinets ───────────────────────────────────────────────────────────
  {
    id: 'cabinet-crystal-facade',
    ratio: '3/2',
    page: 'Cabinets — Clinic Crystal Smile',
    alt: { fr: 'Entrée de Clinic Crystal Smile', ar: 'مدخل عيادة Clinic Crystal Smile' },
    prompt:
      'Entrée d’un cabinet dentaire moderne dans une petite ville méditerranéenne : façade claire, porte vitrée, ' +
      'enseigne murale neutre SANS TEXTE (plaque unie bleu médical), quelques marches, plante en pot. ' +
      'Fin d’après-midi, lumière chaude, trottoir propre, aucune personne visible.',
  },
  {
    id: 'cabinet-crystal-salle',
    ratio: '3/2',
    page: 'Cabinets — Salle de soins dentaires',
    alt: { fr: 'Salle de soins dentaires', ar: 'غرفة علاج الأسنان' },
    prompt:
      'Salle de soins dentaires vide, propre et lumineuse : fauteuil dentaire moderne gris clair, scialytique éteint, ' +
      'plan de travail blanc avec instruments stérilisés sous emballage, mur bleu médical doux, sol clair. ' +
      'Aucune personne. Composition symétrique, lumière diffuse.',
  },
  {
    id: 'cabinet-aura-facade',
    ratio: '3/2',
    page: 'Cabinets — Aura Cabinet d’Esthétique',
    alt: { fr: 'Entrée du cabinet Aura', ar: 'مدخل عيادة Aura' },
    prompt:
      'Entrée d’un cabinet d’esthétique médicale haut de gamme : porte vitrée, mur prune profond, ' +
      'plaque murale unie dorée SANS TEXTE, éclairage indirect chaud, olivier en pot, sol en pierre claire. ' +
      'Aucune personne visible, fin de journée.',
  },
  {
    id: 'cabinet-aura-salle',
    ratio: '3/2',
    page: 'Cabinets — Salle de soins esthétiques',
    alt: { fr: 'Salle de soins esthétiques', ar: 'غرفة العناية التجميلية' },
    prompt:
      'Salle de soins esthétiques vide : table de soin blanche avec drap propre, tabouret, lampe loupe, ' +
      'petit chariot avec flacons neutres sans étiquette, mur ivoire, touche prune et or, serviettes roulées. ' +
      'Ambiance spa médical, lumière douce, aucune personne.',
  },
  {
    id: 'cabinet-accueil',
    ratio: '3/2',
    page: 'Cabinets — Accueil',
    alt: { fr: 'Espace d’accueil et d’attente', ar: 'فضاء الاستقبال والانتظار' },
    prompt:
      'Espace d’accueil d’un cabinet médical boutique : comptoir en bois clair, fauteuils beiges, ' +
      'mur ivoire, cadre décoratif abstrait, bouquet discret, sol en terrazzo clair. Aucune personne. ' +
      'Lumière naturelle latérale.',
  },

  // ── Dr Tamali ──────────────────────────────────────────────────────────
  {
    id: 'dr-portrait-vertical',
    ratio: '3/4',
    page: 'Dr Tamali Rayane — Portrait',
    alt: { fr: 'Portrait du Dr Tamali Rayane', ar: 'صورة الدكتورة تمالي ريان' },
    prompt:
      'Portrait vertical studio-naturel d’une femme médecin algérienne, blouse blanche, bras détendus, ' +
      'léger sourire, regard confiant vers l’objectif. Fond uni ivoire chaud, très léger dégradé. ' +
      'Éclairage principal doux à 45°, remplissage discret, aucune ombre dure. Cadrage taille.',
  },
  {
    id: 'dr-consultation-dentaire',
    ratio: '4/3',
    page: 'Dr Tamali Rayane — Consultation dentaire',
    alt: { fr: 'Explication d’un plan de traitement dentaire', ar: 'شرح خطة علاج الأسنان' },
    prompt:
      'Praticienne en blouse blanche montrant un modèle anatomique de mâchoire à une patiente vue de dos et floue. ' +
      'Cabinet dentaire clair en arrière-plan. Geste pédagogique, mains nettes et bien formées, ' +
      'lumière naturelle, ambiance rassurante.',
  },
  {
    id: 'dr-consultation-esthetique',
    ratio: '4/3',
    page: 'Dr Tamali Rayane — Consultation esthétique',
    alt: { fr: 'Analyse de peau en consultation', ar: 'تحليل البشرة أثناء الاستشارة' },
    prompt:
      'Praticienne en blouse blanche réalisant une analyse de peau à l’aide d’une lampe loupe, ' +
      'patiente vue de profil très flou et non identifiable. Cabinet esthétique ivoire et prune, ' +
      'lumière douce, concentration calme.',
  },

  // ── Sections métier ────────────────────────────────────────────────────
  {
    id: 'branch-dental',
    ratio: '3/2',
    page: 'Dentisterie — Bandeau',
    alt: { fr: 'Espace dentaire Clinic Crystal Smile', ar: 'فضاء طب الأسنان' },
    prompt:
      'Vue d’ambiance d’un cabinet dentaire moderne : fauteuil en arrière-plan flou, premier plan net sur ' +
      'un plateau d’instruments stérilisés et un miroir dentaire. Dominante bleu médical et blanc, ' +
      'lumière propre et froide adoucie.',
  },
  {
    id: 'branch-aesthetic',
    ratio: '3/2',
    page: 'Esthétique & Nutrition — Bandeau',
    alt: { fr: 'Espace esthétique Aura', ar: 'فضاء التجميل Aura' },
    prompt:
      'Vue d’ambiance d’un cabinet d’esthétique médicale : table de soin floue en arrière-plan, ' +
      'premier plan net sur des flacons en verre ambré sans étiquette et une serviette blanche pliée. ' +
      'Dominante prune, ivoire et or. Lumière chaude et diffuse.',
  },

  // ── Pages prestations ──────────────────────────────────────────────────
  { id: 'service-soins-dentaires', ratio: '3/2', page: 'Prestation — Soins conservateurs', alt: { fr: 'Soins dentaires conservateurs', ar: 'العلاج المحافظ للأسنان' }, prompt: 'Gros plan sur des instruments dentaires stérilisés disposés sur un champ bleu, fauteuil flou en arrière-plan. Netteté sur le premier plan, lumière clinique douce, aucune personne.' },
  { id: 'service-esthetique-sourire', ratio: '3/2', page: 'Prestation — Esthétique du sourire', alt: { fr: 'Esthétique du sourire', ar: 'تجميل الابتسامة' }, prompt: 'Nuancier de teintes dentaires posé sur une surface blanche à côté d’un miroir dentaire et d’un petit modèle de dents. Lumière naturelle, dominante blanche et or discret, aucune personne, aucun texte lisible sur le nuancier.' },
  { id: 'service-protheses', ratio: '3/2', page: 'Prestation — Prothèses', alt: { fr: 'Prothèses dentaires', ar: 'التركيبات السنية' }, prompt: 'Modèle de mâchoire en plâtre blanc sur un plan de travail clair, avec une couronne céramique posée à côté sur un tissu bleu. Éclairage doux, macro, aucune personne.' },
  { id: 'service-orthodontie', ratio: '3/2', page: 'Prestation — Orthodontie', alt: { fr: 'Orthodontie et gouttières', ar: 'التقويم والقوالب' }, prompt: 'Gouttière orthodontique transparente posée sur son boîtier blanc, à côté d’un modèle dentaire, sur fond ivoire. Macro, lumière douce, reflets délicats, aucune personne.' },
  { id: 'service-chirurgie', ratio: '3/2', page: 'Prestation — Chirurgie & extraction', alt: { fr: 'Chirurgie dentaire', ar: 'جراحة الأسنان' }, prompt: 'Plateau chirurgical stérile vu de dessus : champ bleu, instruments emballés, gants en boîte, compresses. Composition ordonnée, lumière neutre, aucune personne, aucun sang.' },
  { id: 'service-implantologie', ratio: '3/2', page: 'Prestation — Implantologie', alt: { fr: 'Implantologie dentaire', ar: 'زراعة الأسنان' }, prompt: 'Modèle pédagogique d’implant dentaire en titane présenté sur un socle blanc, arrière-plan bleu médical très flou. Macro nette, éclairage studio doux, aucune personne.' },
  { id: 'service-diagnostic-peau', ratio: '3/2', page: 'Prestation — Diagnostic de peau', alt: { fr: 'Diagnostic de peau', ar: 'تشخيص البشرة' }, prompt: 'Lampe loupe d’esthétique médicale allumée au-dessus d’une table de soin blanche vide, fiche de consultation vierge et stylo à côté. Ambiance calme, ivoire et prune, aucune personne.' },
  { id: 'service-soins-visage', ratio: '3/2', page: 'Prestation — Soins du visage', alt: { fr: 'Soins du visage', ar: 'العناية بالوجه' }, prompt: 'Nature morte de soin du visage : bol en céramique, spatule, serviette blanche roulée, flacon en verre sans étiquette, sur marbre clair avec touche or. Lumière douce, aucune personne.' },
  { id: 'service-injections', ratio: '3/2', page: 'Prestation — Injections', alt: { fr: 'Injections esthétiques', ar: 'الحقن التجميلي' }, prompt: 'Plateau médical stérile vu de dessus avec compresses, gants et matériel emballé neutre, sur champ prune. Composition sobre et médicale, sans aiguille visible, sans sang, aucune personne.' },
  { id: 'service-taches-cicatrices', ratio: '3/2', page: 'Prestation — Taches & cicatrices', alt: { fr: 'Taches et cicatrices', ar: 'البقع والندبات' }, prompt: 'Détail abstrait et élégant : gouttes de sérum transparent sur une surface en verre, lumière rasante créant des reflets, fond ivoire dégradé. Macro artistique, aucune personne.' },
  { id: 'service-silhouette', ratio: '3/2', page: 'Prestation — Silhouette', alt: { fr: 'Accompagnement silhouette', ar: 'مرافقة نحت القوام' }, prompt: 'Mètre ruban souple enroulé, verre d’eau et serviette blanche sur une table claire, lumière naturelle du matin, dominante ivoire et prune. Aucune personne, aucun corps visible.' },
  { id: 'service-nutrition', ratio: '3/2', page: 'Prestation — Nutrition', alt: { fr: 'Consultation nutritionnelle', ar: 'استشارة غذائية' }, prompt: 'Composition alimentaire méditerranéenne saine sur une table claire : légumes frais, huile d’olive, fruits secs, carnet de suivi vierge et stylo. Lumière naturelle, tons chauds, aucune personne.' },

  // ── Résultats (à remplacer par de vraies photos consenties) ────────────
  {
    id: 'resultats-cover',
    ratio: '3/2',
    page: 'Résultats — Bandeau',
    alt: { fr: 'Galerie de résultats', ar: 'معرض النتائج' },
    prompt:
      'Image d’ambiance abstraite et élégante : mur ivoire texturé avec un jeu de lumière douce en diagonale, ' +
      'et une fine ligne dorée. Composition minimaliste, aucune personne, aucun texte.',
    note: {
      fr: 'Emplacement décoratif uniquement. Les vignettes avant/après doivent être de VRAIES photos patients, avec consentement écrit et métadonnées supprimées.',
      ar: 'صورة زخرفية فقط. صور قبل/بعد يجب أن تكون صوراً حقيقية للمرضى، بموافقة خطية وبعد حذف البيانات الوصفية.',
    },
  },

  // ── Divers ─────────────────────────────────────────────────────────────
  {
    id: 'og-cover',
    ratio: '1.91/1',
    page: 'Partage réseaux sociaux (Open Graph)',
    alt: { fr: 'Dr Tamali Rayane — Koléa', ar: 'الدكتورة تمالي ريان — القليعة' },
    prompt:
      'Visuel de partage horizontal 1200×630 : cabinet médical clair en légère profondeur de champ à droite, ' +
      'large aplat prune profond à gauche laissé vide pour le titre. Aucun texte dans l’image. ' +
      'Élégant, sobre, lumière naturelle.',
  },
];

export const imageById = Object.fromEntries(images.map((i) => [i.id, i]));
