// Catalogue des prestations.
// ⚠️ Liste et libellés à valider par la Dr avant mise en ligne (règle de publication §2 du cahier des charges).

/**
 * branch : 'dental' | 'aesthetic'
 * Chaque page suit le gabarit en 10 blocs du cahier des charges.
 */
export const services = [
  /* ─────────────── DENTISTERIE — Clinic Crystal Smile ─────────────── */
  {
    slug: 'soins-dentaires',
    branch: 'dental',
    img: 'service-soins-dentaires',
    title: { fr: 'Soins dentaires conservateurs', ar: 'العلاج المحافظ للأسنان' },
    lead: {
      fr: 'Traitement des caries, restauration des dents abîmées et prévention, pour conserver le plus longtemps possible vos dents naturelles.',
      ar: 'علاج التسوّس، ترميم الأسنان المتضررة والوقاية، للحفاظ على أسنانك الطبيعية أطول مدة ممكنة.',
    },
    what: {
      fr: 'Les soins conservateurs regroupent tout ce qui permet de soigner une dent sans la remplacer : nettoyage de la carie, restauration à l’aide d’un matériau adapté, traitement de la sensibilité et, si nécessaire, traitement du nerf. L’objectif est de rétablir la fonction et l’étanchéité de la dent.',
      ar: 'العلاج المحافظ يشمل كل ما يسمح بمعالجة السن دون تعويضه: تنظيف التسوّس، الترميم بمادة مناسبة، معالجة الحساسية، وعند الحاجة علاج العصب. الهدف هو استرجاع وظيفة السن وإحكام إغلاقه.',
    },
    forWhom: {
      fr: ['Douleur ou sensibilité au froid, au chaud ou au sucre', 'Tache ou trou visible sur une dent', 'Ancienne obturation fissurée ou colorée', 'Contrôle de routine et prévention'],
      ar: ['ألم أو حساسية من البارد أو الساخن أو الحلويات', 'بقعة أو تجويف ظاهر على السن', 'حشوة قديمة متشققة أو متغيّرة اللون', 'فحص دوري ووقاية'],
    },
    caution: {
      fr: ['Infection aiguë en cours : elle est traitée en priorité', 'Grossesse : le moment du soin et les produits utilisés sont adaptés', 'Traitement médical en cours ou anticoagulants : à signaler avant le soin'],
      ar: ['وجود التهاب حاد: يُعالج أولاً', 'الحمل: يُختار الوقت المناسب والمواد المستعملة', 'علاج طبي جارٍ أو مميّعات الدم: يجب إخبار الطبيبة قبل الجلسة'],
    },
    steps: {
      fr: ['Examen clinique et radiographie si nécessaire', 'Explication du diagnostic et des options', 'Anesthésie locale si indiquée', 'Nettoyage et restauration de la dent', 'Contrôle de l’occlusion et polissage'],
      ar: ['فحص سريري وصورة أشعة عند الحاجة', 'شرح التشخيص والخيارات المتاحة', 'تخدير موضعي إذا لزم', 'تنظيف السن وترميمه', 'ضبط الإطباق والتلميع'],
    },
    duration: { fr: 'Environ 30 à 60 minutes par séance, selon l’étendue de la lésion.', ar: 'حوالي 30 إلى 60 دقيقة للجلسة، حسب حجم الإصابة.' },
    before: {
      fr: ['Manger normalement avant le rendez-vous', 'Signaler vos antécédents et vos traitements en cours'],
      ar: ['تناول وجبة عادية قبل الموعد', 'أخبر الطبيبة بسوابقك الصحية وأدويتك الحالية'],
    },
    after: {
      fr: ['Attendre la fin de l’anesthésie avant de manger', 'Sensibilité passagère possible pendant quelques jours', 'Reprendre un brossage doux dès le soir même'],
      ar: ['انتظار زوال مفعول التخدير قبل الأكل', 'حساسية مؤقتة ممكنة لبضعة أيام', 'استئناف تنظيف لطيف للأسنان من مساء نفس اليوم'],
    },
    faq: [
      { q: { fr: 'Le soin est-il douloureux ?', ar: 'هل العلاج مؤلم؟' }, a: { fr: 'L’anesthésie locale rend le soin confortable. Une gêne légère peut persister quelques jours après.', ar: 'التخدير الموضعي يجعل الجلسة مريحة. قد يبقى انزعاج خفيف لبضعة أيام بعدها.' } },
      { q: { fr: 'Combien de séances faut-il ?', ar: 'كم جلسة يحتاج العلاج؟' }, a: { fr: 'Une seule séance suffit dans la plupart des cas simples. Le nombre est précisé après l’examen.', ar: 'جلسة واحدة تكفي في أغلب الحالات البسيطة. يُحدَّد العدد بعد الفحص.' } },
    ],
  },
  {
    slug: 'esthetique-du-sourire',
    branch: 'dental',
    img: 'service-esthetique-sourire',
    title: { fr: 'Esthétique du sourire', ar: 'تجميل الابتسامة' },
    lead: {
      fr: 'Éclaircissement, correction de forme et harmonisation du sourire, dans le respect de vos dents naturelles.',
      ar: 'تفتيح اللون، تصحيح الشكل وتناسق الابتسامة، مع احترام أسنانك الطبيعية.',
    },
    what: {
      fr: 'L’esthétique dentaire regroupe plusieurs approches : éclaircissement, restauration en composite, fermeture d’un espace entre les dents, ou facettes selon l’indication. Le choix se fait après un examen et une discussion sur le résultat souhaité et réaliste.',
      ar: 'تجميل الأسنان يشمل عدة طرق: التبييض، الترميم بالكومبوزيت، غلق الفراغات بين الأسنان، أو الوجوه التجميلية (facettes) حسب الحالة. يُختار الحل بعد الفحص ومناقشة النتيجة المرجوة والواقعية.',
    },
    forWhom: {
      fr: ['Dents colorées ou ternes', 'Petit espace entre les incisives', 'Bord dentaire ébréché', 'Souhait d’harmoniser la forme du sourire'],
      ar: ['أسنان متغيّرة اللون أو باهتة', 'فراغ صغير بين الثنايا', 'حافة سن مكسورة', 'الرغبة في تناسق شكل الابتسامة'],
    },
    caution: {
      fr: ['Carie ou maladie de gencive active : à traiter avant', 'Sensibilité dentaire importante', 'Grossesse et allaitement pour l’éclaircissement', 'Attentes non réalistes : elles sont discutées en consultation'],
      ar: ['تسوّس أو التهاب لثة نشط: يُعالج أولاً', 'حساسية أسنان شديدة', 'الحمل والرضاعة بالنسبة للتبييض', 'التوقعات غير الواقعية: تُناقش أثناء الاستشارة'],
    },
    steps: {
      fr: ['Consultation et analyse du sourire', 'Assainissement préalable si nécessaire', 'Choix de la technique et de la teinte', 'Réalisation en une ou plusieurs séances', 'Contrôle et conseils d’entretien'],
      ar: ['استشارة وتحليل الابتسامة', 'تنظيف وعلاج تمهيدي عند الحاجة', 'اختيار التقنية ودرجة اللون', 'التنفيذ في جلسة أو أكثر', 'المراقبة ونصائح المحافظة'],
    },
    duration: { fr: 'De 45 minutes à 2 heures par séance selon la technique.', ar: 'من 45 دقيقة إلى ساعتين للجلسة حسب التقنية.' },
    before: { fr: ['Un détartrage est souvent réalisé au préalable', 'Apporter une photo de votre sourire si vous en avez une'], ar: ['غالباً يُجرى تنظيف الجير قبل الجلسة', 'إحضار صورة للابتسامة إن توفّرت'] },
    after: { fr: ['Éviter café, thé et tabac les 48 h après un éclaircissement', 'Sensibilité transitoire fréquente et passagère'], ar: ['تجنّب القهوة والشاي والتدخين خلال 48 ساعة بعد التبييض', 'حساسية مؤقتة شائعة وتزول تلقائياً'] },
    faq: [
      { q: { fr: 'Le résultat est-il définitif ?', ar: 'هل النتيجة دائمة؟' }, a: { fr: 'Non. La stabilité dépend de l’hygiène, de l’alimentation et du tabac. Un entretien est parfois nécessaire.', ar: 'لا. الثبات يتعلق بالنظافة والتغذية والتدخين. أحياناً تلزم جلسة صيانة.' } },
    ],
  },
  {
    slug: 'protheses-dentaires',
    branch: 'dental',
    img: 'service-protheses',
    title: { fr: 'Prothèses dentaires', ar: 'التركيبات السنية' },
    lead: {
      fr: 'Couronnes, bridges et prothèses amovibles pour remplacer une ou plusieurs dents et retrouver une mastication confortable.',
      ar: 'تيجان، جسور وتركيبات متحركة لتعويض سن أو عدة أسنان واستعادة مضغ مريح.',
    },
    what: {
      fr: 'La prothèse fixe (couronne, bridge) est scellée sur une dent ou un implant. La prothèse amovible se retire pour l’entretien et convient à des situations où plusieurs dents manquent. Le choix dépend du nombre de dents absentes, de l’état de l’os et des gencives.',
      ar: 'التركيبة الثابتة (تاج، جسر) تُثبَّت على سن أو زرعة. التركيبة المتحركة تُنزع للتنظيف وتناسب حالات فقدان عدة أسنان. الاختيار يتعلق بعدد الأسنان المفقودة وحالة العظم واللثة.',
    },
    forWhom: {
      fr: ['Dent très délabrée ou dévitalisée', 'Une ou plusieurs dents absentes', 'Ancienne prothèse inconfortable ou usée'],
      ar: ['سن متضرر بشدة أو مُعالَج عصبياً', 'فقدان سن أو عدة أسنان', 'تركيبة قديمة غير مريحة أو مهترئة'],
    },
    caution: {
      fr: ['Maladie de gencive non stabilisée', 'Hygiène insuffisante : elle est corrigée avant la pose', 'Os insuffisant pour la solution envisagée'],
      ar: ['التهاب لثة غير مستقر', 'نظافة فموية غير كافية: تُصحَّح قبل التركيب', 'عظم غير كافٍ للحل المقترح'],
    },
    steps: {
      fr: ['Bilan clinique et radiologique', 'Préparation des dents supports', 'Empreintes et essayage', 'Pose et réglages', 'Contrôle à distance'],
      ar: ['تقييم سريري وإشعاعي', 'تحضير الأسنان الداعمة', 'أخذ الطبعات والتجربة', 'التركيب والضبط', 'مراقبة لاحقة'],
    },
    duration: { fr: 'Plusieurs séances réparties sur quelques semaines.', ar: 'عدة جلسات موزّعة على بضعة أسابيع.' },
    before: { fr: ['Prévoir plusieurs rendez-vous rapprochés', 'Traiter caries et gencives au préalable'], ar: ['برمجة عدة مواعيد متقاربة', 'علاج التسوّس واللثة مسبقاً'] },
    after: { fr: ['Période d’adaptation normale de quelques jours', 'Nettoyage quotidien indispensable', 'Contrôles réguliers recommandés'], ar: ['فترة تأقلم طبيعية لبضعة أيام', 'التنظيف اليومي ضروري', 'يُنصح بالمراقبة الدورية'] },
    faq: [
      { q: { fr: 'Fixe ou amovible ?', ar: 'ثابتة أم متحركة؟' }, a: { fr: 'Cela dépend du nombre de dents absentes, de l’état de l’os et de votre situation. Les deux options sont expliquées en consultation.', ar: 'يتعلق بعدد الأسنان المفقودة وحالة العظم ووضعك. يُشرح الخياران أثناء الاستشارة.' } },
    ],
  },
  {
    slug: 'orthodontie-gouttieres',
    branch: 'dental',
    img: 'service-orthodontie',
    title: { fr: 'Orthodontie & gouttières', ar: 'تقويم الأسنان والقوالب الشفافة' },
    lead: {
      fr: 'Correction de l’alignement des dents et de l’occlusion, avec un plan de traitement établi après bilan.',
      ar: 'تصحيح اصطفاف الأسنان والإطباق، بخطة علاج تُوضع بعد التقييم.',
    },
    what: {
      fr: 'L’orthodontie corrige la position des dents et les rapports entre les mâchoires. Selon le cas, elle utilise un appareil fixe ou des gouttières. Le bilan initial (photos, empreintes, radiographies) détermine la faisabilité et la durée.',
      ar: 'التقويم يصحّح وضعية الأسنان وعلاقة الفكّين. حسب الحالة يُستعمل جهاز ثابت أو قوالب شفافة. التقييم الأولي (صور، طبعات، أشعة) يحدّد الإمكانية والمدة.',
    },
    forWhom: {
      fr: ['Dents chevauchées ou espacées', 'Décalage de mâchoire', 'Récidive après un ancien traitement'],
      ar: ['أسنان متراكبة أو متباعدة', 'اختلاف في إطباق الفكّين', 'انتكاسة بعد علاج سابق'],
    },
    caution: {
      fr: ['Caries ou gencives à traiter avant de commencer', 'Traitement long nécessitant assiduité aux contrôles', 'Tranches d’âge prises en charge : ' + '[À CONFIRMER]'],
      ar: ['علاج التسوّس واللثة قبل البدء ضروري', 'علاج طويل يتطلب الالتزام بالمواعيد', 'الفئات العمرية المستقبَلة: [بانتظار التأكيد]'],
    },
    steps: {
      fr: ['Consultation et bilan orthodontique', 'Présentation du plan et de la durée estimée', 'Pose de l’appareil ou remise des gouttières', 'Contrôles réguliers', 'Phase de contention'],
      ar: ['استشارة وتقييم تقويمي', 'عرض الخطة والمدة التقديرية', 'تركيب الجهاز أو تسليم القوالب', 'مراقبة دورية', 'مرحلة التثبيت'],
    },
    duration: { fr: 'Traitement de plusieurs mois, avec des contrôles espacés de 4 à 8 semaines.', ar: 'علاج يمتد أشهراً، مع مواعيد مراقبة كل 4 إلى 8 أسابيع.' },
    before: { fr: ['Prévoir une séance de bilan dédiée', 'Assainissement bucco-dentaire préalable'], ar: ['برمجة جلسة تقييم مستقلة', 'تنظيف وعلاج فموي تمهيدي'] },
    after: { fr: ['Gêne les premiers jours après chaque activation', 'Hygiène renforcée pendant tout le traitement', 'Port de la contention indispensable à la fin'], ar: ['انزعاج في الأيام الأولى بعد كل تعديل', 'نظافة مشددة طوال فترة العلاج', 'ارتداء المثبّت ضروري في النهاية'] },
    faq: [
      { q: { fr: 'Les gouttières conviennent-elles à tous les cas ?', ar: 'هل القوالب الشفافة تناسب كل الحالات؟' }, a: { fr: 'Non. Certaines situations nécessitent un appareil fixe. Le bilan initial permet de trancher.', ar: 'لا. بعض الحالات تحتاج جهازاً ثابتاً. التقييم الأولي يحدد ذلك.' } },
    ],
  },
  {
    slug: 'chirurgie-extraction',
    branch: 'dental',
    img: 'service-chirurgie',
    title: { fr: 'Chirurgie & extraction', ar: 'الجراحة والقلع' },
    lead: {
      fr: 'Extractions, dents de sagesse et petits actes chirurgicaux, réalisés sous anesthésie locale avec un protocole d’hygiène strict.',
      ar: 'قلع الأسنان، أضراس العقل وإجراءات جراحية صغيرة، تحت تخدير موضعي وبروتوكول تعقيم صارم.',
    },
    what: {
      fr: 'L’extraction est envisagée lorsqu’une dent ne peut plus être conservée ou lorsqu’elle gêne les dents voisines, comme certaines dents de sagesse. L’intervention est planifiée après examen clinique et radiographique.',
      ar: 'يُلجأ إلى القلع عندما يتعذّر الحفاظ على السن أو عندما يضايق الأسنان المجاورة، كبعض أضراس العقل. يُخطَّط للتدخل بعد فحص سريري وإشعاعي.',
    },
    forWhom: {
      fr: ['Dent de sagesse incluse ou douloureuse', 'Dent non conservable', 'Infection répétée autour d’une dent'],
      ar: ['ضرس عقل منطمر أو مؤلم', 'سن لا يمكن الحفاظ عليه', 'التهابات متكررة حول سن'],
    },
    caution: {
      fr: ['Anticoagulants ou trouble de la coagulation', 'Diabète non équilibré', 'Grossesse', 'Certains traitements osseux : à signaler impérativement'],
      ar: ['مميّعات الدم أو اضطراب في التخثر', 'سكري غير متوازن', 'الحمل', 'بعض أدوية العظام: يجب الإخبار بها إلزامياً'],
    },
    steps: {
      fr: ['Radiographie et évaluation du risque', 'Explication du déroulement et du post-opératoire', 'Anesthésie locale', 'Intervention et suture si nécessaire', 'Consultation de contrôle'],
      ar: ['أشعة وتقييم المخاطر', 'شرح سير العملية وما بعدها', 'تخدير موضعي', 'التدخل والخياطة عند الحاجة', 'موعد مراقبة'],
    },
    duration: { fr: 'De 20 à 60 minutes selon la difficulté.', ar: 'من 20 إلى 60 دقيقة حسب الصعوبة.' },
    before: { fr: ['Ne pas venir à jeun', 'Signaler tous vos médicaments', 'Prévoir un accompagnement si vous êtes anxieux'], ar: ['عدم الحضور على معدة فارغة', 'أخبر الطبيبة بكل الأدوية المستعملة', 'يمكن أن يرافقك أحد إن شعرت بالقلق'] },
    after: {
      fr: ['Mordre la compresse selon la durée indiquée', 'Ne pas rincer ni cracher les premières heures', 'Alimentation froide et molle le premier jour', 'Éviter tabac et effort physique 48 h', 'Consulter en cas de saignement ou de douleur qui augmente'],
      ar: ['العض على الشاش للمدة المحددة', 'تجنّب المضمضة والبصق في الساعات الأولى', 'أكل بارد وليّن في اليوم الأول', 'تجنّب التدخين والمجهود 48 ساعة', 'راجع العيادة عند نزيف أو ألم متزايد'],
    },
    faq: [
      { q: { fr: 'Vais-je avoir mal après ?', ar: 'هل سأتألم بعدها؟' }, a: { fr: 'Une douleur modérée est fréquente pendant 2 à 3 jours et se contrôle avec le traitement prescrit.', ar: 'ألم متوسط شائع لمدة 2 إلى 3 أيام ويُضبط بالعلاج الموصوف.' } },
    ],
  },
  {
    slug: 'implantologie',
    branch: 'dental',
    img: 'service-implantologie',
    title: { fr: 'Implantologie', ar: 'زراعة الأسنان' },
    lead: {
      fr: 'Remplacement d’une dent absente par une racine artificielle, après évaluation de l’os et de l’état bucco-dentaire.',
      ar: 'تعويض سن مفقود بجذر اصطناعي، بعد تقييم العظم وحالة الفم.',
    },
    what: {
      fr: 'L’implant est une racine en titane placée dans l’os, sur laquelle une couronne est fixée après cicatrisation. Le traitement se déroule en plusieurs étapes réparties sur quelques mois.',
      ar: 'الزرعة جذر من التيتانيوم يُوضع في العظم، ويُثبَّت عليه تاج بعد الالتئام. يمرّ العلاج بعدة مراحل موزّعة على أشهر.',
    },
    forWhom: {
      fr: ['Une ou plusieurs dents absentes', 'Refus ou inconfort d’une prothèse amovible', 'Volume osseux suffisant ou reconstructible'],
      ar: ['سن أو عدة أسنان مفقودة', 'رفض أو انزعاج من التركيبة المتحركة', 'حجم عظمي كافٍ أو قابل للترميم'],
    },
    caution: {
      fr: ['Tabagisme important', 'Diabète non équilibré', 'Maladie de gencive active', 'Certains traitements osseux ou immunosuppresseurs'],
      ar: ['تدخين كثيف', 'سكري غير متوازن', 'التهاب لثة نشط', 'بعض أدوية العظام أو مثبّطات المناعة'],
    },
    steps: {
      fr: ['Bilan clinique et imagerie', 'Plan de traitement et devis', 'Pose de l’implant', 'Période de cicatrisation', 'Pose de la couronne et contrôles'],
      ar: ['تقييم سريري وتصوير', 'خطة علاج وتقدير التكلفة', 'وضع الزرعة', 'فترة الالتئام', 'تركيب التاج والمراقبة'],
    },
    duration: { fr: 'Plusieurs mois entre la pose et la couronne définitive.', ar: 'عدة أشهر بين وضع الزرعة والتاج النهائي.' },
    before: { fr: ['Assainissement complet de la bouche', 'Arrêt ou réduction du tabac fortement conseillé'], ar: ['تنظيف وعلاج كامل للفم', 'يُنصح بشدة بالتوقف عن التدخين أو تقليله'] },
    after: { fr: ['Suivi rigoureux des consignes post-opératoires', 'Hygiène quotidienne et contrôles réguliers à vie'], ar: ['الالتزام الدقيق بتعليمات ما بعد العملية', 'نظافة يومية ومراقبة دورية مدى الحياة'] },
    faq: [
      { q: { fr: 'Est-ce douloureux ?', ar: 'هل الزراعة مؤلمة؟' }, a: { fr: 'La pose se fait sous anesthésie locale. Les suites sont généralement comparables à celles d’une extraction simple.', ar: 'تتم تحت تخدير موضعي، وما بعدها غالباً مشابه لقلع بسيط.' } },
    ],
  },

  /* ─────────────── ESTHÉTIQUE & NUTRITION — Aura ─────────────── */
  {
    slug: 'diagnostic-de-peau',
    branch: 'aesthetic',
    img: 'service-diagnostic-peau',
    title: { fr: 'Consultation & diagnostic de peau', ar: 'استشارة وتشخيص البشرة' },
    lead: {
      fr: 'Le point de départ de tout protocole : comprendre votre peau avant de proposer un soin.',
      ar: 'نقطة البداية لأي بروتوكول: فهم بشرتك قبل اقتراح أي علاج.',
    },
    what: {
      fr: 'La consultation permet d’analyser le type de peau, l’hydratation, la sensibilité, les taches et les cicatrices, puis de définir un plan progressif : routine à domicile d’abord, soins au cabinet ensuite si nécessaire.',
      ar: 'الاستشارة تسمح بتحليل نوع البشرة، الترطيب، الحساسية، البقع والندبات، ثم وضع خطة تدريجية: روتين منزلي أولاً، ثم جلسات في العيادة عند الحاجة.',
    },
    forWhom: {
      fr: ['Première démarche esthétique', 'Peau réactive ou problème persistant', 'Hésitation entre plusieurs soins', 'Préparation d’un protocole personnalisé'],
      ar: ['أول خطوة تجميلية', 'بشرة حساسة أو مشكل مستمر', 'تردد بين عدة علاجات', 'تحضير بروتوكول شخصي'],
    },
    caution: {
      fr: ['Lésion cutanée suspecte : orientation vers un avis spécialisé', 'Traitement dermatologique en cours à signaler'],
      ar: ['آفة جلدية مشبوهة: يُوجَّه المريض لرأي مختص', 'أي علاج جلدي جارٍ يجب ذكره'],
    },
    steps: {
      fr: ['Entretien sur vos antécédents et vos attentes', 'Examen de la peau', 'Explication des options et de leurs limites', 'Proposition d’un plan par étapes', 'Suivi et réévaluation'],
      ar: ['حوار حول سوابقك وتوقعاتك', 'فحص البشرة', 'شرح الخيارات وحدودها', 'اقتراح خطة على مراحل', 'متابعة وإعادة تقييم'],
    },
    duration: { fr: 'Environ 30 minutes.', ar: 'حوالي 30 دقيقة.' },
    before: { fr: ['Venir sans maquillage si possible', 'Apporter la liste de vos produits actuels'], ar: ['الحضور دون مكياج إن أمكن', 'إحضار قائمة المنتجات المستعملة حالياً'] },
    after: { fr: ['Mise en place progressive de la routine conseillée', 'Protection solaire quotidienne'], ar: ['تطبيق تدريجي للروتين الموصى به', 'حماية شمسية يومية'] },
    faq: [
      { q: { fr: 'Un soin est-il réalisé le jour même ?', ar: 'هل تُجرى الجلسة في نفس اليوم؟' }, a: { fr: 'Pas systématiquement. Certains protocoles nécessitent une préparation de la peau.', ar: 'ليس دائماً. بعض البروتوكولات تتطلب تحضير البشرة مسبقاً.' } },
    ],
  },
  {
    slug: 'soins-du-visage',
    branch: 'aesthetic',
    img: 'service-soins-visage',
    title: { fr: 'Soins du visage', ar: 'العناية بالوجه' },
    lead: {
      fr: 'Protocoles de nettoyage, d’hydratation et de renouvellement cutané, choisis selon le diagnostic.',
      ar: 'بروتوكولات تنظيف، ترطيب وتجديد البشرة، تُختار حسب التشخيص.',
    },
    what: {
      fr: 'Les soins du visage regroupent plusieurs protocoles complémentaires : nettoyage en profondeur, soins hydratants, exfoliation contrôlée et techniques de stimulation cutanée. Le protocole exact et les appareils utilisés sont précisés en consultation.',
      ar: 'العناية بالوجه تشمل بروتوكولات متكاملة: تنظيف عميق، جلسات ترطيب، تقشير مضبوط وتقنيات تحفيز البشرة. يُحدَّد البروتوكول والأجهزة المستعملة أثناء الاستشارة.',
    },
    forWhom: {
      fr: ['Teint terne ou irrégulier', 'Pores dilatés, imperfections', 'Peau déshydratée', 'Entretien régulier de la peau'],
      ar: ['بشرة باهتة أو غير متجانسة', 'مسام واسعة وشوائب', 'بشرة جافة', 'صيانة دورية للبشرة'],
    },
    caution: {
      fr: ['Poussée inflammatoire ou infection cutanée en cours', 'Exposition solaire intense récente', 'Grossesse et allaitement selon le protocole', 'Certains traitements dermatologiques récents'],
      ar: ['التهاب نشط أو عدوى جلدية', 'تعرّض شمسي مكثف حديث', 'الحمل والرضاعة حسب البروتوكول', 'بعض العلاجات الجلدية الحديثة'],
    },
    steps: {
      fr: ['Diagnostic préalable', 'Préparation de la peau', 'Réalisation du protocole', 'Application de soins apaisants et protection solaire', 'Conseils de routine à domicile'],
      ar: ['تشخيص مسبق', 'تحضير البشرة', 'تنفيذ البروتوكول', 'وضع مستحضرات مهدّئة وحماية شمسية', 'نصائح الروتين المنزلي'],
    },
    duration: { fr: 'De 45 à 75 minutes selon le protocole.', ar: 'من 45 إلى 75 دقيقة حسب البروتوكول.' },
    before: { fr: ['Arrêter les exfoliants 3 à 5 jours avant', 'Éviter l’exposition solaire la semaine précédente'], ar: ['إيقاف مقشّرات البشرة من 3 إلى 5 أيام قبل الجلسة', 'تجنّب الشمس في الأسبوع السابق'] },
    after: { fr: ['Rougeur légère possible pendant quelques heures', 'Protection solaire indispensable', 'Éviter hammam et sport intense 24 à 48 h'], ar: ['احمرار خفيف ممكن لبضع ساعات', 'الحماية الشمسية ضرورية', 'تجنّب الحمّام والرياضة العنيفة 24 إلى 48 ساعة'] },
    faq: [
      { q: { fr: 'Combien de séances faut-il ?', ar: 'كم جلسة تلزم؟' }, a: { fr: 'Cela dépend de l’objectif. Une cure espacée est souvent proposée plutôt qu’une séance isolée.', ar: 'حسب الهدف. غالباً تُقترح جلسات متباعدة بدل جلسة واحدة.' } },
    ],
  },
  {
    slug: 'injections-esthetiques',
    branch: 'aesthetic',
    img: 'service-injections',
    title: { fr: 'Injections esthétiques', ar: 'الحقن التجميلي' },
    lead: {
      fr: 'Actes médicaux encadrés, proposés uniquement après consultation et évaluation des indications et contre-indications.',
      ar: 'إجراءات طبية مؤطَّرة، تُقترح فقط بعد استشارة وتقييم دواعي الاستعمال وموانعه.',
    },
    what: {
      fr: 'Les injections esthétiques regroupent différentes familles de produits et d’indications. Les produits utilisés, les zones traitées et le cadre de pratique sont précisés en consultation. Aucun acte n’est réalisé sans examen préalable et information complète.',
      ar: 'الحقن التجميلي يشمل عائلات مختلفة من المنتجات والاستطبابات. تُحدَّد المنتجات المستعملة والمناطق المعالجة وإطار الممارسة أثناء الاستشارة. لا يُجرى أي إجراء دون فحص مسبق وإعلام كامل.',
    },
    forWhom: {
      fr: ['Demande esthétique précise et réaliste', 'Après un diagnostic et une discussion des alternatives'],
      ar: ['طلب تجميلي محدد وواقعي', 'بعد التشخيص ومناقشة البدائل'],
    },
    caution: {
      fr: ['Grossesse et allaitement', 'Infection ou lésion active sur la zone', 'Maladie auto-immune ou trouble de la coagulation', 'Antécédent de réaction à un produit injectable'],
      ar: ['الحمل والرضاعة', 'عدوى أو آفة نشطة في المنطقة', 'مرض مناعي ذاتي أو اضطراب تخثر', 'سابقة تحسّس من منتج قابل للحقن'],
    },
    steps: {
      fr: ['Consultation, photos et information', 'Recueil du consentement', 'Réalisation de l’acte', 'Consignes post-acte', 'Contrôle à distance'],
      ar: ['استشارة، صور وإعلام', 'أخذ الموافقة', 'تنفيذ الإجراء', 'تعليمات ما بعد الجلسة', 'موعد مراقبة'],
    },
    duration: { fr: 'Séance courte, précisée selon l’indication.', ar: 'جلسة قصيرة، تُحدَّد مدتها حسب الحالة.' },
    before: { fr: ['Éviter aspirine et anti-inflammatoires si votre médecin l’autorise', 'Signaler tout traitement en cours'], ar: ['تجنّب الأسبرين ومضادات الالتهاب إذا سمح بذلك الطبيب المعالج', 'أخبر الطبيبة بأي علاج جارٍ'] },
    after: { fr: ['Rougeur ou petit hématome possible', 'Éviter chaleur, sport et pression sur la zone 24 à 48 h', 'Contacter le cabinet en cas de signe inhabituel'], ar: ['احمرار أو كدمة صغيرة ممكنة', 'تجنّب الحرارة والرياضة والضغط على المنطقة 24 إلى 48 ساعة', 'الاتصال بالعيادة عند أي علامة غير معتادة'] },
    faq: [
      { q: { fr: 'Le résultat est-il immédiat ?', ar: 'هل النتيجة فورية؟' }, a: { fr: 'Cela dépend de l’indication. Le délai d’apparition et la durée sont expliqués en consultation.', ar: 'يتعلق بنوع الإجراء. تُشرح مدة ظهور النتيجة وثباتها أثناء الاستشارة.' } },
    ],
    pending: true,
  },
  {
    slug: 'taches-et-cicatrices',
    branch: 'aesthetic',
    img: 'service-taches-cicatrices',
    title: { fr: 'Taches, cicatrices & texture', ar: 'البقع والندبات وملمس البشرة' },
    lead: {
      fr: 'Prise en charge progressive des irrégularités de teint et de texture, sans promesse de disparition totale.',
      ar: 'تكفّل تدريجي باختلاف لون البشرة وملمسها، دون وعد بزوال كامل.',
    },
    what: {
      fr: 'Les taches pigmentaires et les cicatrices répondent différemment selon leur origine, leur ancienneté et le type de peau. La prise en charge associe une routine à domicile, une protection solaire stricte et, selon le cas, des soins au cabinet.',
      ar: 'البقع الصبغية والندبات تستجيب بشكل مختلف حسب سببها وقِدمها ونوع البشرة. التكفّل يجمع بين روتين منزلي، حماية شمسية صارمة، وجلسات في العيادة حسب الحالة.',
    },
    forWhom: {
      fr: ['Taches post-inflammatoires', 'Cicatrices d’acné', 'Irrégularités de texture'],
      ar: ['بقع بعد الالتهاب', 'ندبات حب الشباب', 'اختلاف في ملمس البشرة'],
    },
    caution: {
      fr: ['Acné active non contrôlée', 'Peau bronzée ou exposition récente', 'Tendance aux cicatrices chéloïdes', 'Grossesse selon le protocole'],
      ar: ['حب شباب نشط غير مضبوط', 'بشرة مسمرّة أو تعرّض شمسي حديث', 'ميل لتكوّن الندبات الجدرية', 'الحمل حسب البروتوكول'],
    },
    steps: {
      fr: ['Diagnostic et photos de référence', 'Préparation de la peau plusieurs semaines si nécessaire', 'Protocole en plusieurs séances', 'Réévaluation à mi-parcours', 'Entretien'],
      ar: ['تشخيص وصور مرجعية', 'تحضير البشرة عدة أسابيع عند الحاجة', 'بروتوكول على عدة جلسات', 'إعادة تقييم في منتصف المسار', 'صيانة'],
    },
    duration: { fr: 'Protocole étalé sur plusieurs semaines à plusieurs mois.', ar: 'بروتوكول ممتد من عدة أسابيع إلى عدة أشهر.' },
    before: { fr: ['Protection solaire stricte avant de commencer', 'Arrêt des actifs irritants selon les consignes'], ar: ['حماية شمسية صارمة قبل البدء', 'إيقاف المواد المهيّجة حسب التعليمات'] },
    after: { fr: ['Éviter le soleil entre les séances', 'Ne pas gratter les zones traitées', 'Patience : l’amélioration est progressive'], ar: ['تجنّب الشمس بين الجلسات', 'عدم حكّ المناطق المعالجة', 'الصبر: التحسّن تدريجي'] },
    faq: [
      { q: { fr: 'Les taches disparaissent-elles complètement ?', ar: 'هل تختفي البقع نهائياً؟' }, a: { fr: 'Pas toujours. L’objectif réaliste est une atténuation, variable selon l’origine de la tache et le respect de la protection solaire.', ar: 'ليس دائماً. الهدف الواقعي هو التخفيف، ويختلف حسب سبب البقعة والالتزام بالحماية الشمسية.' } },
    ],
  },
  {
    slug: 'silhouette',
    branch: 'aesthetic',
    img: 'service-silhouette',
    title: { fr: 'Silhouette', ar: 'نحت القوام' },
    lead: {
      fr: 'Accompagnement non invasif de la silhouette, en complément d’un suivi nutritionnel et d’une activité physique.',
      ar: 'مرافقة غير جراحية للقوام، مكمّلة لمتابعة غذائية ونشاط بدني.',
    },
    what: {
      fr: 'Les techniques proposées visent à accompagner un changement global. Elles ne remplacent ni une perte de poids progressive ni une activité physique régulière, et ne constituent pas une alternative à la chirurgie.',
      ar: 'التقنيات المقترحة ترافق تغييراً شاملاً في نمط الحياة. لا تعوّض إنقاص الوزن التدريجي ولا النشاط البدني المنتظم، وليست بديلاً عن الجراحة.',
    },
    forWhom: {
      fr: ['Zones localisées résistantes malgré une hygiène de vie stable', 'Démarche accompagnée d’un suivi nutritionnel'],
      ar: ['مناطق موضعية مقاومة رغم انتظام نمط الحياة', 'مسار مصحوب بمتابعة غذائية'],
    },
    caution: {
      fr: ['Grossesse et allaitement', 'Pathologie chronique non stabilisée', 'Attentes de résultat de type chirurgical'],
      ar: ['الحمل والرضاعة', 'مرض مزمن غير مستقر', 'توقّع نتيجة بمستوى الجراحة'],
    },
    steps: {
      fr: ['Bilan et mesures de départ', 'Définition d’objectifs réalistes', 'Séances programmées', 'Suivi nutritionnel associé', 'Bilan de fin de cure'],
      ar: ['تقييم وقياسات أولية', 'تحديد أهداف واقعية', 'جلسات مبرمجة', 'متابعة غذائية مرافقة', 'تقييم نهاية البرنامج'],
    },
    duration: { fr: 'Cure de plusieurs séances, calendrier défini en consultation.', ar: 'برنامج من عدة جلسات، يُحدَّد جدوله في الاستشارة.' },
    before: { fr: ['Boire suffisamment d’eau', 'Éviter un repas lourd juste avant la séance'], ar: ['شرب كمية كافية من الماء', 'تجنّب وجبة ثقيلة قبل الجلسة مباشرة'] },
    after: { fr: ['Hydratation et marche recommandées', 'Maintien des habitudes alimentaires convenues'], ar: ['يُنصح بالترطيب والمشي', 'الحفاظ على العادات الغذائية المتفق عليها'] },
    faq: [
      { q: { fr: 'Est-ce une alternative à un régime ?', ar: 'هل هي بديل عن الحمية؟' }, a: { fr: 'Non. Ces techniques accompagnent une démarche globale, elles ne la remplacent pas.', ar: 'لا. هذه التقنيات ترافق مساراً شاملاً ولا تعوّضه.' } },
    ],
  },
  {
    slug: 'nutrition',
    branch: 'aesthetic',
    img: 'service-nutrition',
    title: { fr: 'Consultation & suivi nutritionnel', ar: 'استشارة ومتابعة غذائية' },
    lead: {
      fr: 'Un accompagnement alimentaire personnalisé, construit à partir de vos habitudes réelles et de vos objectifs.',
      ar: 'مرافقة غذائية شخصية، مبنية على عاداتك الحقيقية وأهدافك.',
    },
    what: {
      fr: 'La consultation nutritionnelle commence par un bilan des habitudes, du rythme de vie et des antécédents. Un plan progressif est ensuite construit, puis ajusté lors des séances de suivi.',
      ar: 'تبدأ الاستشارة الغذائية بتقييم العادات ونمط الحياة والسوابق الصحية. ثم تُبنى خطة تدريجية تُعدَّل خلال جلسات المتابعة.',
    },
    forWhom: {
      fr: ['Objectif de perte ou de prise de poids', 'Rééquilibrage alimentaire', 'Accompagnement d’un protocole esthétique', 'Meilleure organisation des repas'],
      ar: ['هدف إنقاص أو زيادة الوزن', 'إعادة توازن غذائي', 'مرافقة بروتوكول تجميلي', 'تنظيم أفضل للوجبات'],
    },
    caution: {
      fr: ['Pathologie nécessitant une prise en charge spécialisée : orientation adaptée', 'Trouble du comportement alimentaire : accompagnement pluridisciplinaire'],
      ar: ['مرض يستدعي تكفّلاً مختصاً: يُوجَّه المريض للجهة المناسبة', 'اضطراب في السلوك الغذائي: مرافقة متعددة الاختصاصات'],
    },
    steps: {
      fr: ['Bilan initial et mesures', 'Analyse des habitudes', 'Plan alimentaire personnalisé', 'Séances de suivi et ajustements', 'Phase de stabilisation'],
      ar: ['تقييم أولي وقياسات', 'تحليل العادات', 'خطة غذائية شخصية', 'جلسات متابعة وتعديل', 'مرحلة التثبيت'],
    },
    duration: { fr: 'Première consultation d’environ 45 minutes, suivis plus courts.', ar: 'الاستشارة الأولى حوالي 45 دقيقة، والمتابعات أقصر.' },
    before: { fr: ['Noter ce que vous mangez pendant 3 jours avant la consultation', 'Apporter vos analyses récentes si vous en avez'], ar: ['تدوين الوجبات خلال 3 أيام قبل الاستشارة', 'إحضار التحاليل الأخيرة إن توفّرت'] },
    after: { fr: ['Application progressive du plan', 'Respect des rendez-vous de suivi'], ar: ['تطبيق تدريجي للخطة', 'الالتزام بمواعيد المتابعة'] },
    faq: [
      { q: { fr: 'Faut-il suivre un régime strict ?', ar: 'هل يجب اتّباع حمية صارمة؟' }, a: { fr: 'Non. L’objectif est un changement durable, construit à partir de vos habitudes.', ar: 'لا. الهدف تغيير مستدام مبني على عاداتك الحالية.' } },
    ],
  },
];

export const dentalServices = services.filter((s) => s.branch === 'dental');
export const aestheticServices = services.filter((s) => s.branch === 'aesthetic');
