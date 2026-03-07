// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link
navMenu?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  navMenu.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
});

// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || "dark");

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Contact form -> Formspree (AJAX)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  formNote.textContent = "Envoi en cours...";
  const formData = new FormData(contactForm);

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      contactForm.reset();
      formNote.textContent = "Message envoyé ! Je te réponds dès que possible.";
    } else {
      const data = await res.json().catch(() => null);
      formNote.textContent = data?.errors?.[0]?.message
          ? `Erreur : ${data.errors[0].message}`
          : "Erreur : impossible d’envoyer le message.";
    }
  } catch (err) {
    formNote.textContent = "Erreur réseau. Réessaie plus tard.";
  }
});

// Projects Modal
const projectsData = [
  {
    title: "Musical puzzle",
    image: "assets/puzzle.png",
    description: "Jeu de puzzle musical collaboratif développé en React et TypeScript.",
    details: "Application web réalisée en React + TypeScript permettant de jouer à un puzzle musical collaboratif, avec saisie d’UID, sélection de sons, réponses via API et affichage des statistiques des groupes.",
    features: [
      "Saisie et stockage local de l’UID",
      "Sélection et lecture de sons",
      "Réponses au puzzle via API",
      "Affichage des messages de succès et d’erreur",
      "Page de statistiques des groupes"
    ],
    stack: [
      "React",
      "API REST",
      "TypeScript",
      "localStorage"
    ],
    learning: [
      "Gestion d’état avec React",
      "Utilisation de TypeScript dans une application React",
      "Communication avec une API REST",
      "Manipulation de données et rendu conditionnel",
      "Structuration de composants et bonnes pratiques"
    ],
    technologies: ["React", "TypeScript", "API REST", "localStorage"]
  },
  {
    title: "Gestion de tournois",
    image: "assets/tournois.png",
    description: "Application web de gestion de tournois pour établissements.",
    details: "Application web de gestion de tournois personnalisé pour des établissements scolaires.",
    features: [
        "Analyse du besoin client",
        "Méthodologie Agile",
        "CRUD + validation",
        "Phase finale personnalisée",
        "Base de données"
    ],
    stack: [
        "Front : Bootstrap, HTML/CSS",
        "Back : PHP/Symfony",
        "DB : MySQL"
    ],
    learning: [
        "Analyse et gestion de projet",
        "Développement Full-Stack",
        "Design de base de données",
        "Validation de formulaires"
    ],
    technologies: ["SQL", "PHP/Symfony", "Bootstrap"]
  },
  {
    title: "Site web statique",
    image: "assets/site.png",
    description: "Site responsive sur la santé.",
    details: "Création d'un site web statique autour de la santé, ici du judo , avec un accent sur la qualité du code.",
    features: [
        "Site responsive",
        "Formulaire de contact",
        "Lighthouse Performance : 95/100",
        "Fiche persona et parcours utilisateur",
        "Maquette et prototype sur Figma"
    ],
    stack: [
        "HTML5",
        "CSS3",
        "Figma"
    ],
    learning: [
        "Analyse de besoins et conception UX",
        "Responsive design",
        "Performance web",
        "Accessibilité Web"
    ],
    technologies: ["HTML", "CSS"]
  },
  {
    title: "Visualisation de données",
    image: "assets/graphique.png",
    description: "Stockage, interface et génération de graphiques.",
    details: "Gestion d'une BDD avec automatisation des requêtes en python et interface graphique en C# pour générer des graphiques.",
    features: [
        "Création / modélisation de la BDD",
        "Requêtes automatisées en Python",
        "Interface C# pour afficher les données",
        "Génération de graphiques à partir des données"
    ],
    stack: [
        "DB : SQL ",
        "Backend : Python",
        "Frontend : C# WinForms"
    ],
    learning: [
      "Modélisation de données",
      "Scripts d'automatisation",
      "Intégration multi-technologies"
    ],
    technologies: ["SQL", "Python", "C#"]
  },
  {
    title: "Jeu de plateau",
    image: "assets/lowatem.png",
    description: "Application pour gérer des parties de jeu de plateau et création d'une IA.",
    details: "Une application Java pour gérer des parties de jeu de plateau et création d'une IA pour y jouer.",
    features: [
      "Gestion des joueurs",
      "Suivi des scores",
      "Implémentation de règles complexes",
      "Création d'une IA pour jouer contre les utilisateurs"
    ],
    stack: [
      "Java",
    ],
    learning: [
      "Création d'IA basique",
      "Gestion des événements",
      "Programmation orientée objet"
    ],
    technologies: ["Java"]
  },
  {
    title: "Visualisation de graphe",
    image: "assets/graphes.png",
    description: "Outil interactif pour visualiser des graphes.",
    details: "Un outil Java permettant de visualiser des graphes selon différents algorithmes.",
    features: [
      "Affichage interactif",
      "Personnalisation des graphes",
    ],
    stack: [
      "Java",
    ],
    learning: [
      "Manipulation de données",
      "Création de visualisations",
      "Implementation d'algorithmes de graphes"
    ],
    technologies: ["Java"]
  },
  {
    title: "Installation de poste",
    image: "assets/vm.png",
    description: "Installation et configuration d'une machine virtuelle sous linux.",
    details: "Installation et configuration d'une machine virtuelle sous linux sous contraintes de stockage, et rédaction d'un manuelle technique.",
    features: [
      "Configuration réseau",
      "Installation de linux",
      "Optimisation de l'espace de stockage",
      "Rédaction d'un manuel technique détaillé"
    ],
    stack: [
      "Bash",
      "Linux Mint"
    ],
    learning: [
        "Configuration de Linux",
        "Avantages et inconvénients des machines virtuelles",
        "Redaction technique"
    ],
    technologies: ["Bash", "Linux"]
  }
];

const projectModal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

function openProjectModal(index) {
  const project = projectsData[index];
  if (!project) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 24px;">
      ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 16px; margin-bottom: 16px; border: 1px solid var(--border);">` : `<div style="width: 100%; height: 250px; background: var(--card); border-radius: 16px; margin-bottom: 16px; border: 1px solid var(--border);"></div>`}
      <h2 style="margin: 0 0 8px; font-size: 1.8rem;">${project.title}</h2>
      <p style="margin: 0 0 12px; color: var(--muted);">${project.description}</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
      </div>
    </div>

    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: 16px;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 1.2rem;">Résumé</h3>
      <p style="margin: 0; color: var(--muted);">${project.details}</p>
    </div>

    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: 16px;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 1.2rem;">Fonctionnalités</h3>
      <ul style="margin: 0; padding-left: 20px; color: var(--muted);">
        ${project.features.map(feat => `<li style="margin: 6px 0;">✔ ${feat}</li>`).join('')}
      </ul>
    </div>

    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: 16px;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 1.2rem;">Stack & outils</h3>
      <ul style="margin: 0; padding-left: 20px; color: var(--muted);">
        ${project.stack.map(item => `<li style="margin: 6px 0;">${item}</li>`).join('')}
      </ul>
    </div>

    <div style="border-top: 1px solid var(--border); padding-top: 16px; margin-top: 16px;">
      <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 1.2rem;">Ce que j'ai appris</h3>
      <ul style="margin: 0; padding-left: 20px; color: var(--muted);">
        ${project.learning.map(item => `<li style="margin: 6px 0;">${item}</li>`).join('')}
      </ul>
    </div>
  `;

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
}

function closeProjectModal() {
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
}

// Event listeners for project cards
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const projectIndex = card.getAttribute("data-project");
    openProjectModal(parseInt(projectIndex));
  });

  // Keyboard support for accessibility
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const projectIndex = card.getAttribute("data-project");
      openProjectModal(parseInt(projectIndex));
    }
  });
});

modalClose?.addEventListener("click", closeProjectModal);
modalOverlay?.addEventListener("click", closeProjectModal);

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});
