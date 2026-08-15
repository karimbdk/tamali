// Données globales du site — Dr Tamali Rayane
// ⚠️ Toute valeur marquée TODO_CONFIRM doit être validée par écrit par la Dr avant mise en ligne.

export const TODO = '[À CONFIRMER]';
export const TODO_AR = '[بانتظار التأكيد]';

export const brand = {
  name: 'Dr Tamali Rayane',
  nameAr: 'الدكتورة تمالي ريان',
  tagline: {
    fr: 'Dentisterie • Médecine esthétique • Nutrition',
    ar: 'طب الأسنان • الطب التجميلي • التغذية',
  },
  city: { fr: 'Koléa, Tipaza', ar: 'القليعة، تيبازة' },
  instagram: 'https://www.instagram.com/dr_tamali_soundous/',
  facebook: 'https://www.facebook.com/profile.php?id=61591594438450',
  // Numéro confirmé (Instagram + enseigne Clinic Crystal Smile)
  phoneMain: '0699 87 19 21',
  phoneMainTel: '+213699871921',
  whatsappMain: '213699871921',
};

export const clinics = [
  {
    id: 'crystal-smile',
    key: 'dental',
    name: { fr: 'Clinic Crystal Smile', ar: 'Clinic Crystal Smile' },
    kicker: { fr: 'Dentisterie', ar: 'طب الأسنان' },
    short: {
      fr: 'Soins, esthétique du sourire, prothèses, chirurgie et accompagnement personnalisé.',
      ar: 'علاج، تجميل الابتسامة، تركيبات، جراحة ومرافقة شخصية.',
    },
    address: {
      fr: 'Rue Dzair, Koléa, wilaya de Tipaza',
      ar: 'شارع دزاير، القليعة، ولاية تيبازة',
    },
    addressDetail: { fr: TODO + ' (étage, repère d’accès)', ar: TODO_AR + ' (الطابق، نقطة مرجعية)' },
    phones: ['0699 87 19 21'],
    phonesPending: ['0541 92 60 36'],
    whatsapp: '213699871921',
    mapsUrl: '', // TODO_CONFIRM : lien Google Maps exact
    hours: [
      { fr: 'Samedi – Jeudi', ar: 'السبت – الخميس', v: { fr: TODO, ar: TODO_AR } },
      { fr: 'Vendredi', ar: 'الجمعة', v: { fr: TODO, ar: TODO_AR } },
    ],
    img: 'cabinet-crystal-facade',
  },
  {
    id: 'aura-esthetique',
    key: 'aesthetic',
    name: { fr: 'Aura Cabinet d’Esthétique', ar: 'Aura — عيادة التجميل' },
    kicker: { fr: 'Esthétique & Nutrition', ar: 'التجميل والتغذية' },
    short: {
      fr: 'Diagnostic de peau, soins esthétiques et accompagnement nutritionnel selon vos besoins.',
      ar: 'تشخيص البشرة، عناية تجميلية ومرافقة غذائية حسب احتياجك.',
    },
    address: {
      fr: 'Rue Dzair, Koléa, wilaya de Tipaza',
      ar: 'شارع دزاير، القليعة، ولاية تيبازة',
    },
    addressDetail: { fr: TODO + ' (même immeuble ou adresse distincte)', ar: TODO_AR + ' (نفس المبنى أو عنوان مستقل)' },
    phones: [],
    phonesPending: ['0782 19 73 10', '0696 21 27 91'],
    whatsapp: '213699871921',
    mapsUrl: '',
    hours: [
      { fr: 'Samedi – Jeudi', ar: 'السبت – الخميس', v: { fr: TODO, ar: TODO_AR } },
      { fr: 'Vendredi', ar: 'الجمعة', v: { fr: TODO, ar: TODO_AR } },
    ],
    img: 'cabinet-aura-facade',
  },
];

export const clinicById = Object.fromEntries(clinics.map((c) => [c.id, c]));

// Navigation principale
export const nav = [
  { slug: '', label: { fr: 'Accueil', ar: 'الرئيسية' } },
  { slug: 'dentisterie', label: { fr: 'Dentisterie', ar: 'طب الأسنان' } },
  { slug: 'esthetique-nutrition', label: { fr: 'Esthétique & Nutrition', ar: 'التجميل والتغذية' } },
  { slug: 'dr-tamali-rayane', label: { fr: 'Dr Tamali', ar: 'الطبيبة' } },
  { slug: 'cabinets', label: { fr: 'Les cabinets', ar: 'العيادتان' } },
  { slug: 'resultats', label: { fr: 'Résultats', ar: 'النتائج' } },
  { slug: 'contact', label: { fr: 'Contact', ar: 'اتصل بنا' } },
];

export const footerNav = [
  { slug: 'faq', label: { fr: 'FAQ', ar: 'أسئلة شائعة' } },
  { slug: 'rendez-vous', label: { fr: 'Prendre rendez-vous', ar: 'حجز موعد' } },
  { slug: 'mentions-legales', label: { fr: 'Mentions légales', ar: 'معلومات قانونية' } },
  { slug: 'confidentialite', label: { fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' } },
];

export const ui = {
  book: { fr: 'Prendre rendez-vous', ar: 'حجز موعد' },
  bookShort: { fr: 'Rendez-vous', ar: 'موعد' },
  call: { fr: 'Appeler', ar: 'اتصال' },
  whatsapp: { fr: 'WhatsApp', ar: 'واتساب' },
  discover: { fr: 'Découvrir les soins', ar: 'اكتشف الخدمات' },
  learnMore: { fr: 'En savoir plus', ar: 'اقرأ المزيد' },
  allServices: { fr: 'Toutes les prestations', ar: 'كل الخدمات' },
  menu: { fr: 'Menu', ar: 'القائمة' },
  close: { fr: 'Fermer', ar: 'إغلاق' },
  home: { fr: 'Accueil', ar: 'الرئيسية' },
  langSwitch: { fr: 'العربية', ar: 'Français' },
  backTop: { fr: 'Haut de page', ar: 'أعلى الصفحة' },
  medicalNotice: {
    fr: 'Les informations de ce site sont d’ordre général et ne remplacent pas une consultation. Chaque indication est posée après examen.',
    ar: 'المعلومات المنشورة هنا عامة ولا تغني عن الاستشارة. كل قرار علاجي يُتخذ بعد الفحص.',
  },
  resultsNotice: {
    fr: 'Les résultats varient selon chaque personne. Les photos publiées le sont avec le consentement écrit des patients et ne constituent pas une garantie de résultat.',
    ar: 'النتائج تختلف من شخص لآخر. الصور تُنشر بموافقة خطية من المرضى ولا تعني ضمان نتيجة مماثلة.',
  },
};
