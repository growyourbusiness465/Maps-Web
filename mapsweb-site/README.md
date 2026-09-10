# MapsWeb — Site statique

Refonte visuelle complète, inspirée de Gogleer en palette Google Material, 8 pages en français, prêtes à convertir via **Catly Convert** (ou tout convertisseur HTML → Elementor).

## 📁 Structure
```
mapsweb-site/
├── index.html                 Accueil (hero typing, partenaires, compteurs, 6 services, premium, ebook, CTA)
├── pages/
│   ├── services.html          9 prestations détaillées (alternance image/texte)
│   ├── tarifs.html            15 forfaits double-devise € / $CAD + Interac 3 étapes
│   ├── verified.html          Programme MapsWeb Verified + 3 plans
│   ├── a-propos.html          Histoire + 4 stats + 4 valeurs
│   ├── faq.html               10 questions en accordéons
│   ├── contact.html           Formulaire + coordonnées
│   └── blog.html              6 articles exemple
├── css/
│   ├── mapsweb.css            Design system v2 (tokens, layout, composants, pages internes, responsive)
│   ├── header-footer.css      Header sticky 3 colonnes + Footer multi-colonnes
│   └── tarifs.css             Styles spécifiques page tarifs
├── js/
│   └── mapsweb.js             Typing hero, compteurs animés, smooth scroll, FAQ accordéon, cookie
└── img/                       4 PNG/JPG + 15 logos partenaires SVG
```

## 🎨 Design System v2
- Grille **8pt Material Design**, container 1200px
- Palette Google officielle : bleu `#1a73e8`, rouge `#EA4335`, jaune `#FBBC04`, vert `#34A853`
- Typographie **Roboto** (Google Fonts) + **Font Awesome 6**
- Élévations Material (`--sh-1` à `--sh-4`), rayons cohérents (`6 / 8 / 12 / 16 / 24px`)
- Breakpoints responsive : 1199px (laptop), 1024px (tablette), 991px (nav mobile), 768px (mobile), 480px (petit mobile)
- Animations : hover lift, float, typing, compteurs IntersectionObserver, FAQ smooth open

## 🚀 Preview en local
```bash
cd mapsweb
python3 -m http.server 8080
```
Ouvrir http://localhost:8080/

## 🔄 Conversion vers Elementor avec Catly Convert
1. Extrayez `mapsweb-site.zip`
2. Dans Catly Convert → **HTML to Elementor** : uploadez le ZIP OU collez l'URL de preview
3. Convertissez page par page pour un meilleur résultat
4. Dans Elementor, réglez le modèle de page sur **"Elementor Canvas"** pour masquer le titre WordPress par défaut
5. Le header/footer sont fournis dans le HTML — vous pouvez les garder via le HTML ou les refaire dans Elementor Theme Builder

## ✏️ Modifications à prévoir avant mise en ligne
- 📞 Téléphone, email, WhatsApp (rechercher `+33 (0)1 23 45 67 89` et `contact@mapsweb.fr`)
- 🔗 Liens CTA (relier à votre vrai formulaire / prise de RDV)
- 💳 Boutons "Souscrire" (brancher Stripe / PayPal / Interac)
- 📊 Compteurs : ajuster `data-target="xxx"`
- ⭐ Témoignages réels clients
- 📝 Formulaire de contact (Contact Form 7, WPForms, Elementor Pro Form)
- 🍪 Bannière cookie : branchez-la à votre solution RGPD
