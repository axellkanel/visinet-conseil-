# Visinet Conseil - Landing Page

Landing page professionnelle pour Visinet Conseil, cabinet de conseil spécialisé dans l'accompagnement des enseignes organisées en réseau (franchises, groupements, multi-sites).

## 🚀 Fonctionnalités

### Sections principales
- **Hero Section** : Titre optimisé avec tags de services et CTA "Audit gratuit 30 min"
- **Services** : 3 services (Audit & Conseil, Accompagnement opérationnel, Formations & coaching)
- **Témoignages** : 3 témoignages clients avec rôles et secteurs
- **À propos** : Présentation complète avec expertise et valeur ajoutée
- **Réalisations** : 3 études de cas compactes (toutes visibles sur une page)
- **FAQ** : 5 questions fréquentes avec accordéon HTML5
- **Contact** : Formulaire avec RGPD + intégration Calendly

### Optimisations
- ✅ **SEO** : Meta tags complets, Schema.org, Open Graph
- ✅ **Accessibilité** : ARIA labels, navigation clavier, contraste WCAG AA
- ✅ **Performance** : Preload des ressources critiques
- ✅ **Responsive** : Design adaptatif mobile, tablette, desktop
- ✅ **Sécurité** : Honeypot anti-spam, validation formulaire
- ✅ **Mobile** : Touch targets ≥ 44px, optimisations tactiles

## 📁 Structure des fichiers

```
.
├── index.html          # Structure HTML principale
├── style.css           # Styles avec design tokens
├── script.js           # JavaScript modulaire
└── README.md           # Documentation (ce fichier)
```

## 🎨 Personnalisation

### Modifier les couleurs

Les couleurs sont centralisées dans les variables CSS (`style.css`, section `:root`).

```css
:root {
    --color-primary: #1e3a8a;      /* Votre couleur principale */
    --color-accent: #18a999;       /* Accent B2B turquoise */
}
```

### Intégrer Calendly

1. Créez un compte sur [Calendly](https://calendly.com)
2. Créez un type d'événement
3. Copiez l'URL de votre calendrier
4. Remplacez dans `index.html` :
```html
<div class="calendly-inline-widget" data-url="https://calendly.com/VOTRE-LIEN"></div>
```

## 📱 Responsive Design

La page est optimisée pour :
- **Mobile** : < 480px
- **Tablette** : 480px - 768px
- **Desktop** : > 768px

## ♿ Accessibilité

- Navigation au clavier
- Attributs ARIA complets
- Contraste des couleurs (WCAG AA)
- Labels pour les formulaires
- Focus visible
- Touch targets ≥ 44px

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Grid, Flexbox, Animations
- **JavaScript ES6+** : Modules, Intersection Observer
- **Calendly** : Intégration de prise de rendez-vous

## 📝 Informations de contact

- **Email** : contact@visinet-conseil.fr
- **Téléphone** : 07 46 25 94 18
- **Adresse** : Île-de-France, France

## 🛠️ Structure JavaScript

Le code JavaScript est organisé en modules :

- `MenuToggle` : Gestion du menu mobile
- `SmoothScroll` : Défilement fluide
- `NavbarScroll` : Effets de scroll sur la navbar
- `ContactForm` : Validation et soumission du formulaire
- `FAQ` : Gestion des questions fréquentes
- `ScrollAnimations` : Animations au scroll

## 📄 Licence

© 2024 Visinet Conseil. Tous droits réservés.

---

**Note** : Cette landing page suit les meilleures pratiques de développement web moderne et est conçue pour être facilement maintenable et extensible, sans dettes techniques.



