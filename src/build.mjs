/**
 * Générateur du site Dr Tamali Rayane.
 *   node src/build.mjs      → écrit le site statique dans dist/
 *
 * Le même contenu produit la version française et la version arabe (RTL),
 * ce qui évite toute dérive entre les deux langues.
 */
import { mkdir, writeFile, readFile, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { brand, clinics, clinicById, nav, footerNav, ui, TODO, TODO_AR } from './data/site.mjs';
import { services, dentalServices, aestheticServices } from './data/services.mjs';
import { images, imageById, SHARED_STYLE, SHARED_NEGATIVE } from './data/images.mjs';
import { icons } from './icons.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const LANGS = ['fr', 'ar'];

/** Base des URLs absolues exigées par les réseaux sociaux (og:image),
 *  le canonical, le sitemap et les données structurées.
 *  Surchargeable au build : SITE_URL=https://mondomaine.dz node src/build.mjs
 *  TODO : renseigner le domaine définitif avant la mise en ligne. */
const SITE_URL = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');

/* ── Helpers ─────────────────────────────────────────────────── */
const t = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] ?? v.fr : v);
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const isRtl = (lang) => lang === 'ar';

/** Chemin vers la racine du site depuis une page de profondeur donnée. */
const up = (depth) => (depth === 0 ? './' : '../'.repeat(depth));

/** Lien vers une page du site. */
const link = (depth, lang, slug = '') => `${up(depth)}${lang}/${slug ? slug + '/' : ''}`;
const asset = (depth, p) => `${up(depth)}assets/${p}`;

const telHref = (n) => 'tel:' + n.replace(/[^\d+]/g, '').replace(/^0/, '+213');

/* ── Emplacement image ───────────────────────────────────────── */
function media(depth, id, lang, { className = '', priority = false, reveal = false, delay = 0 } = {}) {
  const img = imageById[id];
  if (!img) throw new Error(`Image inconnue : ${id}`);
  const [rw, rh] = (img.ratio || '3/2').split('/').map(Number);
  // Dimensions intrinsèques réelles : le navigateur réserve la place
  // avant le chargement, ce qui évite tout décalage de mise en page.
  const w = 1600;
  const h = Math.round((w * rh) / rw);
  const alt = esc(t(img.alt, lang));
  const style = `--ar:${rw} / ${rh}${delay ? `;--d:${delay}ms` : ''}`;
  return `<figure class="media ${className}" style="${style}"${reveal ? ' data-reveal' : ''}>
      <img src="${asset(depth, 'img/' + id + '.jpg')}" alt="${alt}" width="${w}" height="${h}"
           ${priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>
      <figcaption class="media__ph">
        ${icons.image}
        <code>${id}.jpg</code>
        <span>${esc(t(img.alt, lang))}</span>
      </figcaption>
    </figure>`;
}

/* ── Layout ──────────────────────────────────────────────────── */
function layout({ lang, depth, slug, title, description, body, bodyClass = '', jsonLd = [] }) {
  const rtl = isRtl(lang);
  const other = lang === 'fr' ? 'ar' : 'fr';
  const fonts = rtl
    ? 'https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap';

  const navHtml = nav
    .map(
      (n) =>
        `<a href="${link(depth, lang, n.slug)}"${n.slug === slug ? ' aria-current="page"' : ''}>${esc(t(n.label, lang))}</a>`
    )
    .join('');

  const drawerHtml = nav
    .concat(footerNav.slice(0, 1))
    .map(
      (n) =>
        `<a class="drawer__link" href="${link(depth, lang, n.slug)}" data-drawer-close>${esc(t(n.label, lang))}${icons.arrow}</a>`
    )
    .join('');

  const config = {
    lang,
    waMain: brand.whatsappMain,
    waDental: clinicById['crystal-smile'].whatsapp,
    waAesthetic: clinicById['aura-esthetique'].whatsapp,
    t: {
      recapBranch: t({ fr: 'Spécialité', ar: 'التخصص' }, lang),
      recapReason: t({ fr: 'Motif', ar: 'سبب الزيارة' }, lang),
      recapClinic: t({ fr: 'Cabinet', ar: 'العيادة' }, lang),
      recapName: t({ fr: 'Nom', ar: 'الاسم' }, lang),
      recapPhone: t({ fr: 'Téléphone', ar: 'الهاتف' }, lang),
      recapWhen: t({ fr: 'Créneau souhaité', ar: 'الوقت المفضل' }, lang),
      recapNote: t({ fr: 'Note', ar: 'ملاحظة' }, lang),
      waIntroDental: t(
        {
          fr: 'Bonjour, je souhaite demander un rendez-vous à Clinic Crystal Smile.',
          ar: 'السلام عليكم، أرغب في طلب موعد في Clinic Crystal Smile.',
        },
        lang
      ),
      waIntroAesthetic: t(
        {
          fr: 'Bonjour, je souhaite demander une consultation au cabinet Aura.',
          ar: 'السلام عليكم، أرغب في طلب استشارة في عيادة Aura.',
        },
        lang
      ),
    },
  };

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: 'Clinic Crystal Smile',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue Dzair',
        addressLocality: 'Koléa',
        addressRegion: 'Tipaza',
        addressCountry: 'DZ',
      },
      telephone: brand.phoneMainTel,
      url: `${SITE_URL}/${lang}/cabinets/`,
      image: `${SITE_URL}/assets/img/cabinet-crystal-facade.jpg`,
      medicalSpecialty: 'Dentistry',
    },
    ...jsonLd,
  ];

  return `<!doctype html>
<html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex, nofollow"><!-- TODO : retirer à la mise en ligne définitive -->
<meta name="theme-color" content="#512A55">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE_URL}/assets/img/og-cover.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${SITE_URL}/${lang}/${slug ? slug + '/' : ''}">
<meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'ar_DZ'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${SITE_URL}/${lang}/${slug ? slug + '/' : ''}">
<link rel="alternate" hreflang="${other}" href="${SITE_URL}/${other}/${slug ? slug + '/' : ''}">
<link rel="alternate" hreflang="${lang}" href="${SITE_URL}/${lang}/${slug ? slug + '/' : ''}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/fr/${slug ? slug + '/' : ''}">
<link rel="icon" href="${asset(depth, 'favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<link rel="stylesheet" href="${asset(depth, 'styles.css')}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script>document.documentElement.className+=' js';</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${t({ fr: 'Aller au contenu', ar: 'انتقل إلى المحتوى' }, lang)}</a>

<header class="header">
  <div class="wrap header__bar">
    <a class="brand" href="${link(depth, lang)}">
      ${logoMark()}
      <span>
        <span class="brand__name">${lang === 'ar' ? brand.nameAr : brand.name}</span>
        <span class="brand__sub">${esc(t(brand.tagline, lang))}</span>
      </span>
    </a>
    <nav class="nav" aria-label="${t({ fr: 'Navigation principale', ar: 'التنقل الرئيسي' }, lang)}">${navHtml}</nav>
    <div class="header__actions">
      <a class="langswitch" href="${link(depth, other, slug)}" hreflang="${other}">${esc(t(ui.langSwitch, lang))}</a>
      <a class="btn btn--gold btn--book-desktop" href="${link(depth, lang, 'rendez-vous')}" data-track="start_booking">${esc(t(ui.book, lang))}</a>
      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(t(ui.menu, lang))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" data-open="false">
  <div class="drawer__top">
    <span class="brand__name">${lang === 'ar' ? brand.nameAr : brand.name}</span>
    <button class="burger" type="button" data-drawer-close aria-label="${esc(t(ui.close, lang))}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </div>
  ${drawerHtml}
  <a class="btn btn--gold btn--block" href="${link(depth, lang, 'rendez-vous')}" data-drawer-close>${esc(t(ui.book, lang))}</a>
</div>

<main id="main">
${body}
</main>

${footer(depth, lang)}
${mobileBar(depth, lang)}
${whatsappSheet(depth, lang)}

<script>window.SITE_CONFIG=${JSON.stringify(config)};</script>
<script src="${asset(depth, 'app.js')}" defer></script>
</body>
</html>`;
}

function logoMark() {
  return `<svg class="brand__mark" viewBox="0 0 48 48" role="img" aria-label="Dr Tamali Rayane">
    <circle cx="24" cy="24" r="23" fill="none" stroke="#C7A56A" stroke-width="1.2"/>
    <text x="24" y="27" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="19" font-weight="600" fill="#512A55">TR</text>
    <path d="M14 33c4 3.6 16 3.6 20 0" fill="none" stroke="#316B9A" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;
}

function footer(depth, lang) {
  const c1 = clinicById['crystal-smile'];
  const c2 = clinicById['aura-esthetique'];
  return `<footer class="footer">
  <div class="wrap footer__grid">
    <div>
      <h3>${lang === 'ar' ? brand.nameAr : brand.name}</h3>
      <p class="small">${esc(t(brand.tagline, lang))}<br>${esc(t(brand.city, lang))}</p>
      <div class="social">
        <a href="${brand.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
        <a href="${brand.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icons.facebook}</a>
      </div>
    </div>
    <div>
      <h3>${esc(t(c1.name, lang))}</h3>
      <ul>
        <li>${esc(t(c1.address, lang))}</li>
        <li><a href="${telHref(c1.phones[0])}" data-track="click_call" data-branch="dental">${c1.phones[0]}</a></li>
        <li><a href="${link(depth, lang, 'dentisterie')}">${esc(t({ fr: 'Soins dentaires', ar: 'خدمات الأسنان' }, lang))}</a></li>
      </ul>
    </div>
    <div>
      <h3>${esc(t(c2.name, lang))}</h3>
      <ul>
        <li>${esc(t(c2.address, lang))}</li>
        <li>${esc(lang === 'ar' ? TODO_AR : TODO)}</li>
        <li><a href="${link(depth, lang, 'esthetique-nutrition')}">${esc(t({ fr: 'Soins esthétiques', ar: 'خدمات التجميل' }, lang))}</a></li>
      </ul>
    </div>
    <div>
      <h3>${esc(t({ fr: 'Informations', ar: 'معلومات' }, lang))}</h3>
      <ul>
        ${footerNav.map((n) => `<li><a href="${link(depth, lang, n.slug)}">${esc(t(n.label, lang))}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="wrap footer__bottom">
    <span>© ${new Date().getFullYear()} ${lang === 'ar' ? brand.nameAr : brand.name}</span>
    <span>${esc(t(ui.medicalNotice, lang))}</span>
  </div>
</footer>`;
}

function mobileBar(depth, lang) {
  return `<nav class="mobilebar" aria-label="${t({ fr: 'Actions rapides', ar: 'إجراءات سريعة' }, lang)}">
    <a href="${telHref(brand.phoneMain)}" data-track="click_call">${icons.phone}<span>${esc(t(ui.call, lang))}</span></a>
    <a href="#" id="wa-mobile" data-track="click_whatsapp">${icons.whatsapp}<span>${esc(t(ui.whatsapp, lang))}</span></a>
    <a class="is-primary" href="${link(depth, lang, 'rendez-vous')}" data-track="start_booking">${icons.calendar}<span>${esc(t(ui.bookShort, lang))}</span></a>
  </nav>`;
}

function whatsappSheet(depth, lang) {
  const opts = clinics
    .map((c) => {
      const num = c.whatsapp;
      const msg =
        c.key === 'dental'
          ? t({ fr: 'Bonjour, je souhaite demander un rendez-vous à Clinic Crystal Smile.', ar: 'السلام عليكم، أرغب في طلب موعد في Clinic Crystal Smile.' }, lang)
          : t({ fr: 'Bonjour, je souhaite demander une consultation au cabinet Aura.', ar: 'السلام عليكم، أرغب في طلب استشارة في عيادة Aura.' }, lang);
      return `<a class="opt" href="https://wa.me/${num}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" data-track="click_whatsapp" data-branch="${c.key}">
        <span class="choice__icon" style="background:${c.key === 'dental' ? '#e8f0f6' : '#f1eaf2'};color:${c.key === 'dental' ? '#316b9a' : '#512a55'}">${c.key === 'dental' ? icons.tooth : icons.sparkle}</span>
        <span><strong>${esc(t(c.name, lang))}</strong><span>${esc(t(c.kicker, lang))}</span></span>
      </a>`;
    })
    .join('');

  return `<button class="wa-fab" id="wa-fab" type="button" aria-label="WhatsApp">${icons.whatsapp}</button>
<div class="wa-sheet" id="wa-sheet" data-open="false" role="dialog" aria-modal="true" aria-labelledby="wa-title">
  <div class="wa-sheet__panel">
    <h3 id="wa-title">${esc(t({ fr: 'Quel cabinet souhaitez-vous contacter ?', ar: 'أي عيادة تريد التواصل معها؟' }, lang))}</h3>
    <p>${esc(t({ fr: 'Choisissez la spécialité pour être orienté vers le bon numéro.', ar: 'اختر التخصص لتُوجَّه إلى الرقم المناسب.' }, lang))}</p>
    ${opts}
    <button class="btn btn--ghost btn--block" type="button" data-sheet-close style="margin-top:1rem">${esc(t(ui.close, lang))}</button>
  </div>
</div>`;
}

/* ── Fragments réutilisables ─────────────────────────────────── */
function crumbs(depth, lang, trail) {
  const items = [{ label: t(ui.home, lang), slug: '' }, ...trail];
  return `<nav class="wrap crumbs" aria-label="${t({ fr: "Fil d'Ariane", ar: 'مسار التصفح' }, lang)}">${items
    .map((it, i) =>
      i === items.length - 1
        ? `<span aria-current="page">${esc(it.label)}</span>`
        : `<a href="${link(depth, lang, it.slug)}">${esc(it.label)}</a><span aria-hidden="true">›</span>`
    )
    .join('')}</nav>`;
}

function serviceCard(depth, lang, svc, i = 0) {
  const dental = svc.branch === 'dental';
  return `<a class="card card--${dental ? 'dental' : 'aesthetic'}" href="${link(depth, lang, 'services/' + svc.slug)}" data-track="view_service" data-slug="${svc.slug}" data-reveal style="--d:${(i % 3) * 80}ms">
    <span class="card__icon">${dental ? icons.tooth : icons.sparkle}</span>
    <h3>${esc(t(svc.title, lang))}</h3>
    <p>${esc(t(svc.lead, lang))}</p>
    <span class="card__more">${esc(t(ui.learnMore, lang))}${icons.arrow}</span>
  </a>`;
}

function clinicCard(depth, lang, clinic, i = 0) {
  const dental = clinic.key === 'dental';
  return `<article class="card clinic-card clinic-card--${dental ? 'dental' : 'aesthetic'}" data-reveal style="--d:${i * 110}ms">
    ${media(depth, clinic.img, lang)}
    <div class="clinic-card__body">
      <span class="clinic-card__tag">${dental ? icons.tooth : icons.sparkle}${esc(t(clinic.kicker, lang))}</span>
      <h3>${esc(t(clinic.name, lang))}</h3>
      <p class="muted">${esc(t(clinic.short, lang))}</p>
      <ul>
        <li>${icons.pin}<span>${esc(t(clinic.address, lang))}</span></li>
        <li>${icons.clock}<span>${esc(lang === 'ar' ? TODO_AR : TODO)}</span></li>
      </ul>
      <a class="btn ${dental ? 'btn--blue' : ''} btn--block" href="${link(depth, lang, dental ? 'dentisterie' : 'esthetique-nutrition')}" data-track="select_branch" data-branch="${clinic.key}" style="margin-top:auto">
        ${esc(t(dental ? { fr: 'Découvrir la clinique dentaire', ar: 'اكتشف عيادة الأسنان' } : { fr: 'Découvrir le cabinet esthétique', ar: 'اكتشف عيادة التجميل' }, lang))}
      </a>
    </div>
  </article>`;
}

function ctaBand(depth, lang) {
  return `<section class="section section--plum">
    <div class="wrap" style="text-align:center;max-width:62ch">
      <h2 data-reveal>${esc(t({ fr: 'Vous ne savez pas quel soin choisir ?', ar: 'لا تعرف أي خدمة تختار؟' }, lang))}</h2>
      <p style="margin-block:0.9rem 1.6rem" data-reveal>${esc(t({ fr: 'Commencez par une consultation d’orientation. Nous évaluons votre situation et vous proposons un plan clair, sans engagement.', ar: 'ابدأ باستشارة توجيهية. نقيّم وضعك ونقترح خطة واضحة، دون التزام.' }, lang))}</p>
      <a class="btn btn--gold" href="${link(depth, lang, 'rendez-vous')}" data-track="start_booking" data-reveal style="--d:90ms">${icons.calendar}${esc(t(ui.book, lang))}</a>
    </div>
  </section>`;
}

/* ── Pages ───────────────────────────────────────────────────── */
function pageHome(lang) {
  const depth = 1;
  const body = `
<section class="hero">
  <div class="wrap hero__inner">
    <div>
      <p class="eyebrow" data-reveal="fade">${lang === 'ar' ? brand.nameAr : brand.name} • ${esc(t(brand.city, lang))}</p>
      <h1 data-reveal style="--d:60ms">${esc(t({ fr: 'Votre sourire, votre peau, votre équilibre.', ar: 'ابتسامتك، بشرتك، وتوازنك.' }, lang))}</h1>
      <p class="lead" data-reveal style="--d:130ms">${esc(t({ fr: 'Deux espaces de soins à Koléa pour prendre soin de votre sourire, de votre peau et de votre bien-être, avec écoute, précision et suivi.', ar: 'فضاءان للعلاج بالقليعة للاعتناء بابتسامتك وبشرتك وصحتك، مع إصغاء ودقة ومتابعة.' }, lang))}</p>
      <div class="btn-row" data-reveal style="--d:200ms">
        <a class="btn btn--gold" href="${link(depth, lang, 'rendez-vous')}" data-track="start_booking">${icons.calendar}${esc(t(ui.book, lang))}</a>
        <a class="btn btn--ghost" href="#soins">${esc(t(ui.discover, lang))}</a>
      </div>
      <div class="hero__choice">
        <a class="choice choice--dental" href="${link(depth, lang, 'dentisterie')}" data-track="select_branch" data-branch="dental" data-reveal style="--d:270ms">
          <span class="choice__icon">${icons.tooth}</span>
          <span><strong>${esc(t({ fr: 'Je cherche un soin dentaire', ar: 'أبحث عن علاج أسنان' }, lang))}</strong><span>Clinic Crystal Smile</span></span>
        </a>
        <a class="choice choice--aesthetic" href="${link(depth, lang, 'esthetique-nutrition')}" data-track="select_branch" data-branch="aesthetic" data-reveal style="--d:340ms">
          <span class="choice__icon">${icons.sparkle}</span>
          <span><strong>${esc(t({ fr: 'Je cherche un soin esthétique', ar: 'أبحث عن عناية تجميلية' }, lang))}</strong><span>Aura Cabinet d’Esthétique</span></span>
        </a>
      </div>
    </div>
    ${media(depth, 'hero-portrait', lang, { className: 'media--wide', priority: true, reveal: true, delay: 120 })}
  </div>
</section>

<section class="wrap">
  <div class="trust">
    ${[
      [icons.handHeart, { fr: 'Prise en charge personnalisée', ar: 'تكفّل شخصي' }, { fr: 'Un diagnostic avant toute proposition de soin', ar: 'تشخيص قبل أي اقتراح علاجي' }],
      [icons.shieldCheck, { fr: 'Hygiène & sécurité', ar: 'النظافة والسلامة' }, { fr: 'Protocoles de stérilisation à chaque étape', ar: 'بروتوكولات تعقيم في كل مرحلة' }],
      [icons.calendarCheck, { fr: 'Rendez-vous simple', ar: 'موعد بسيط' }, { fr: 'Demande en ligne, confirmation par téléphone', ar: 'طلب عبر الإنترنت وتأكيد هاتفي' }],
      [icons.pin, { fr: 'Deux espaces à Koléa', ar: 'فضاءان بالقليعة' }, { fr: 'Chaque activité dans son cadre dédié', ar: 'كل نشاط في فضائه الخاص' }],
    ]
      .map(
        ([ic, title, sub], i) =>
          `<div class="trust__item" data-reveal style="--d:${i * 70}ms">${ic}<span><strong>${esc(t(title, lang))}</strong><span>${esc(t(sub, lang))}</span></span></div>`
      )
      .join('')}
  </div>
</section>

<section class="section" id="cabinets">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t({ fr: 'Deux cabinets, une même approche', ar: 'عيادتان، نفس المقاربة' }, lang))}</p>
      <h2>${esc(t({ fr: 'Choisissez l’espace qui correspond à votre besoin', ar: 'اختر الفضاء الذي يناسب حاجتك' }, lang))}</h2>
      <p>${esc(t({ fr: 'Chaque cabinet a ses prestations, son équipe et son rendez-vous dédié. Si vous hésitez, une consultation d’orientation vous aide à trancher.', ar: 'لكل عيادة خدماتها وفريقها وموعدها الخاص. إذا ترددت، تساعدك استشارة التوجيه على الاختيار.' }, lang))}</p>
    </div>
    <div class="grid grid--2">${clinics.map((c, i) => clinicCard(depth, lang, c, i)).join('')}</div>
  </div>
</section>

<section class="section section--tint" id="soins">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t({ fr: 'Prestations', ar: 'الخدمات' }, lang))}</p>
      <h2>${esc(t({ fr: 'Les soins les plus demandés', ar: 'الخدمات الأكثر طلباً' }, lang))}</h2>
    </div>
    <div class="grid grid--3">
      ${[dentalServices[0], dentalServices[1], dentalServices[5], aestheticServices[0], aestheticServices[1], aestheticServices[5]]
        .map((s, i) => serviceCard(depth, lang, s, i))
        .join('')}
    </div>
    <div class="btn-row" style="margin-top:1.6rem">
      <a class="btn btn--blue" href="${link(depth, lang, 'dentisterie')}">${esc(t({ fr: 'Toute la dentisterie', ar: 'كل خدمات الأسنان' }, lang))}</a>
      <a class="btn" href="${link(depth, lang, 'esthetique-nutrition')}">${esc(t({ fr: 'Toute l’esthétique', ar: 'كل خدمات التجميل' }, lang))}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split split--wide">
    ${media(depth, 'dr-portrait-vertical', lang, { className: 'media--tall', reveal: true })}
    <div>
      <p class="eyebrow">${esc(t({ fr: 'La praticienne', ar: 'الطبيبة' }, lang))}</p>
      <h2>${lang === 'ar' ? brand.nameAr : brand.name}</h2>
      <p class="lead" style="margin-block:0.9rem">${esc(t({ fr: 'Dr Tamali Rayane accueille ses patients à Koléa au sein de deux espaces dédiés à la dentisterie et à la médecine esthétique. Son approche commence par l’écoute et l’évaluation de chaque besoin, afin de proposer un parcours de soins clair, adapté et suivi.', ar: 'تستقبل الدكتورة تمالي ريان مرضاها بالقليعة في فضاءين مخصصين لطب الأسنان والطب التجميلي. تبدأ مقاربتها بالإصغاء وتقييم كل حاجة، لاقتراح مسار علاجي واضح وملائم ومتابَع.' }, lang))}</p>
      <ul class="ticks">
        ${[
          { fr: 'Écoute et diagnostic avant toute proposition', ar: 'الإصغاء والتشخيص قبل أي اقتراح' },
          { fr: 'Plan de soins personnalisé, expliqué étape par étape', ar: 'خطة علاج شخصية، تُشرح مرحلة بمرحلة' },
          { fr: 'Suivi après le soin et consignes claires', ar: 'متابعة بعد العلاج وتعليمات واضحة' },
        ]
          .map((x) => `<li>${esc(t(x, lang))}</li>`)
          .join('')}
      </ul>
      <div class="btn-row" style="margin-top:1.4rem">
        <a class="btn btn--ghost" href="${link(depth, lang, 'dr-tamali-rayane')}">${esc(t({ fr: 'En savoir plus sur Dr Tamali', ar: 'تعرّف أكثر على الطبيبة' }, lang))}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t({ fr: 'Votre parcours', ar: 'مسارك' }, lang))}</p>
      <h2>${esc(t({ fr: 'Comment se passe une prise en charge', ar: 'كيف تتم المرافقة' }, lang))}</h2>
    </div>
    <ol class="steps">
      ${[
        [{ fr: 'Choisissez', ar: 'اختر' }, { fr: 'La spécialité et le cabinet concerné.', ar: 'التخصص والعيادة المعنية.' }],
        [{ fr: 'Demandez', ar: 'اطلب' }, { fr: 'Envoyez votre demande de rendez-vous.', ar: 'أرسل طلب الموعد.' }],
        [{ fr: 'Confirmation', ar: 'التأكيد' }, { fr: 'Le cabinet vous rappelle pour fixer l’horaire.', ar: 'تتصل بك العيادة لتحديد الوقت.' }],
        [{ fr: 'Consultation', ar: 'الاستشارة' }, { fr: 'Examen, diagnostic et explication des options.', ar: 'فحص وتشخيص وشرح الخيارات.' }],
        [{ fr: 'Suivi', ar: 'المتابعة' }, { fr: 'Plan de soins, consignes et contrôle.', ar: 'خطة علاج وتعليمات ومراقبة.' }],
      ]
        .map(
          ([ti, de], i) =>
            `<li data-reveal style="--d:${i * 90}ms"><strong>${esc(t(ti, lang))}</strong><span>${esc(t(de, lang))}</span></li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    ${media(depth, 'home-approach', lang, { className: 'media--four', reveal: true })}
    <div>
      <p class="eyebrow">${esc(t({ fr: 'Résultats', ar: 'النتائج' }, lang))}</p>
      <h2>${esc(t({ fr: 'Des résultats présentés avec transparence', ar: 'نتائج تُعرض بشفافية' }, lang))}</h2>
      <p class="lead" style="margin-block:0.9rem">${esc(t({ fr: 'Les photos avant / après sont publiées uniquement avec le consentement écrit des patients, à angle et éclairage identiques, sans filtre.', ar: 'صور قبل/بعد تُنشر فقط بموافقة خطية من المرضى، بنفس الزاوية والإضاءة وبدون فلاتر.' }, lang))}</p>
      <div class="note">${esc(t(ui.resultsNotice, lang))}</div>
      <div class="btn-row" style="margin-top:1.3rem">
        <a class="btn btn--ghost" href="${link(depth, lang, 'resultats')}">${esc(t({ fr: 'Voir la galerie', ar: 'شاهد المعرض' }, lang))}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: '',
    title:
      lang === 'fr'
        ? 'Dr Tamali Rayane à Koléa | Dentisterie, esthétique & nutrition'
        : 'الدكتورة تمالي ريان بالقليعة | طب الأسنان والتجميل والتغذية',
    description:
      lang === 'fr'
        ? 'Découvrez les soins dentaires de Clinic Crystal Smile et les soins esthétiques d’Aura à Koléa. Informations, services, accès et demande de rendez-vous.'
        : 'اكتشف خدمات الأسنان في Clinic Crystal Smile وخدمات التجميل في Aura بالقليعة. معلومات، خدمات، الوصول وطلب موعد.',
    body,
  });
}

function pageBranch(lang, branchKey) {
  const depth = 2;
  const dental = branchKey === 'dental';
  const slug = dental ? 'dentisterie' : 'esthetique-nutrition';
  const clinic = dental ? clinicById['crystal-smile'] : clinicById['aura-esthetique'];
  const list = dental ? dentalServices : aestheticServices;

  const h1 = dental
    ? { fr: 'Des soins dentaires pensés pour votre santé, votre confort et votre sourire.', ar: 'علاجات أسنان مصمّمة لصحتك وراحتك وابتسامتك.' }
    : { fr: 'Une approche médicale et personnalisée pour votre peau, votre visage et votre bien-être.', ar: 'مقاربة طبية وشخصية لبشرتك ووجهك وعافيتك.' };

  const intro = dental
    ? { fr: 'Clinic Crystal Smile réunit les soins conservateurs, l’esthétique du sourire, les prothèses, l’orthodontie, la chirurgie et l’implantologie. Chaque traitement commence par un examen et une explication claire des options.', ar: 'تجمع Clinic Crystal Smile بين العلاج المحافظ، تجميل الابتسامة، التركيبات، التقويم، الجراحة والزراعة. كل علاج يبدأ بفحص وشرح واضح للخيارات.' }
    : { fr: 'Au cabinet Aura, tout commence par un diagnostic. Nous évaluons votre peau, vos habitudes et vos attentes avant de proposer un protocole. Aucun acte n’est réalisé sans information complète et sans consentement.', ar: 'في عيادة Aura يبدأ كل شيء بالتشخيص. نقيّم بشرتك وعاداتك وتوقعاتك قبل اقتراح أي بروتوكول. لا يُجرى أي إجراء دون إعلام كامل وموافقة.' };

  const body = `
${crumbs(depth, lang, [{ label: t(dental ? { fr: 'Dentisterie', ar: 'طب الأسنان' } : { fr: 'Esthétique & Nutrition', ar: 'التجميل والتغذية' }, lang), slug }])}

<section class="pagehead">
  <div class="wrap split split--wide">
    <div>
      <p class="eyebrow">${esc(t(clinic.name, lang))}</p>
      <h1>${esc(t(h1, lang))}</h1>
      <p class="lead">${esc(t(intro, lang))}</p>
      <div class="btn-row" style="margin-top:1.4rem">
        <a class="btn ${dental ? 'btn--blue' : ''}" href="${link(depth, lang, 'rendez-vous')}?branch=${branchKey}" data-track="start_booking" data-branch="${branchKey}">${esc(t(dental ? { fr: 'Demander une consultation dentaire', ar: 'اطلب استشارة أسنان' } : { fr: 'Demander une consultation esthétique', ar: 'اطلب استشارة تجميلية' }, lang))}</a>
        <a class="btn btn--ghost" href="${link(depth, lang, 'cabinets')}">${esc(t({ fr: 'Voir le cabinet', ar: 'شاهد العيادة' }, lang))}</a>
      </div>
    </div>
    ${media(depth, dental ? 'branch-dental' : 'branch-aesthetic', lang, { priority: true, reveal: true, delay: 120 })}
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${esc(t({ fr: 'Prestations', ar: 'الخدمات' }, lang))}</p>
      <h2>${esc(t(dental ? { fr: 'Nos soins dentaires', ar: 'خدمات الأسنان لدينا' } : { fr: 'Nos prestations esthétiques & nutrition', ar: 'خدمات التجميل والتغذية لدينا' }, lang))}</h2>
      <p>${esc(t({ fr: 'La liste ci-dessous est présentée à titre informatif. L’indication exacte est posée après examen.', ar: 'القائمة أدناه للعلم فقط. يُحدَّد العلاج المناسب بعد الفحص.' }, lang))}</p>
    </div>
    <div class="grid grid--3">${list.map((s, i) => serviceCard(depth, lang, s, i)).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    ${media(depth, dental ? 'cabinet-crystal-salle' : 'cabinet-aura-salle', lang, { reveal: true })}
    <div>
      <p class="eyebrow">${esc(t({ fr: 'Le déroulement', ar: 'سير الجلسة' }, lang))}</p>
      <h2>${esc(t({ fr: 'De la première consultation au suivi', ar: 'من الاستشارة الأولى إلى المتابعة' }, lang))}</h2>
      <ul class="ticks ${dental ? 'ticks--blue' : ''}" style="margin-top:1rem">
        ${(dental
          ? [
              { fr: 'Examen clinique et radiographies si nécessaire', ar: 'فحص سريري وصور أشعة عند الحاجة' },
              { fr: 'Explication du diagnostic, des options et des délais', ar: 'شرح التشخيص والخيارات والمُدد' },
              { fr: 'Devis et planification des séances', ar: 'تقدير التكلفة وبرمجة الجلسات' },
              { fr: 'Réalisation des soins avec contrôle de l’occlusion', ar: 'تنفيذ العلاج مع ضبط الإطباق' },
              { fr: 'Consignes post-soin et rendez-vous de contrôle', ar: 'تعليمات ما بعد العلاج وموعد المراقبة' },
            ]
          : [
              { fr: 'Entretien sur vos antécédents, vos habitudes et vos attentes', ar: 'حوار حول سوابقك وعاداتك وتوقعاتك' },
              { fr: 'Examen de la peau et repérage des contre-indications', ar: 'فحص البشرة وتحديد موانع الاستعمال' },
              { fr: 'Proposition d’un protocole par étapes, avec ses limites', ar: 'اقتراح بروتوكول على مراحل، مع حدوده' },
              { fr: 'Recueil du consentement avant tout acte', ar: 'أخذ الموافقة قبل أي إجراء' },
              { fr: 'Réévaluation et ajustement du protocole', ar: 'إعادة التقييم وتعديل البروتوكول' },
            ]
        )
          .map((x) => `<li>${esc(t(x, lang))}</li>`)
          .join('')}
      </ul>
      <div class="note note--info" style="margin-top:1.2rem">${esc(t(ui.medicalNotice, lang))}</div>
    </div>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug,
    title: dental
      ? lang === 'fr'
        ? 'Dentisterie à Koléa | Clinic Crystal Smile — Dr Tamali Rayane'
        : 'طب الأسنان بالقليعة | Clinic Crystal Smile — الدكتورة تمالي ريان'
      : lang === 'fr'
        ? 'Médecine esthétique & nutrition à Koléa | Aura — Dr Tamali Rayane'
        : 'الطب التجميلي والتغذية بالقليعة | Aura — الدكتورة تمالي ريان',
    description: t(intro, lang).slice(0, 155),
    body,
  });
}

function pageService(lang, svc) {
  const depth = 3;
  const dental = svc.branch === 'dental';
  const branchSlug = dental ? 'dentisterie' : 'esthetique-nutrition';
  const L = (fr, ar) => esc(t({ fr, ar }, lang));

  const block = (title, content) =>
    `<section style="margin-block-start:2.2rem"><h2>${title}</h2>${content}</section>`;
  const listOf = (arr, cls = 'ticks') =>
    `<ul class="${cls}">${(t(arr, lang) || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;

  const body = `
${crumbs(depth, lang, [
  { label: t(dental ? { fr: 'Dentisterie', ar: 'طب الأسنان' } : { fr: 'Esthétique & Nutrition', ar: 'التجميل والتغذية' }, lang), slug: branchSlug },
  { label: t(svc.title, lang) },
])}

<section class="pagehead">
  <div class="wrap split split--wide">
    <div>
      <p class="eyebrow">${esc(t(dental ? clinicById['crystal-smile'].name : clinicById['aura-esthetique'].name, lang))}</p>
      <h1>${esc(t(svc.title, lang))}</h1>
      <p class="lead">${esc(t(svc.lead, lang))}</p>
      ${svc.pending ? `<div class="note note--todo" style="margin-top:1.1rem">${L('Contenu à valider : produits, zones traitées et cadre de pratique doivent être confirmés par écrit avant publication.', 'محتوى بانتظار الاعتماد: يجب تأكيد المنتجات والمناطق المعالجة وإطار الممارسة كتابياً قبل النشر.')}</div>` : ''}
      <div class="btn-row" style="margin-top:1.4rem">
        <a class="btn ${dental ? 'btn--blue' : ''}" href="${link(depth, lang, 'rendez-vous')}?branch=${svc.branch}&amp;reason=${svc.slug}" data-track="start_booking" data-branch="${svc.branch}" data-slug="${svc.slug}">${L('Demander une consultation', 'اطلب استشارة')}</a>
      </div>
    </div>
    ${media(depth, svc.img, lang, { priority: true, reveal: true, delay: 120 })}
  </div>
</section>

<section class="section">
  <div class="wrap" style="display:grid;gap:clamp(1.6rem,4vw,3rem)">
    <div class="prose">
      ${block(L('En quoi consiste cette prise en charge ?', 'في ماذا يتمثل هذا العلاج؟'), `<p>${esc(t(svc.what, lang))}</p>`)}
      ${block(L('À qui cela peut convenir', 'لمن قد يناسب'), listOf(svc.forWhom))}
      ${block(L('Quand il faut en discuter ou différer', 'متى يجب المناقشة أو التأجيل'), listOf(svc.caution, 'ticks ticks--warn'))}
      ${block(L('Étapes de la prise en charge', 'مراحل التكفّل'), `<ol class="prose" style="padding-inline-start:1.2rem">${(t(svc.steps, lang) || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`)}
      ${block(L('Durée indicative', 'المدة التقريبية'), `<p>${esc(t(svc.duration, lang))}</p><p class="small muted">${L('Cette durée est indicative et ne constitue pas un engagement.', 'هذه المدة تقريبية ولا تُعدّ التزاماً.')}</p>`)}
      <div class="grid grid--2" style="margin-block-start:2.2rem">
        <div class="card"><h3>${L('Avant la séance', 'قبل الجلسة')}</h3>${listOf(svc.before)}</div>
        <div class="card"><h3>${L('Après la séance', 'بعد الجلسة')}</h3>${listOf(svc.after)}</div>
      </div>
      ${block(
        L('Questions fréquentes', 'أسئلة شائعة'),
        svc.faq
          .map(
            (f) =>
              `<details class="acc"><summary>${esc(t(f.q, lang))}</summary><div class="acc__body">${esc(t(f.a, lang))}</div></details>`
          )
          .join('')
      )}
      <div class="note" style="margin-block-start:2rem">${esc(t(ui.medicalNotice, lang))}</div>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head" data-reveal><h2>${L('Autres prestations', 'خدمات أخرى')}</h2></div>
    <div class="grid grid--3">
      ${(dental ? dentalServices : aestheticServices)
        .filter((s) => s.slug !== svc.slug)
        .slice(0, 3)
        .map((s, i) => serviceCard(depth, lang, s, i))
        .join('')}
    </div>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: 'services/' + svc.slug,
    title: `${t(svc.title, lang)} — ${lang === 'fr' ? 'Koléa' : 'القليعة'} | ${lang === 'ar' ? brand.nameAr : brand.name}`,
    description: t(svc.lead, lang).slice(0, 155),
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: svc.faq.map((f) => ({
          '@type': 'Question',
          name: t(f.q, lang),
          acceptedAnswer: { '@type': 'Answer', text: t(f.a, lang) },
        })),
      },
    ],
  });
}

function pageAbout(lang) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));
  const todo = lang === 'ar' ? TODO_AR : TODO;

  const body = `
${crumbs(depth, lang, [{ label: t({ fr: 'Dr Tamali', ar: 'الطبيبة' }, lang), slug: 'dr-tamali-rayane' }])}

<section class="pagehead">
  <div class="wrap split split--wide">
    <div>
      <p class="eyebrow">${esc(t(brand.tagline, lang))}</p>
      <h1>${lang === 'ar' ? brand.nameAr : brand.name}</h1>
      <p class="lead">${L(
        'Dr Tamali Rayane accueille ses patients à Koléa au sein de deux espaces dédiés à la dentisterie et à la médecine esthétique. Son approche commence par l’écoute et l’évaluation de chaque besoin, afin de proposer un parcours de soins clair, adapté et suivi.',
        'تستقبل الدكتورة تمالي ريان مرضاها بالقليعة في فضاءين مخصصين لطب الأسنان والطب التجميلي. تبدأ مقاربتها بالإصغاء وتقييم كل حاجة، لاقتراح مسار علاجي واضح وملائم ومتابَع.'
      )}</p>
    </div>
    ${media(depth, 'dr-portrait-vertical', lang, { className: 'media--tall', priority: true, reveal: true, delay: 120 })}
  </div>
</section>

<section class="section">
  <div class="wrap prose">
    <h2>${L('Formation et titres', 'التكوين والألقاب')}</h2>
    <div class="note note--todo">${L(
      'Section à compléter : diplôme initial, spécialisations, formations continues (organisme et année), affiliations professionnelles et années d’expérience. Aucune qualification n’est publiée avant validation écrite.',
      'قسم بانتظار الاستكمال: الشهادة الأساسية، التخصصات، التكوينات المستمرة (المؤسسة والسنة)، العضويات المهنية وسنوات الخبرة. لا تُنشر أي مؤهلات قبل الاعتماد الكتابي.'
    )}</div>
    <ul>
      <li>${L('Diplôme principal', 'الشهادة الأساسية')} : ${esc(todo)}</li>
      <li>${L('Titre professionnel exact pour l’activité esthétique', 'اللقب المهني الدقيق للنشاط التجميلي')} : ${esc(todo)}</li>
      <li>${L('Titre professionnel exact pour l’activité nutrition', 'اللقب المهني الدقيق لنشاط التغذية')} : ${esc(todo)}</li>
      <li>${L('Années d’expérience', 'سنوات الخبرة')} : ${esc(todo)}</li>
    </ul>

    <h2>${L('Une philosophie de soin', 'فلسفة العلاج')}</h2>
    <p>${L(
      'Un soin réussi commence rarement par un geste technique : il commence par une consultation. Comprendre l’attente réelle, examiner, expliquer les options et leurs limites, puis construire un plan que la personne comprend et accepte.',
      'العلاج الناجح نادراً ما يبدأ بإجراء تقني: يبدأ باستشارة. فهم الحاجة الحقيقية، الفحص، شرح الخيارات وحدودها، ثم بناء خطة يفهمها المريض ويوافق عليها.'
    )}</p>
    <ul>
      <li><strong>${L('Écouter', 'الإصغاء')}</strong> — ${L('comprendre la demande avant de proposer une solution.', 'فهم الطلب قبل اقتراح أي حل.')}</li>
      <li><strong>${L('Diagnostiquer', 'التشخيص')}</strong> — ${L('examiner et objectiver avant de traiter.', 'الفحص والتوثيق قبل العلاج.')}</li>
      <li><strong>${L('Personnaliser', 'التخصيص')}</strong> — ${L('un plan adapté, pas un protocole standard.', 'خطة ملائمة، لا بروتوكول موحّد.')}</li>
      <li><strong>${L('Suivre', 'المتابعة')}</strong> — ${L('des consignes claires et un contrôle après le soin.', 'تعليمات واضحة ومراقبة بعد العلاج.')}</li>
    </ul>

    <h2>${L('Pourquoi deux cabinets ?', 'لماذا عيادتان؟')}</h2>
    <p>${L(
      'La santé du sourire et la santé de la peau relèvent de gestes, d’environnements et de matériels différents. Séparer les deux espaces permet de respecter les protocoles propres à chaque activité, tout en gardant une seule praticienne qui connaît l’ensemble de votre parcours.',
      'صحة الابتسامة وصحة البشرة تتطلبان إجراءات وبيئات ومعدات مختلفة. فصل الفضاءين يحترم بروتوكولات كل نشاط، مع بقاء طبيبة واحدة تعرف مسارك كاملاً.'
    )}</p>

    <div class="grid grid--2" style="margin-block-start:2rem">
      ${media(depth, 'dr-consultation-dentaire', lang, { className: 'media--four', reveal: true })}
      ${media(depth, 'dr-consultation-esthetique', lang, { className: 'media--four', reveal: true, delay: 90 })}
    </div>

    <h2>${L('Suivre le cabinet', 'تابع العيادة')}</h2>
    <p>
      <a href="${brand.instagram}" target="_blank" rel="noopener">Instagram</a> ·
      <a href="${brand.facebook}" target="_blank" rel="noopener">Facebook</a>
    </p>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: 'dr-tamali-rayane',
    title:
      lang === 'fr'
        ? 'Dr Tamali Rayane — dentiste & médecine esthétique à Koléa'
        : 'الدكتورة تمالي ريان — طب الأسنان والطب التجميلي بالقليعة',
    description:
      lang === 'fr'
        ? 'Parcours, approche de soin et philosophie du Dr Tamali Rayane, praticienne à Koléa (Tipaza).'
        : 'مسار الدكتورة تمالي ريان ومقاربتها العلاجية وفلسفتها في العمل بالقليعة (تيبازة).',
    body,
  });
}

function pageClinics(lang) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));
  const todo = lang === 'ar' ? TODO_AR : TODO;

  const card = (c) => {
    const dental = c.key === 'dental';
    const phones = c.phones.map(
      (p) => `<a href="${telHref(p)}" data-track="click_call" data-branch="${c.key}">${p}</a>`
    );
    const pending = c.phonesPending.map((p) => `<span class="muted">${p} — ${esc(todo)}</span>`);
    return `<article class="card" style="gap:1rem">
      <span class="clinic-card__tag" style="background:${dental ? '#e8f0f6' : '#f1eaf2'};color:${dental ? '#26547a' : '#512a55'}">${dental ? icons.tooth : icons.sparkle}${esc(t(c.kicker, lang))}</span>
      <h2>${esc(t(c.name, lang))}</h2>
      <p class="muted">${esc(t(c.short, lang))}</p>
      ${media(depth, c.img, lang)}
      <div class="contact-block">
        <div>${icons.pin} ${esc(t(c.address, lang))}<br><span class="small muted">${esc(t(c.addressDetail, lang))}</span></div>
        <div>${icons.phone} ${phones.concat(pending).join(' · ') || esc(todo)}</div>
        <div>${icons.clock} ${c.hours.map((h) => `${esc(t(h, lang))} : ${esc(t(h.v, lang))}`).join(' · ')}</div>
      </div>
      <div class="map-frame">
        ${c.mapsUrl ? `<iframe src="${c.mapsUrl}" loading="lazy" title="${esc(t(c.name, lang))}" referrerpolicy="no-referrer-when-downgrade"></iframe>` : `<div>${icons.pin}<p class="small muted" style="margin-top:.5rem">${L('Lien Google Maps à ajouter', 'رابط خرائط جوجل بانتظار الإضافة')}</p></div>`}
      </div>
      <div class="btn-row">
        <a class="btn ${dental ? 'btn--blue' : ''}" href="${link(depth, lang, 'rendez-vous')}?branch=${c.key}" data-track="start_booking" data-branch="${c.key}">${esc(t(ui.book, lang))}</a>
        <a class="btn btn--ghost" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener" data-track="click_whatsapp" data-branch="${c.key}">${icons.whatsapp}${esc(t(ui.whatsapp, lang))}</a>
      </div>
    </article>`;
  };

  const body = `
${crumbs(depth, lang, [{ label: t({ fr: 'Les cabinets', ar: 'العيادتان' }, lang), slug: 'cabinets' }])}

<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">${esc(t(brand.city, lang))}</p>
    <h1>${L('Nos deux espaces de soins', 'فضاءانا للعلاج')}</h1>
    <p class="lead">${L(
      'Clinic Crystal Smile pour la dentisterie, Aura Cabinet d’Esthétique pour la médecine esthétique et la nutrition. Chaque espace a son accueil, ses horaires et son rendez-vous.',
      'Clinic Crystal Smile لطب الأسنان، وAura لعيادة التجميل والتغذية. لكل فضاء استقباله وأوقاته وموعده الخاص.'
    )}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap grid grid--2">${clinics.map(card).join('')}</div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head" data-reveal><h2>${L('L’accueil et les salles', 'الاستقبال والغرف')}</h2></div>
    <div class="grid grid--3">
      ${media(depth, 'cabinet-accueil', lang, { reveal: true })}
      ${media(depth, 'cabinet-crystal-salle', lang, { reveal: true, delay: 90 })}
      ${media(depth, 'cabinet-aura-salle', lang, { reveal: true, delay: 180 })}
    </div>
    <div class="note note--todo" style="margin-top:1.6rem">${L(
      'À confirmer avant mise en ligne : adresses exactes de chaque cabinet (même immeuble ou non), liens Google Maps, numéros de téléphone et WhatsApp par cabinet, horaires et jours de fermeture, moyens de paiement, accessibilité et stationnement.',
      'بانتظار التأكيد قبل النشر: العناوين الدقيقة لكل عيادة (نفس المبنى أو لا)، روابط خرائط جوجل، أرقام الهاتف والواتساب لكل عيادة، الأوقات وأيام الغلق، وسائل الدفع، سهولة الوصول والوقوف.'
    )}</div>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: 'cabinets',
    title: lang === 'fr' ? 'Les cabinets à Koléa | Dr Tamali Rayane' : 'العيادتان بالقليعة | الدكتورة تمالي ريان',
    description:
      lang === 'fr'
        ? 'Adresses, horaires, téléphone et accès de Clinic Crystal Smile et du cabinet Aura à Koléa.'
        : 'العناوين والأوقات والهاتف وطريقة الوصول إلى Clinic Crystal Smile وعيادة Aura بالقليعة.',
    body,
  });
}

function pageResults(lang) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));
  const cases = [
    { cat: { fr: 'Dentaire', ar: 'أسنان' }, label: { fr: 'Cas dentaire', ar: 'حالة أسنان' } },
    { cat: { fr: 'Peau', ar: 'بشرة' }, label: { fr: 'Cas peau', ar: 'حالة بشرة' } },
    { cat: { fr: 'Silhouette', ar: 'قوام' }, label: { fr: 'Cas silhouette', ar: 'حالة قوام' } },
  ];

  const body = `
${crumbs(depth, lang, [{ label: t({ fr: 'Résultats', ar: 'النتائج' }, lang), slug: 'resultats' }])}

<section class="pagehead">
  <div class="wrap split split--wide">
    <div>
      <p class="eyebrow">${L('Avant / après', 'قبل / بعد')}</p>
      <h1>${L('Des résultats documentés, pas des promesses', 'نتائج موثّقة، لا وعود')}</h1>
      <p class="lead">${L(
        'Chaque cas publié l’est avec le consentement écrit du patient, à angle et éclairage identiques, sans retouche ni filtre.',
        'كل حالة تُنشر بموافقة خطية من المريض، بنفس الزاوية والإضاءة، دون تعديل أو فلاتر.'
      )}</p>
      <div class="note" style="margin-top:1.2rem">${esc(t(ui.resultsNotice, lang))}</div>
    </div>
    ${media(depth, 'resultats-cover', lang, { priority: true, reveal: true, delay: 120 })}
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="grid grid--3">
      ${cases
        .map((c, i) => {
          // Emplacements volontairement vides : une photo décorative répétée
          // ferait passer un cas de démonstration pour un vrai résultat.
          const slot = (label) => `<div class="slot">
            <p class="ba__label">${label}</p>
            <div class="slot__box">${icons.image}<span>${L('Photo à venir', 'الصورة قادمة')}</span></div>
          </div>`;
          return `<article class="ba" data-reveal style="--d:${i * 90}ms">
        <div class="ba__imgs">
          ${slot(L('Avant', 'قبل'))}
          ${slot(L('Après', 'بعد'))}
        </div>
        <div class="ba__meta">
          <span class="pill">${esc(t(c.cat, lang))}</span>
          <strong style="margin-top:.5rem">${esc(t(c.label, lang))} ${i + 1}</strong>
          <span>${L('En attente du consentement écrit du patient.', 'بانتظار الموافقة الخطية للمريض.')}</span>
        </div>
      </article>`;
        })
        .join('')}
    </div>
    <div class="note note--todo" style="margin-top:1.8rem">${L(
      'Emplacements de démonstration. Avant la mise en ligne : remplacer par 6 à 12 cas réels, avec formulaire de consentement signé archivé, métadonnées EXIF supprimées et description validée par la Dr.',
      'أماكن عرض تجريبية. قبل النشر: استبدلها بـ 6 إلى 12 حالة حقيقية، مع أرشفة استمارة موافقة موقّعة، حذف بيانات EXIF، ووصف معتمد من الطبيبة.'
    )}</div>
  </div>
</section>

${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: 'resultats',
    title: lang === 'fr' ? 'Résultats avant / après | Dr Tamali Rayane' : 'نتائج قبل / بعد | الدكتورة تمالي ريان',
    description:
      lang === 'fr'
        ? 'Cas cliniques avant / après publiés avec le consentement écrit des patients.'
        : 'حالات قبل/بعد منشورة بموافقة خطية من المرضى.',
    body,
  });
}

const faqItems = [
  {
    q: { fr: 'Comment prendre rendez-vous ?', ar: 'كيف أحجز موعداً؟' },
    a: { fr: 'Vous envoyez une demande depuis le site ou par WhatsApp. Le cabinet vous rappelle ensuite pour confirmer la date, l’heure et le lieu. Une demande envoyée n’est pas encore un rendez-vous confirmé.', ar: 'ترسل طلباً من الموقع أو عبر واتساب. ثم تتصل بك العيادة لتأكيد التاريخ والوقت والمكان. الطلب المُرسل ليس موعداً مؤكداً بعد.' },
  },
  {
    q: { fr: 'Quel cabinet dois-je choisir ?', ar: 'أي عيادة أختار؟' },
    a: { fr: 'Clinic Crystal Smile pour tout ce qui concerne les dents, Aura pour la peau, le visage et la nutrition. En cas de doute, choisissez « Consultation d’orientation ».', ar: 'Clinic Crystal Smile لكل ما يخص الأسنان، وAura للبشرة والوجه والتغذية. عند التردد اختر «استشارة توجيهية».' },
  },
  {
    q: { fr: 'Les tarifs sont-ils affichés ?', ar: 'هل الأسعار معروضة؟' },
    a: { fr: 'Un tarif dépend du diagnostic et du nombre de séances. Une estimation vous est communiquée après l’examen, avant de commencer le traitement.', ar: 'السعر يتعلق بالتشخيص وعدد الجلسات. يُقدَّم لك تقدير بعد الفحص وقبل بدء العلاج.' },
  },
  {
    q: { fr: 'Faut-il une consultation avant un soin esthétique ?', ar: 'هل تلزم استشارة قبل أي عناية تجميلية؟' },
    a: { fr: 'Oui. Aucun acte esthétique n’est réalisé sans consultation préalable, examen et information sur les limites et les contre-indications.', ar: 'نعم. لا يُجرى أي إجراء تجميلي دون استشارة مسبقة وفحص وإعلام بالحدود وموانع الاستعمال.' },
  },
  {
    q: { fr: 'Puis-je annuler ou reporter ?', ar: 'هل يمكن الإلغاء أو التأجيل؟' },
    a: { fr: 'Oui, en prévenant le cabinet le plus tôt possible par téléphone ou WhatsApp, afin de libérer le créneau pour un autre patient.', ar: 'نعم، بإخبار العيادة في أقرب وقت عبر الهاتف أو واتساب، لتحرير الموعد لمريض آخر.' },
  },
  {
    q: { fr: 'Mes données sont-elles conservées ?', ar: 'هل تُحفظ بياناتي؟' },
    a: { fr: 'Le site ne stocke aucune donnée médicale. Votre demande sert uniquement à vous rappeler pour fixer le rendez-vous. Voir la politique de confidentialité.', ar: 'الموقع لا يخزّن أي بيانات طبية. طلبك يُستعمل فقط للاتصال بك وتحديد الموعد. راجع سياسة الخصوصية.' },
  },
  {
    q: { fr: 'Recevez-vous les enfants ?', ar: 'هل تستقبلون الأطفال؟' },
    a: { fr: TODO + ' — les tranches d’âge prises en charge doivent être précisées par le cabinet.', ar: TODO_AR + ' — يجب على العيادة تحديد الفئات العمرية المستقبَلة.' },
  },
];

function pageFaq(lang) {
  const depth = 2;
  const body = `
${crumbs(depth, lang, [{ label: t({ fr: 'FAQ', ar: 'أسئلة شائعة' }, lang), slug: 'faq' }])}
<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">${esc(t({ fr: 'Questions fréquentes', ar: 'أسئلة متكررة' }, lang))}</p>
    <h1>${esc(t({ fr: 'Les réponses aux questions les plus posées', ar: 'إجابات عن أكثر الأسئلة تكراراً' }, lang))}</h1>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap prose">
    ${faqItems
      .map(
        (f) =>
          `<details class="acc"><summary>${esc(t(f.q, lang))}</summary><div class="acc__body">${esc(t(f.a, lang))}</div></details>`
      )
      .join('')}
  </div>
</section>
${ctaBand(depth, lang)}`;

  return layout({
    lang,
    depth,
    slug: 'faq',
    title: lang === 'fr' ? 'Questions fréquentes | Dr Tamali Rayane' : 'الأسئلة الشائعة | الدكتورة تمالي ريان',
    description:
      lang === 'fr' ? 'Rendez-vous, tarifs, consultations, données personnelles : les réponses aux questions les plus posées.' : 'المواعيد، الأسعار، الاستشارات، البيانات الشخصية: إجابات عن أكثر الأسئلة تكراراً.',
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: t(f.q, lang),
          acceptedAnswer: { '@type': 'Answer', text: t(f.a, lang) },
        })),
      },
    ],
  });
}

function pageContact(lang) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));
  const todo = lang === 'ar' ? TODO_AR : TODO;

  const body = `
${crumbs(depth, lang, [{ label: t({ fr: 'Contact', ar: 'اتصل بنا' }, lang), slug: 'contact' }])}
<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">${esc(t(brand.city, lang))}</p>
    <h1>${L('Nous contacter', 'تواصل معنا')}</h1>
    <p class="lead">${L('Pour une demande de rendez-vous, utilisez le formulaire : il oriente votre demande vers le bon cabinet.', 'لطلب موعد، استعمل الاستمارة: فهي توجّه طلبك إلى العيادة المناسبة.')}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap grid grid--2">
    ${clinics
      .map((c) => {
        const dental = c.key === 'dental';
        const numbers = c.phones.length
          ? c.phones.map((p) => `<a href="${telHref(p)}" data-track="click_call" data-branch="${c.key}">${p}</a>`).join(' · ')
          : esc(todo);
        return `<article class="card">
        <span class="clinic-card__tag" style="background:${dental ? '#e8f0f6' : '#f1eaf2'};color:${dental ? '#26547a' : '#512a55'}">${dental ? icons.tooth : icons.sparkle}${esc(t(c.kicker, lang))}</span>
        <h2>${esc(t(c.name, lang))}</h2>
        <div class="contact-block">
          <div>${icons.pin} ${esc(t(c.address, lang))}</div>
          <div>${icons.phone} ${numbers}</div>
          <div>${icons.clock} ${esc(todo)}</div>
        </div>
        <div class="btn-row" style="margin-top:auto">
          <a class="btn ${dental ? 'btn--blue' : ''}" href="${link(depth, lang, 'rendez-vous')}?branch=${c.key}" data-track="start_booking" data-branch="${c.key}">${esc(t(ui.book, lang))}</a>
          <a class="btn btn--ghost" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener" data-track="click_whatsapp" data-branch="${c.key}">${icons.whatsapp}${esc(t(ui.whatsapp, lang))}</a>
        </div>
      </article>`;
      })
      .join('')}
  </div>
  <div class="wrap" style="margin-top:1.6rem">
    <div class="note note--info">${L(
      'Le site ne reçoit aucune urgence. En cas de douleur intense, de saignement ou de gonflement important, contactez directement le cabinet par téléphone ou orientez-vous vers un service d’urgence.',
      'الموقع لا يستقبل الحالات المستعجلة. عند ألم شديد أو نزيف أو تورّم كبير، اتصل بالعيادة مباشرة أو توجّه إلى مصلحة الاستعجالات.'
    )}</div>
  </div>
</section>`;

  return layout({
    lang,
    depth,
    slug: 'contact',
    title: lang === 'fr' ? 'Contact | Dr Tamali Rayane à Koléa' : 'اتصل بنا | الدكتورة تمالي ريان بالقليعة',
    description:
      lang === 'fr'
        ? 'Téléphone, WhatsApp et adresses des cabinets Clinic Crystal Smile et Aura à Koléa.'
        : 'الهاتف والواتساب وعناوين عيادتَي Clinic Crystal Smile وAura بالقليعة.',
    body,
  });
}

function pageBooking(lang) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));

  const reasons = [
    ...dentalServices.map((s) => ({ v: s.slug, b: 'dental', label: s.title })),
    ...aestheticServices.map((s) => ({ v: s.slug, b: 'aesthetic', label: s.title })),
    { v: 'autre', b: '', label: { fr: 'Autre / je ne sais pas', ar: 'أخرى / لا أعرف' } },
  ];

  const body = `
${crumbs(depth, lang, [{ label: t(ui.book, lang), slug: 'rendez-vous' }])}
<section class="pagehead">
  <div class="wrap" style="max-width:820px">
    <p class="eyebrow">${L('En 4 étapes', 'في 4 خطوات')}</p>
    <h1>${L('Demander un rendez-vous', 'طلب موعد')}</h1>
    <p class="lead">${L(
      'Remplissez la demande : elle est transmise au cabinet concerné, qui vous rappelle pour fixer la date et l’heure.',
      'املأ الطلب: يُرسَل إلى العيادة المعنية، وتتصل بك لتحديد التاريخ والوقت.'
    )}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap" style="max-width:820px">
    <form class="wizard" id="rdv-form" novalidate>
      <div class="wizard__steps">
        ${[
          { fr: 'Spécialité', ar: 'التخصص' },
          { fr: 'Motif & cabinet', ar: 'السبب والعيادة' },
          { fr: 'Vos coordonnées', ar: 'بياناتك' },
          { fr: 'Confirmation', ar: 'التأكيد' },
        ]
          .map(
            (s, i) =>
              `<div class="wizard__step" data-state="${i === 0 ? 'active' : 'todo'}"><i></i><span>${i + 1}. ${esc(t(s, lang))}</span></div>`
          )
          .join('')}
      </div>

      <!-- Étape 1 -->
      <fieldset class="wizard__panel">
        <legend class="sr-only">${L('Spécialité', 'التخصص')}</legend>
        <h2 style="font-size:1.35rem;margin-bottom:.9rem">${L('Quel type de soin recherchez-vous ?', 'أي نوع من العلاج تبحث عنه؟')}</h2>
        <div data-group="branch">
          <label class="opt"><input type="radio" name="branch" value="dental" required>
            <span><strong>${L('Dentisterie', 'طب الأسنان')}</strong><span>Clinic Crystal Smile</span></span></label>
          <label class="opt"><input type="radio" name="branch" value="aesthetic" required>
            <span><strong>${L('Esthétique & Nutrition', 'التجميل والتغذية')}</strong><span>Aura Cabinet d’Esthétique</span></span></label>
          <label class="opt"><input type="radio" name="branch" value="unknown" required>
            <span><strong>${L('Je ne sais pas', 'لا أعرف')}</strong><span>${L('Consultation d’orientation', 'استشارة توجيهية')}</span></span></label>
        </div>
        <div class="wizard__nav"><button class="btn btn--block" type="button" data-next>${L('Continuer', 'متابعة')}</button></div>
      </fieldset>

      <!-- Étape 2 -->
      <fieldset class="wizard__panel" hidden>
        <legend class="sr-only">${L('Motif et cabinet', 'السبب والعيادة')}</legend>
        <div class="field">
          <label for="reason">${L('Motif de la visite', 'سبب الزيارة')}</label>
          <select id="reason" name="reason" required>
            <option value="">${L('Choisir…', 'اختر…')}</option>
            ${reasons.map((r) => `<option value="${r.v}"${r.b ? ` data-branch="${r.b}"` : ''}>${esc(t(r.label, lang))}</option>`).join('')}
          </select>
          <span class="err">${L('Merci de choisir un motif.', 'يرجى اختيار سبب الزيارة.')}</span>
        </div>
        <p style="font-size:.88rem;font-weight:600;margin-bottom:.5rem">${L('Cabinet', 'العيادة')}</p>
        <div data-group="clinic">
          ${clinics
            .map(
              (c) =>
                `<label class="opt"><input type="radio" name="clinic" value="${c.id}" required>
              <span><strong>${esc(t(c.name, lang))}</strong><span>${esc(t(c.address, lang))}</span></span></label>`
            )
            .join('')}
        </div>
        <div class="wizard__nav">
          <button class="btn btn--ghost" type="button" data-prev>${L('Retour', 'رجوع')}</button>
          <button class="btn" type="button" data-next>${L('Continuer', 'متابعة')}</button>
        </div>
      </fieldset>

      <!-- Étape 3 -->
      <fieldset class="wizard__panel" hidden>
        <legend class="sr-only">${L('Vos coordonnées', 'بياناتك')}</legend>
        <div class="field-row">
          <div class="field">
            <label for="name">${L('Nom et prénom', 'الاسم واللقب')}</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
            <span class="err">${L('Merci d’indiquer votre nom.', 'يرجى كتابة اسمك.')}</span>
          </div>
          <div class="field">
            <label for="phone">${L('Téléphone', 'رقم الهاتف')}</label>
            <input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9+ ]{9,15}" required>
            <span class="err">${L('Numéro invalide.', 'رقم غير صالح.')}</span>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="day">${L('Jour souhaité', 'اليوم المفضل')}</label>
            <input id="day" name="day" type="date">
          </div>
          <div class="field">
            <label for="slot">${L('Période', 'الفترة')}</label>
            <select id="slot" name="slot">
              <option value="">${L('Indifférent', 'لا يهم')}</option>
              <option value="am">${L('Matin', 'صباحاً')}</option>
              <option value="pm">${L('Après-midi', 'مساءً')}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="note">${L('Précision (facultatif)', 'ملاحظة (اختياري)')}</label>
          <textarea id="note" name="note" maxlength="400"></textarea>
          <span class="hint">${L('N’envoyez pas de document ni de photo médicale par ce formulaire.', 'لا ترسل أي وثيقة أو صورة طبية عبر هذه الاستمارة.')}</span>
        </div>
        <div class="wizard__nav">
          <button class="btn btn--ghost" type="button" data-prev>${L('Retour', 'رجوع')}</button>
          <button class="btn" type="button" data-next>${L('Continuer', 'متابعة')}</button>
        </div>
      </fieldset>

      <!-- Étape 4 -->
      <fieldset class="wizard__panel" hidden>
        <legend class="sr-only">${L('Confirmation', 'التأكيد')}</legend>
        <h2 style="font-size:1.35rem;margin-bottom:.9rem">${L('Vérifiez votre demande', 'راجع طلبك')}</h2>
        <div class="recap" id="rdv-recap"></div>
        <div class="field" style="margin-top:1.2rem">
          <label class="checkline">
            <input type="checkbox" name="consent" required>
            <span>${L(
              'J’accepte que mes coordonnées soient utilisées uniquement pour me rappeler et fixer ce rendez-vous.',
              'أوافق على استعمال بياناتي فقط للاتصال بي وتحديد هذا الموعد.'
            )}</span>
          </label>
          <span class="err">${L('Cette autorisation est nécessaire.', 'هذه الموافقة ضرورية.')}</span>
        </div>
        <div class="note">${L(
          'Votre demande ne devient un rendez-vous confirmé qu’après l’appel du cabinet.',
          'لا يصبح طلبك موعداً مؤكداً إلا بعد اتصال العيادة بك.'
        )}</div>
        <div class="wizard__nav">
          <button class="btn btn--ghost" type="button" data-prev>${L('Retour', 'رجوع')}</button>
          <button class="btn btn--gold" type="submit" data-submit>${L('Envoyer la demande', 'إرسال الطلب')}</button>
        </div>
      </fieldset>

      <div class="success" id="rdv-success" hidden>
        <div class="success__icon">${icons.check}</div>
        <h2>${L('Votre demande est prête', 'طلبك جاهز')}</h2>
        <p class="muted" style="margin-block:.7rem 1.3rem">${L(
          'Votre demande a bien été préparée. L’équipe du cabinet vous contactera pour confirmer la date, l’heure et le lieu du rendez-vous.',
          'تم تحضير طلبك. سيتواصل معك فريق العيادة لتأكيد التاريخ والوقت والمكان.'
        )}</p>
        <a class="btn btn--gold" id="rdv-wa-link" href="#" target="_blank" rel="noopener">${icons.whatsapp}${L('Envoyer sur WhatsApp', 'إرسال عبر واتساب')}</a>
        <p class="small muted" style="margin-top:1rem">${L('La fenêtre WhatsApp ne s’est pas ouverte ? Utilisez le bouton ci-dessus.', 'لم تُفتح نافذة واتساب؟ استعمل الزر أعلاه.')}</p>
      </div>
    </form>

    <div class="note note--todo" style="margin-top:1.4rem">${L(
      'Version de lancement : la demande part par WhatsApp vers le cabinet, aucun serveur ne stocke de donnée. L’étape suivante (tableau de bord des demandes, statuts et calendrier partagé) est prévue une fois le volume réel mesuré.',
      'نسخة الإطلاق: يُرسَل الطلب عبر واتساب إلى العيادة، ولا يخزّن أي سيرفر البيانات. المرحلة الموالية (لوحة الطلبات والحالات والرزنامة المشتركة) مبرمجة بعد قياس الحجم الحقيقي.'
    )}</div>
  </div>
</section>`;

  return layout({
    lang,
    depth,
    slug: 'rendez-vous',
    title: lang === 'fr' ? 'Prendre rendez-vous | Dr Tamali Rayane à Koléa' : 'حجز موعد | الدكتورة تمالي ريان بالقليعة',
    description:
      lang === 'fr'
        ? 'Demandez un rendez-vous en dentisterie ou en esthétique. Le cabinet vous rappelle pour confirmer.'
        : 'اطلب موعداً في طب الأسنان أو التجميل. تتصل بك العيادة للتأكيد.',
    body,
  });
}

function pageLegal(lang, kind) {
  const depth = 2;
  const L = (fr, ar) => esc(t({ fr, ar }, lang));
  const todo = lang === 'ar' ? TODO_AR : TODO;
  const privacy = kind === 'confidentialite';

  const content = privacy
    ? `
    <h2>${L('Quelles données sont collectées ?', 'ما هي البيانات المجمّعة؟')}</h2>
    <p>${L(
      'Le formulaire de demande de rendez-vous recueille uniquement votre nom, votre numéro de téléphone, le motif général de la visite et le créneau souhaité. Aucune donnée n’est enregistrée sur un serveur du site : le message est composé sur votre appareil, puis envoyé par vous via WhatsApp au cabinet.',
      'تجمع استمارة طلب الموعد اسمك ورقم هاتفك وسبب الزيارة العام والوقت المفضل فقط. لا تُسجَّل أي بيانات على سيرفر الموقع: تُكتب الرسالة على جهازك ثم ترسلها أنت عبر واتساب إلى العيادة.'
    )}</p>
    <h2>${L('Données de santé', 'البيانات الصحية')}</h2>
    <p>${L(
      'Merci de ne pas transmettre de document médical, de résultat d’analyse ou de photographie clinique via ce site. Ces éléments sont présentés lors de la consultation.',
      'يرجى عدم إرسال أي وثيقة طبية أو نتيجة تحليل أو صورة سريرية عبر هذا الموقع. تُقدَّم هذه العناصر أثناء الاستشارة.'
    )}</p>
    <h2>${L('Durée de conservation', 'مدة الاحتفاظ')}</h2>
    <p>${esc(todo)} — ${L('durée définie par le cabinet pour les demandes de rendez-vous.', 'المدة التي تحددها العيادة للاحتفاظ بطلبات المواعيد.')}</p>
    <h2>${L('Mesure d’audience', 'قياس الزيارات')}</h2>
    <p>${L(
      'Les statistiques de visite n’enregistrent jamais de nom, de numéro de téléphone ni d’information de santé. Seuls des évènements anonymes sont comptés : consultation d’une page, clic sur un bouton de rendez-vous, d’appel ou de WhatsApp.',
      'إحصاءات الزيارة لا تسجّل أبداً أي اسم أو رقم هاتف أو معلومة صحية. تُحصى فقط أحداث مجهولة: زيارة صفحة، نقر على زر موعد أو اتصال أو واتساب.'
    )}</p>
    <h2>${L('Vos droits', 'حقوقك')}</h2>
    <p>${L(
      'Vous pouvez demander la rectification ou la suppression des informations transmises en contactant directement le cabinet.',
      'يمكنك طلب تصحيح أو حذف المعلومات المرسلة بالاتصال مباشرة بالعيادة.'
    )}</p>
    <h2>${L('Photographies avant / après', 'صور قبل / بعد')}</h2>
    <p>${L(
      'Aucune photographie de patient n’est publiée sans consentement écrit, signé et archivé. Le consentement peut être retiré à tout moment ; la photo est alors retirée du site.',
      'لا تُنشر أي صورة لمريض دون موافقة خطية موقّعة ومؤرشفة. يمكن سحب الموافقة في أي وقت، وتُزال الصورة عندها من الموقع.'
    )}</p>`
    : `
    <h2>${L('Éditeur du site', 'ناشر الموقع')}</h2>
    <ul>
      <li>${L('Responsable de publication', 'مسؤول النشر')} : ${lang === 'ar' ? brand.nameAr : brand.name}</li>
      <li>${L('Activité', 'النشاط')} : ${esc(t(brand.tagline, lang))}</li>
      <li>${L('Adresse', 'العنوان')} : ${esc(t(clinicById['crystal-smile'].address, lang))}</li>
      <li>${L('Téléphone', 'الهاتف')} : ${brand.phoneMain}</li>
      <li>${L('Titres professionnels et numéro d’inscription à l’ordre', 'الألقاب المهنية ورقم التسجيل في النقابة')} : ${esc(todo)}</li>
      <li>${L('Forme juridique et identifiant fiscal', 'الشكل القانوني والرقم الجبائي')} : ${esc(todo)}</li>
    </ul>
    <h2>${L('Hébergement', 'الاستضافة')}</h2>
    <p>${esc(todo)}</p>
    <h2>${L('Nature des informations publiées', 'طبيعة المعلومات المنشورة')}</h2>
    <p>${L(
      'Les contenus de ce site ont une vocation informative. Ils ne constituent ni un diagnostic, ni une prescription, ni une promesse de résultat. Seule une consultation permet de poser une indication.',
      'محتويات هذا الموقع ذات طابع إعلامي. لا تُعدّ تشخيصاً ولا وصفة ولا وعداً بنتيجة. الاستشارة وحدها تسمح بتحديد العلاج المناسب.'
    )}</p>
    <h2>${L('Propriété intellectuelle', 'الملكية الفكرية')}</h2>
    <p>${L(
      'Les textes, photographies et éléments graphiques de ce site ne peuvent pas être reproduits sans autorisation écrite.',
      'لا يجوز إعادة إنتاج نصوص وصور وعناصر هذا الموقع دون إذن كتابي.'
    )}</p>
    <h2>${L('Liens externes', 'الروابط الخارجية')}</h2>
    <p>${L(
      'Le site renvoie vers les comptes Instagram et Facebook du cabinet. Leur contenu relève de leurs propres conditions d’utilisation.',
      'يحيل الموقع إلى حسابَي إنستغرام وفيسبوك للعيادة. محتواهما يخضع لشروط استعمالهما الخاصة.'
    )}</p>`;

  const title = privacy
    ? { fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' }
    : { fr: 'Mentions légales', ar: 'معلومات قانونية' };

  const body = `
${crumbs(depth, lang, [{ label: t(title, lang), slug: kind }])}
<section class="pagehead">
  <div class="wrap"><h1>${esc(t(title, lang))}</h1></div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap prose">
    <div class="note note--todo">${L(
      'Document type à faire relire et compléter avant la mise en ligne (mentions obligatoires locales, hébergeur, titres professionnels).',
      'وثيقة نموذجية يجب مراجعتها واستكمالها قبل النشر (المعلومات الإلزامية محلياً، المستضيف، الألقاب المهنية).'
    )}</div>
    ${content}
  </div>
</section>`;

  return layout({
    lang,
    depth,
    slug: kind,
    title: `${t(title, lang)} | ${lang === 'ar' ? brand.nameAr : brand.name}`,
    description: t(title, lang),
    body,
  });
}

/* ── Fiches de prompts images ────────────────────────────────── */
function imagePromptsDoc() {
  const rows = images
    .map((img, i) => {
      const n = String(i + 1).padStart(2, '0');
      return `### ${n}. \`${img.id}.jpg\` — ${img.page}

- **Ratio** : \`${img.ratio}\` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : ${img.alt.fr}
- **Alt AR** : ${img.alt.ar}
${img.note ? `- **⚠️ Note** : ${img.note.fr}\n` : ''}
**Prompt**

\`\`\`text
${img.prompt} ${SHARED_STYLE}. Format ${img.ratio}.
\`\`\`

**Negative prompt**

\`\`\`text
${SHARED_NEGATIVE}
\`\`\`
`;
    })
    .join('\n---\n\n');

  return `# Prompts images — Dr Tamali Rayane

Chaque emplacement du site attend un fichier **\`assets/img/<identifiant>.jpg\`**.
Tant que le fichier est absent, la page affiche un cadre gris avec l'identifiant à produire : rien ne casse.

## Règles communes

1. **Aucun texte, aucun logo, aucune enseigne lisible** dans l'image — les enseignes sont ajoutées en HTML.
2. **Aucun visage de patient identifiable.** Les personnes autres que la praticienne sont de dos ou hors mise au point.
3. Les images de la Dr sont des **emplacements temporaires** : elles doivent être remplacées par de vraies photos avant la mise en ligne (cahier des charges §6 — pas de photo stock pour le visage de la praticienne).
4. Les cases avant/après sont des **emplacements de démonstration** : uniquement de vraies photos patients avec consentement écrit archivé et EXIF supprimé.
5. Export : JPG qualité 82 ou WebP qualité 80, largeur 1600 px (3200 px pour \`hero-portrait\` et \`og-cover\`), poids cible < 250 Ko.
6. Nommage SEO déjà appliqué par les identifiants ci-dessous — ne pas les renommer.

## Style commun (à coller à la fin de chaque prompt)

\`\`\`text
${SHARED_STYLE}
\`\`\`

## Negative prompt commun

\`\`\`text
${SHARED_NEGATIVE}
\`\`\`

---

${rows}
---

## Checklist avant mise en ligne

- [ ] Les 3 portraits de la Dr sont de vraies photos (hero, portrait vertical, consultations).
- [ ] Les façades et salles sont de vraies photos des deux cabinets.
- [ ] Les avant/après sont réels, avec consentement écrit archivé.
- [ ] Toutes les images converties en WebP et compressées.
- [ ] Métadonnées EXIF supprimées sur toute photo prise au cabinet.
- [ ] \`og-cover.jpg\` fait bien 1200 × 630.
`;
}

/* ── Écriture ────────────────────────────────────────────────── */
async function write(rel, content) {
  const file = join(DIST, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

function sitemap() {
  const base = SITE_URL;
  const paths = [];
  for (const lang of LANGS) {
    paths.push(`${lang}/`);
    for (const n of nav.slice(1)) paths.push(`${lang}/${n.slug}/`);
    for (const n of footerNav) paths.push(`${lang}/${n.slug}/`);
    for (const s of services) paths.push(`${lang}/services/${s.slug}/`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(paths)].map((p) => `  <url><loc>${base}/${p}</loc></url>`).join('\n')}
</urlset>`;
}

async function build() {
  if (existsSync(DIST)) await rm(DIST, { recursive: true });
  await mkdir(DIST, { recursive: true });

  let count = 0;
  for (const lang of LANGS) {
    await write(`${lang}/index.html`, pageHome(lang));
    await write(`${lang}/dentisterie/index.html`, pageBranch(lang, 'dental'));
    await write(`${lang}/esthetique-nutrition/index.html`, pageBranch(lang, 'aesthetic'));
    await write(`${lang}/dr-tamali-rayane/index.html`, pageAbout(lang));
    await write(`${lang}/cabinets/index.html`, pageClinics(lang));
    await write(`${lang}/resultats/index.html`, pageResults(lang));
    await write(`${lang}/faq/index.html`, pageFaq(lang));
    await write(`${lang}/contact/index.html`, pageContact(lang));
    await write(`${lang}/rendez-vous/index.html`, pageBooking(lang));
    await write(`${lang}/mentions-legales/index.html`, pageLegal(lang, 'mentions-legales'));
    await write(`${lang}/confidentialite/index.html`, pageLegal(lang, 'confidentialite'));
    count += 11;
    for (const svc of services) {
      await write(`${lang}/services/${svc.slug}/index.html`, pageService(lang, svc));
      count++;
    }
  }

  // Redirection racine → français
  await write(
    'index.html',
    `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Dr Tamali Rayane — Koléa</title>
<meta http-equiv="refresh" content="0; url=./fr/">
<link rel="canonical" href="./fr/"></head>
<body style="font-family:system-ui;padding:2rem">
<p><a href="./fr/">Français</a> · <a href="./ar/">العربية</a></p>
<script>location.replace((navigator.language||'fr').startsWith('ar')?'./ar/':'./fr/');</script>
</body></html>`
  );

  await write('sitemap.xml', sitemap());
  // Empêche GitHub Pages de faire passer la sortie par Jekyll.
  await write('.nojekyll', '');
  await write('robots.txt', 'User-agent: *\nDisallow: /\n# TODO : autoriser l’indexation à la mise en ligne définitive.\n');

  // Assets
  await mkdir(join(DIST, 'assets/img'), { recursive: true });
  await cp(join(ROOT, 'src/assets/styles.css'), join(DIST, 'assets/styles.css'));
  await cp(join(ROOT, 'src/assets/app.js'), join(DIST, 'assets/app.js'));
  await writeFile(
    join(DIST, 'assets/favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#512A55"/><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="21" font-weight="700" fill="#C7A56A">TR</text></svg>`,
    'utf8'
  );
  await writeFile(
    join(DIST, 'assets/img/README.txt'),
    'Déposez ici les images listées dans IMAGE_PROMPTS.md, nommées <identifiant>.jpg\n',
    'utf8'
  );

  // Si des images existent déjà dans src/assets/img, on les copie.
  const srcImg = join(ROOT, 'src/assets/img');
  if (existsSync(srcImg)) await cp(srcImg, join(DIST, 'assets/img'), { recursive: true });

  await writeFile(join(ROOT, 'IMAGE_PROMPTS.md'), imagePromptsDoc(), 'utf8');

  console.log(`✓ ${count} pages générées (${LANGS.join(' + ')}) dans dist/`);
  console.log(`✓ ${images.length} emplacements images — voir IMAGE_PROMPTS.md`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
