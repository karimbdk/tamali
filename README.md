# Site Dr Tamali Rayane

Site bilingue (français + arabe RTL) pour **Dr Tamali Rayane** à Koléa (Tipaza) :
**Clinic Crystal Smile** (dentisterie) et **Aura Cabinet d’Esthétique** (esthétique & nutrition).

Site statique généré, sans dépendance : Node lit les données bilingues et produit `dist/`.
Un seul contenu source → les deux langues restent alignées.

## Commandes

```bash
node src/build.mjs
```

```bash
node src/serve.mjs
```

Prévisualisation locale : <http://localhost:8170/> (redirige vers `/fr/`, `/ar/` pour l’arabe).

## Publication de l’aperçu

```bash
npm run deploy
```

Reconstruit le site avec l’URL publique (balises `canonical` et `og:image`) puis pousse `dist/` sur la
branche `gh-pages`. En ligne sur <https://karimbdk.github.io/tamali/>.

L’aperçu sort en `noindex` et `robots.txt` fermé : il est destiné à être montré à la Dr, pas indexé.
`dist/` n’est pas versionné sur `main` — seules les sources le sont.

> Un déploiement par GitHub Actions serait plus confortable (rebuild à chaque push), mais le jeton `gh`
> de la machine n’a pas la portée `workflow`. Pour l’activer : `gh auth refresh -s workflow` dans un
> terminal interactif, puis rétablir `.github/workflows/deploy.yml`.

## Arborescence

```
src/
  build.mjs           générateur : un fichier = une page
  serve.mjs           serveur statique de preview
  icons.mjs           icônes SVG en ligne
  assets/styles.css   design system (propriétés logiques → RTL sans surcharge)
  assets/app.js       menu, feuille WhatsApp, assistant de rendez-vous
  data/site.mjs       marque, cabinets, navigation, textes communs
  data/services.mjs   14 prestations (gabarit en 10 blocs)
  data/images.mjs     26 emplacements images + prompts
dist/                 sortie générée — ne pas éditer à la main
IMAGE_PROMPTS.md      généré : fiche prompt par image
```

## Pages générées (× 2 langues = 46)

Accueil · Dr Tamali Rayane · Dentisterie · Esthétique & Nutrition · 14 pages de prestation ·
Les cabinets · Résultats · FAQ · Contact · Prendre rendez-vous · Mentions légales · Confidentialité.

## Images

Les 26 visuels sont en place dans `src/assets/img/` (copiés vers `dist/assets/img/` au build) et
respectent exactement les ratios déclarés dans `src/data/images.mjs` — aucun recadrage parasite.

Pour en remplacer un : écrasez le fichier `src/assets/img/<identifiant>.jpg` en conservant le ratio,
puis relancez le build. Si un fichier venait à manquer, la page affiche à sa place un cadre portant
l’identifiant attendu au lieu d’une image cassée. Les prompts sont dans [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md).

Les emplacements avant / après de la page Résultats sont volontairement laissés **vides** : y placer une
photo décorative ferait passer une image d’illustration pour un vrai résultat clinique.

## Animations

Discrètes par principe : rien ne se déplace de plus de 18 px, rien ne dure plus de 0,7 s.

- Apparition au défilement (`data-reveal`) avec décalage en cascade sur les grilles
- Ombre du header qui n’apparaît qu’une fois la page défilée
- Zoom lent de la photo au survol d’une carte, flèche qui avance sur « En savoir plus »
- Ouverture glissée des accordéons, du menu mobile et de la feuille WhatsApp
- Halo lent sur le bouton WhatsApp flottant, transition entre les étapes du formulaire

Trois garde-fous : l’état initial n’est posé que si le JS a marqué `<html class="js">`, un délai de
sécurité de 3 s révèle tout si l’`IntersectionObserver` n’a pas fait son travail, et
`prefers-reduced-motion` neutralise l’ensemble. **Aucun contenu ne peut rester invisible.**

## Rendez-vous

Version de lancement conforme au cahier des charges §13 : demande → rappel du cabinet → confirmation manuelle.
Le formulaire valide les champs, garde un brouillon local, puis compose un message WhatsApp que le visiteur
envoie lui-même. **Aucune donnée n’est stockée sur un serveur.** L’étape suivante (tableau de bord des demandes,
statuts, calendrier partagé anti-double-réservation) est prévue une fois le volume réel mesuré.

Pré-remplissage par lien : `/fr/rendez-vous/?branch=dental&reason=implantologie`.

## Analytics

`app.js` pousse dans `window.dataLayer` les évènements `select_branch`, `view_service`, `start_booking`,
`submit_booking`, `click_whatsapp`, `click_call` — sans nom, téléphone ni information de santé (§21).
Aucun tag n’est branché : ajouter GA4 ou Plausible avec une bannière de consentement au moment du lancement.

## ⚠️ À faire avant la mise en ligne

Ces points sont volontairement marqués `[À CONFIRMER]` dans les pages, jamais inventés :

- [ ] Numéros de téléphone/WhatsApp de chaque cabinet (`0541 92 60 36`, `0782 19 73 10`, `0696 21 27 91` lus sur l’enseigne, non vérifiés)
- [ ] Les deux cabinets sont-ils à la même adresse ? Adresse détaillée + liens Google Maps
- [ ] Horaires et jours de fermeture par cabinet
- [ ] Titres professionnels exacts (esthétique, nutrition), diplômes et affiliations publiables
- [ ] Liste définitive des prestations, et validation du contenu de `injections-esthetiques`
- [ ] Tranches d’âge reçues (orthodontie, pédiatrie)
- [ ] **Remplacer les portraits par de vraies photos de la Dr** (les visuels actuels sont des images
      d’illustration — le cahier des charges §6 interdit une photo générique pour le visage de la praticienne)
- [ ] Photographier les vraies façades et salles des deux cabinets
- [ ] 6 à 12 cas avant/après réels avec consentement écrit archivé et EXIF supprimé
- [ ] Mentions légales : hébergeur, forme juridique, numéro d’inscription à l’ordre
- [ ] Domaine définitif : `SITE_URL=https://ledomaine.dz node src/build.mjs` (canonical, og:image, sitemap, JSON-LD)
- [ ] **Retirer `noindex`** (balise robots dans `build.mjs`) et ouvrir `robots.txt`
- [ ] Convertir les images en WebP et vérifier Lighthouse mobile ≥ 90

## Conformité au cahier des charges

- Deux cabinets distincts et identifiables dès la première écran (§8.3, §26)
- Couleurs séparées : bleu médical pour le dentaire, prune pour l’esthétique (§16)
- WhatsApp demande d’abord le cabinet avant d’ouvrir un numéro (§15)
- Barre mobile fixe Appeler / WhatsApp / Rendez-vous (§15)
- Champs de 50 px, `100dvh`, labels permanents, erreurs sous le champ, brouillon conservé (§16)
- Contraste AA vérifié sur toutes les pages, navigation clavier, focus visible, `prefers-reduced-motion`,
  alt sur toutes les images, cibles tactiles ≥ 44 px (§16)
- Le doré de la charte (`#C7A56A`) ne passait qu’à 2,2:1 en texte : une déclinaison `--gold-ink`
  (`#8A6D33`, 4,6:1) porte l’information, `--gold` reste réservé au décoratif
- JSON-LD `Dentist` + `FAQPage`, hreflang FR/AR, sitemap (§18)
- Avertissement médical et clause de non-garantie de résultat sur chaque page concernée (§26)
