# Prompts images — Dr Tamali Rayane

Chaque emplacement du site attend un fichier **`assets/img/<identifiant>.jpg`**.
Tant que le fichier est absent, la page affiche un cadre gris avec l'identifiant à produire : rien ne casse.

## Règles communes

1. **Aucun texte, aucun logo, aucune enseigne lisible** dans l'image — les enseignes sont ajoutées en HTML.
2. **Aucun visage de patient identifiable.** Les personnes autres que la praticienne sont de dos ou hors mise au point.
3. Les images de la Dr sont des **emplacements temporaires** : elles doivent être remplacées par de vraies photos avant la mise en ligne (cahier des charges §6 — pas de photo stock pour le visage de la praticienne).
4. Les cases avant/après sont des **emplacements de démonstration** : uniquement de vraies photos patients avec consentement écrit archivé et EXIF supprimé.
5. Export : JPG qualité 82 ou WebP qualité 80, largeur 1600 px (3200 px pour `hero-portrait` et `og-cover`), poids cible < 250 Ko.
6. Nommage SEO déjà appliqué par les identifiants ci-dessous — ne pas les renommer.

## Style commun (à coller à la fin de chaque prompt)

```text
photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive
```

## Negative prompt commun

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 01. `hero-portrait.jpg` — Accueil — Hero

- **Ratio** : `16/10` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Dr Tamali Rayane dans son cabinet à Koléa
- **Alt AR** : الدكتورة تمالي ريان في عيادتها بالقليعة

**Prompt**

```text
Portrait horizontal d’une femme médecin algérienne d’une trentaine d’années, debout de trois quarts dans un cabinet médical clair et minimaliste. Blouse blanche impeccable, expression calme et bienveillante, regard direct vers l’objectif, sourire léger et naturel. Arrière-plan légèrement flou : mur ivoire, plante verte discrète, meuble laqué blanc. Le sujet est cadré à droite du cadre, large espace négatif à gauche pour recevoir du texte. Lumière naturelle latérale venant d’une grande fenêtre, ombres douces. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 16/10.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 02. `home-approach.jpg` — Accueil — Approche

- **Ratio** : `4/3` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Consultation dans un cabinet calme
- **Alt AR** : استشارة داخل عيادة هادئة

**Prompt**

```text
Scène de consultation vue de côté : une praticienne en blouse blanche, assise, explique quelque chose en montrant un écran ou un schéma posé sur un bureau clair. La patiente est vue de dos, hors focus, non identifiable. Bureau minimaliste, dossier papier, stylo, petite plante. Ambiance feutrée, lumière de fin de matinée. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 4/3.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 03. `cabinet-crystal-facade.jpg` — Cabinets — Clinic Crystal Smile

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Entrée de Clinic Crystal Smile
- **Alt AR** : مدخل عيادة Clinic Crystal Smile

**Prompt**

```text
Entrée d’un cabinet dentaire moderne dans une petite ville méditerranéenne : façade claire, porte vitrée, enseigne murale neutre SANS TEXTE (plaque unie bleu médical), quelques marches, plante en pot. Fin d’après-midi, lumière chaude, trottoir propre, aucune personne visible. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 04. `cabinet-crystal-salle.jpg` — Cabinets — Salle de soins dentaires

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Salle de soins dentaires
- **Alt AR** : غرفة علاج الأسنان

**Prompt**

```text
Salle de soins dentaires vide, propre et lumineuse : fauteuil dentaire moderne gris clair, scialytique éteint, plan de travail blanc avec instruments stérilisés sous emballage, mur bleu médical doux, sol clair. Aucune personne. Composition symétrique, lumière diffuse. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 05. `cabinet-aura-facade.jpg` — Cabinets — Aura Cabinet d’Esthétique

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Entrée du cabinet Aura
- **Alt AR** : مدخل عيادة Aura

**Prompt**

```text
Entrée d’un cabinet d’esthétique médicale haut de gamme : porte vitrée, mur prune profond, plaque murale unie dorée SANS TEXTE, éclairage indirect chaud, olivier en pot, sol en pierre claire. Aucune personne visible, fin de journée. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 06. `cabinet-aura-salle.jpg` — Cabinets — Salle de soins esthétiques

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Salle de soins esthétiques
- **Alt AR** : غرفة العناية التجميلية

**Prompt**

```text
Salle de soins esthétiques vide : table de soin blanche avec drap propre, tabouret, lampe loupe, petit chariot avec flacons neutres sans étiquette, mur ivoire, touche prune et or, serviettes roulées. Ambiance spa médical, lumière douce, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 07. `cabinet-accueil.jpg` — Cabinets — Accueil

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Espace d’accueil et d’attente
- **Alt AR** : فضاء الاستقبال والانتظار

**Prompt**

```text
Espace d’accueil d’un cabinet médical boutique : comptoir en bois clair, fauteuils beiges, mur ivoire, cadre décoratif abstrait, bouquet discret, sol en terrazzo clair. Aucune personne. Lumière naturelle latérale. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 08. `dr-portrait-vertical.jpg` — Dr Tamali Rayane — Portrait

- **Ratio** : `3/4` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Portrait du Dr Tamali Rayane
- **Alt AR** : صورة الدكتورة تمالي ريان

**Prompt**

```text
Portrait vertical studio-naturel d’une femme médecin algérienne, blouse blanche, bras détendus, léger sourire, regard confiant vers l’objectif. Fond uni ivoire chaud, très léger dégradé. Éclairage principal doux à 45°, remplissage discret, aucune ombre dure. Cadrage taille. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/4.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 09. `dr-consultation-dentaire.jpg` — Dr Tamali Rayane — Consultation dentaire

- **Ratio** : `4/3` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Explication d’un plan de traitement dentaire
- **Alt AR** : شرح خطة علاج الأسنان

**Prompt**

```text
Praticienne en blouse blanche montrant un modèle anatomique de mâchoire à une patiente vue de dos et floue. Cabinet dentaire clair en arrière-plan. Geste pédagogique, mains nettes et bien formées, lumière naturelle, ambiance rassurante. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 4/3.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 10. `dr-consultation-esthetique.jpg` — Dr Tamali Rayane — Consultation esthétique

- **Ratio** : `4/3` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Analyse de peau en consultation
- **Alt AR** : تحليل البشرة أثناء الاستشارة

**Prompt**

```text
Praticienne en blouse blanche réalisant une analyse de peau à l’aide d’une lampe loupe, patiente vue de profil très flou et non identifiable. Cabinet esthétique ivoire et prune, lumière douce, concentration calme. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 4/3.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 11. `branch-dental.jpg` — Dentisterie — Bandeau

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Espace dentaire Clinic Crystal Smile
- **Alt AR** : فضاء طب الأسنان

**Prompt**

```text
Vue d’ambiance d’un cabinet dentaire moderne : fauteuil en arrière-plan flou, premier plan net sur un plateau d’instruments stérilisés et un miroir dentaire. Dominante bleu médical et blanc, lumière propre et froide adoucie. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 12. `branch-aesthetic.jpg` — Esthétique & Nutrition — Bandeau

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Espace esthétique Aura
- **Alt AR** : فضاء التجميل Aura

**Prompt**

```text
Vue d’ambiance d’un cabinet d’esthétique médicale : table de soin floue en arrière-plan, premier plan net sur des flacons en verre ambré sans étiquette et une serviette blanche pliée. Dominante prune, ivoire et or. Lumière chaude et diffuse. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 13. `service-soins-dentaires.jpg` — Prestation — Soins conservateurs

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Soins dentaires conservateurs
- **Alt AR** : العلاج المحافظ للأسنان

**Prompt**

```text
Gros plan sur des instruments dentaires stérilisés disposés sur un champ bleu, fauteuil flou en arrière-plan. Netteté sur le premier plan, lumière clinique douce, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 14. `service-esthetique-sourire.jpg` — Prestation — Esthétique du sourire

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Esthétique du sourire
- **Alt AR** : تجميل الابتسامة

**Prompt**

```text
Nuancier de teintes dentaires posé sur une surface blanche à côté d’un miroir dentaire et d’un petit modèle de dents. Lumière naturelle, dominante blanche et or discret, aucune personne, aucun texte lisible sur le nuancier. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 15. `service-protheses.jpg` — Prestation — Prothèses

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Prothèses dentaires
- **Alt AR** : التركيبات السنية

**Prompt**

```text
Modèle de mâchoire en plâtre blanc sur un plan de travail clair, avec une couronne céramique posée à côté sur un tissu bleu. Éclairage doux, macro, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 16. `service-orthodontie.jpg` — Prestation — Orthodontie

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Orthodontie et gouttières
- **Alt AR** : التقويم والقوالب

**Prompt**

```text
Gouttière orthodontique transparente posée sur son boîtier blanc, à côté d’un modèle dentaire, sur fond ivoire. Macro, lumière douce, reflets délicats, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 17. `service-chirurgie.jpg` — Prestation — Chirurgie & extraction

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Chirurgie dentaire
- **Alt AR** : جراحة الأسنان

**Prompt**

```text
Plateau chirurgical stérile vu de dessus : champ bleu, instruments emballés, gants en boîte, compresses. Composition ordonnée, lumière neutre, aucune personne, aucun sang. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 18. `service-implantologie.jpg` — Prestation — Implantologie

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Implantologie dentaire
- **Alt AR** : زراعة الأسنان

**Prompt**

```text
Modèle pédagogique d’implant dentaire en titane présenté sur un socle blanc, arrière-plan bleu médical très flou. Macro nette, éclairage studio doux, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 19. `service-diagnostic-peau.jpg` — Prestation — Diagnostic de peau

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Diagnostic de peau
- **Alt AR** : تشخيص البشرة

**Prompt**

```text
Lampe loupe d’esthétique médicale allumée au-dessus d’une table de soin blanche vide, fiche de consultation vierge et stylo à côté. Ambiance calme, ivoire et prune, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 20. `service-soins-visage.jpg` — Prestation — Soins du visage

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Soins du visage
- **Alt AR** : العناية بالوجه

**Prompt**

```text
Nature morte de soin du visage : bol en céramique, spatule, serviette blanche roulée, flacon en verre sans étiquette, sur marbre clair avec touche or. Lumière douce, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 21. `service-injections.jpg` — Prestation — Injections

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Injections esthétiques
- **Alt AR** : الحقن التجميلي

**Prompt**

```text
Plateau médical stérile vu de dessus avec compresses, gants et matériel emballé neutre, sur champ prune. Composition sobre et médicale, sans aiguille visible, sans sang, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 22. `service-taches-cicatrices.jpg` — Prestation — Taches & cicatrices

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Taches et cicatrices
- **Alt AR** : البقع والندبات

**Prompt**

```text
Détail abstrait et élégant : gouttes de sérum transparent sur une surface en verre, lumière rasante créant des reflets, fond ivoire dégradé. Macro artistique, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 23. `service-silhouette.jpg` — Prestation — Silhouette

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Accompagnement silhouette
- **Alt AR** : مرافقة نحت القوام

**Prompt**

```text
Mètre ruban souple enroulé, verre d’eau et serviette blanche sur une table claire, lumière naturelle du matin, dominante ivoire et prune. Aucune personne, aucun corps visible. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 24. `service-nutrition.jpg` — Prestation — Nutrition

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Consultation nutritionnelle
- **Alt AR** : استشارة غذائية

**Prompt**

```text
Composition alimentaire méditerranéenne saine sur une table claire : légumes frais, huile d’olive, fruits secs, carnet de suivi vierge et stylo. Lumière naturelle, tons chauds, aucune personne. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 25. `resultats-cover.jpg` — Résultats — Bandeau

- **Ratio** : `3/2` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Galerie de résultats
- **Alt AR** : معرض النتائج
- **⚠️ Note** : Emplacement décoratif uniquement. Les vignettes avant/après doivent être de VRAIES photos patients, avec consentement écrit et métadonnées supprimées.

**Prompt**

```text
Image d’ambiance abstraite et élégante : mur ivoire texturé avec un jeu de lumière douce en diagonale, et une fine ligne dorée. Composition minimaliste, aucune personne, aucun texte. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 3/2.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

### 26. `og-cover.jpg` — Partage réseaux sociaux (Open Graph)

- **Ratio** : `1.91/1` · **Largeur conseillée** : 1600 px (2× pour le hero)
- **Alt FR** : Dr Tamali Rayane — Koléa
- **Alt AR** : الدكتورة تمالي ريان — القليعة

**Prompt**

```text
Visuel de partage horizontal 1200×630 : cabinet médical clair en légère profondeur de champ à droite, large aplat prune profond à gauche laissé vide pour le titre. Aucun texte dans l’image. Élégant, sobre, lumière naturelle. photographie éditoriale médicale haut de gamme, lumière naturelle douce et diffuse, palette prune profond #512A55, bleu médical #316B9A, or discret #C7A56A sur fond ivoire chaud #FAF8F5, ambiance calme et clinique mais chaleureuse, aucun texte ni logo dans l’image, rendu réaliste 35 mm, faible grain, couleurs fidèles, pas de retouche excessive. Format 1.91/1.
```

**Negative prompt**

```text
texte, lettres, logos, watermark, visages déformés, mains déformées, instruments dentaires irréalistes, sang, gore, éclairage néon vert, sursaturation, HDR agressif, peau lissée en plastique, collage, cadre, bordure
```

---

## Checklist avant mise en ligne

- [ ] Les 3 portraits de la Dr sont de vraies photos (hero, portrait vertical, consultations).
- [ ] Les façades et salles sont de vraies photos des deux cabinets.
- [ ] Les avant/après sont réels, avec consentement écrit archivé.
- [ ] Toutes les images converties en WebP et compressées.
- [ ] Métadonnées EXIF supprimées sur toute photo prise au cabinet.
- [ ] `og-cover.jpg` fait bien 1200 × 630.
