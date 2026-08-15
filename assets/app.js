/* Dr Tamali Rayane — comportements front (vanilla, aucune dépendance) */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG || {};
  var T = CFG.t || {};

  /* ── 1. Emplacements images ────────────────────────────────
     Les photos s'affichent normalement, sans dépendre du JavaScript.
     Le cadre "image à produire" ne se substitue à l'image que si
     le fichier est réellement absent. */
  function markEmpty(img) {
    var box = img.closest('.media');
    if (box) box.classList.add('is-empty');
  }
  document.querySelectorAll('.media img').forEach(function (img) {
    if (img.complete && !img.naturalWidth) markEmpty(img);
    img.addEventListener('error', function () { markEmpty(img); });
  });

  /* ── 1 bis. Apparition au défilement ───────────────────────
     Les éléments marqués data-reveal montent doucement en entrant dans
     l'écran. Une seule fois : on n'anime pas au retour en arrière. */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        // Ce qui est déjà à l'écran au chargement s'affiche sans attendre.
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
        else io.observe(el);
      });
      // Filet de sécurité : une animation d'entrée ne doit jamais pouvoir
      // laisser du contenu invisible. Si l'observateur n'a pas fait son
      // travail au bout de 3 s, on affiche tout sans condition.
      setTimeout(function () {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
        io.disconnect();
      }, 3000);
    }
  }

  /* ── 1 ter. Ombre du header une fois la page défilée ───────── */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 2. Menu mobile ────────────────────────────────────────── */
  var drawer = document.getElementById('drawer');
  var burger = document.getElementById('burger');
  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.dataset.open = open ? 'true' : 'false';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    } else {
      burger.focus();
    }
  }
  if (burger) burger.addEventListener('click', function () { setDrawer(drawer.dataset.open !== 'true'); });
  document.querySelectorAll('[data-drawer-close]').forEach(function (el) {
    el.addEventListener('click', function () { setDrawer(false); });
  });

  /* ── 3. Feuille de choix WhatsApp ──────────────────────────── */
  var sheet = document.getElementById('wa-sheet');
  var fab = document.getElementById('wa-fab');
  function setSheet(open) {
    if (!sheet) return;
    sheet.dataset.open = open ? 'true' : 'false';
  }
  if (fab) fab.addEventListener('click', function () { setSheet(true); });
  var waMobile = document.getElementById('wa-mobile');
  if (waMobile) {
    waMobile.addEventListener('click', function (e) { e.preventDefault(); setSheet(true); });
  }
  if (sheet) {
    sheet.addEventListener('click', function (e) {
      if (e.target === sheet || e.target.hasAttribute('data-sheet-close')) setSheet(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setSheet(false);
    if (drawer && drawer.dataset.open === 'true') setDrawer(false);
  });

  /* ── 4. Mesure analytique (sans donnée personnelle) ─────────
     Les évènements sont poussés dans dataLayer ; aucun nom,
     téléphone ou note médicale n'y transite jamais. */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    window.dataLayer.push(Object.assign({ event: event }, params || {}));
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    track(el.getAttribute('data-track'), {
      branch: el.getAttribute('data-branch') || undefined,
      slug: el.getAttribute('data-slug') || undefined,
      page: location.pathname,
    });
  });

  /* ── 5. Assistant de demande de rendez-vous ────────────────── */
  var form = document.getElementById('rdv-form');
  if (!form) return;

  var panels = Array.prototype.slice.call(form.querySelectorAll('.wizard__panel'));
  var stepDots = Array.prototype.slice.call(document.querySelectorAll('.wizard__step'));
  var current = 0;
  var STORAGE = 'tamali-rdv-draft';

  function showStep(i) {
    current = Math.max(0, Math.min(i, panels.length - 1));
    panels.forEach(function (p, idx) { p.hidden = idx !== current; });
    stepDots.forEach(function (d, idx) {
      d.dataset.state = idx < current ? 'done' : idx === current ? 'active' : 'todo';
    });
    var head = form.querySelector('.wizard__steps');
    if (head) head.scrollIntoView({ block: 'start', behavior: 'smooth' });
    if (current === panels.length - 1) fillRecap();
  }

  function fieldOf(input) { return input.closest('.field, .opt-group'); }

  function validateStep() {
    var panel = panels[current];
    var ok = true;

    // champs requis classiques
    panel.querySelectorAll('input[required], select[required], textarea[required]').forEach(function (input) {
      if (input.type === 'radio' || input.type === 'checkbox') return;
      var wrap = fieldOf(input);
      var valid = input.value.trim() !== '' && input.checkValidity();
      if (wrap) wrap.classList.toggle('is-invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });

    // groupes de boutons radio
    var groups = {};
    panel.querySelectorAll('input[type="radio"][required]').forEach(function (r) { groups[r.name] = true; });
    Object.keys(groups).forEach(function (name) {
      var checked = panel.querySelector('input[name="' + name + '"]:checked');
      var wrap = panel.querySelector('[data-group="' + name + '"]');
      if (wrap) wrap.classList.toggle('is-invalid', !checked);
      if (!checked) ok = false;
    });

    // cases à cocher obligatoires (consentement)
    panel.querySelectorAll('input[type="checkbox"][required]').forEach(function (c) {
      var wrap = fieldOf(c);
      if (wrap) wrap.classList.toggle('is-invalid', !c.checked);
      if (!c.checked) ok = false;
    });

    return ok;
  }

  function data() {
    var fd = new FormData(form);
    var o = {};
    fd.forEach(function (v, k) { o[k] = typeof v === 'string' ? v.trim() : v; });
    return o;
  }

  function labelFor(name) {
    // Pour un groupe de boutons radio, c'est l'option cochée qui compte :
    // une sélection large renverrait la première du DOM, pas celle choisie.
    var el = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('[name="' + name + '"]');
    if (!el) return '';
    if (el.type === 'radio') {
      var strong = el.parentElement.querySelector('strong');
      return strong ? strong.textContent.trim() : el.value;
    }
    if (el.tagName === 'SELECT') return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : el.value;
    return el.value.trim();
  }

  function fillRecap() {
    var box = document.getElementById('rdv-recap');
    if (!box) return;
    var rows = [
      [T.recapBranch, labelFor('branch')],
      [T.recapReason, labelFor('reason')],
      [T.recapClinic, labelFor('clinic')],
      [T.recapName, labelFor('name')],
      [T.recapPhone, labelFor('phone')],
      [T.recapWhen, [labelFor('day'), labelFor('slot')].filter(Boolean).join(' · ')],
    ].filter(function (r) { return r[1]; });
    box.innerHTML = '<dl>' + rows.map(function (r) {
      return '<dt>' + r[0] + '</dt><dd>' + escapeHtml(r[1]) + '</dd>';
    }).join('') + '</dl>';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Le formulaire ne dépose aucune donnée sur un serveur : il compose
     un message WhatsApp que le visiteur envoie lui-même au cabinet. */
  function whatsappUrl() {
    var d = data();
    var isDental = d.branch === 'dental';
    var number = (isDental ? CFG.waDental : CFG.waAesthetic) || CFG.waMain;
    var lines = [
      isDental ? T.waIntroDental : T.waIntroAesthetic,
      T.recapReason + ' : ' + (labelFor('reason') || '—'),
      T.recapName + ' : ' + (d.name || '—'),
      T.recapWhen + ' : ' + [labelFor('day'), labelFor('slot')].filter(Boolean).join(' · '),
    ];
    if (d.note) lines.push(T.recapNote + ' : ' + d.note);
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  form.querySelectorAll('[data-next]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!validateStep()) return;
      saveDraft();
      showStep(current + 1);
    });
  });
  form.querySelectorAll('[data-prev]').forEach(function (btn) {
    btn.addEventListener('click', function () { showStep(current - 1); });
  });

  // Le choix de la spécialité filtre les motifs et pré-sélectionne le cabinet
  form.querySelectorAll('input[name="branch"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var b = r.value;
      form.querySelectorAll('#reason option').forEach(function (o) {
        var scope = o.getAttribute('data-branch');
        o.hidden = !!scope && scope !== b;
      });
      var sel = form.querySelector('#reason');
      if (sel && sel.selectedOptions[0] && sel.selectedOptions[0].hidden) sel.value = '';
      form.querySelectorAll('input[name="clinic"]').forEach(function (c) {
        if (c.value === (b === 'dental' ? 'crystal-smile' : 'aura-esthetique')) c.checked = true;
      });
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateStep()) return;
    var btn = form.querySelector('[data-submit]');
    if (btn) btn.disabled = true;

    track('submit_booking', { branch: data().branch, clinic: data().clinic });

    var url = whatsappUrl();
    var success = document.getElementById('rdv-success');
    var link = document.getElementById('rdv-wa-link');
    if (link) link.href = url;
    panels.forEach(function (p) { p.hidden = true; });
    var head = form.querySelector('.wizard__steps');
    if (head) head.hidden = true;
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    try { localStorage.removeItem(STORAGE); } catch (err) { /* stockage indisponible */ }
    window.open(url, '_blank', 'noopener');
  });

  /* Brouillon local : évite de tout resaisir si on revient en arrière.
     Rien n'est envoyé ailleurs, tout reste sur l'appareil du visiteur. */
  function saveDraft() {
    try { localStorage.setItem(STORAGE, JSON.stringify(data())); } catch (err) { /* ignore */ }
  }
  function loadDraft() {
    try {
      var raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      var d = JSON.parse(raw);
      Object.keys(d).forEach(function (k) {
        var els = form.querySelectorAll('[name="' + k + '"]');
        els.forEach(function (el) {
          if (el.type === 'radio') el.checked = el.value === d[k];
          else if (el.type === 'checkbox') el.checked = !!d[k];
          else el.value = d[k];
        });
      });
      var checked = form.querySelector('input[name="branch"]:checked');
      if (checked) checked.dispatchEvent(new Event('change'));
    } catch (err) { /* ignore */ }
  }
  form.addEventListener('input', saveDraft);
  loadDraft();

  // Pré-sélection depuis un lien : /rendez-vous/?branch=dental&reason=implantologie
  var qs = new URLSearchParams(location.search);
  var qBranch = qs.get('branch');
  if (qBranch) {
    var radio = form.querySelector('input[name="branch"][value="' + qBranch + '"]');
    if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change')); }
  }
  var qReason = qs.get('reason');
  if (qReason) {
    var sel = form.querySelector('#reason');
    if (sel && sel.querySelector('option[value="' + qReason + '"]')) sel.value = qReason;
  }

  showStep(0);
})();
