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
    image: "",
    description: "Puzzle musical collaboratif en React.",
    details: "Site pour jouer à un puzzle musical collaboratif en React.",
    features: [
      "Authentification",
      "Requête API",
      "Contextes, hooks, providers..."
    ],
    stack: [
      "Front : React, JavaScript",
      "API REST",
      "Authentification",
    ],
    learning: [
      "Gestion d'état avec React",
      "Communication avec une API",
      "Collaboration en temps réel"
    ],
    technologies: ["React", "API", "Auth"]
  },
  {
    title: "Gestion de tournois",
    image: "",
    description: "Application de gestion pour établissements.",
    details: "Application web de gestion de tournois à destination d'établissements scolaires.",
    features: [
      "Analyse du besoin client",
      "CRUD + validation",
      "Base de données"
    ],
    stack: [
      "Front : Bootstrap, HTML/CSS",
      "Back : PHP/Symfony",
      "DB : MySQL"
    ],
    learning: [
      "Développement Full-Stack",
      "Design de base de données",
      "Validation de formulaires"
    ],
    technologies: ["SQL", "PHP/Symfony", "Bootstrap"]
  },
  {
    title: "Site web statique",
    image: "",
    description: "Site responsive sur la santé.",
    details: "Création d'un site web statique sur la santé, avec un accent sur la qualité du code.",
    features: [
      "Site responsive",
      "Formulaire de contact",
      "Lighthouse Performance : 95/100"
    ],
    stack: [
      "HTML5 sémantique",
      "CSS3 moderne",
      "Mobile-first"
    ],
    learning: [
      "Responsive design",
      "Performance et SEO",
      "Accessibilité Web"
    ],
    technologies: ["HTML", "CSS"]
  },
  {
    title: "Gestion de BDD",
    image: "",
    description: "Automatisation et interface graphique.",
    details: "Gestion d'une BDD avec automatisation des requêtes et interface graphique.",
    features: [
      "Création / modélisation de la BDD",
      "Requêtes automatisées en Python",
      "Interface C# pour afficher les données"
    ],
    stack: [
      "DB : SQL (Oracle/MySQL)",
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
    description: "Application pour gérer des parties de jeu de plateau.",
    details: "Une application Java pour gérer des parties de jeu de plateau avec une interface utilisateur Swing.",
    features: [
      "Gestion des joueurs",
      "Suivi des scores",
      "Interface utilisateur intuitive"
    ],
    stack: [
      "Java",
      "Swing"
    ],
    learning: [
      "Développement d'interface utilisateur",
      "Gestion des événements",
      "Programmation orientée objet"
    ],
    technologies: ["Java", "Swing"]
  },
  {
    title: "Visualisation de graphe",
    image: "assets/graphes.png",
    description: "Outil interactif pour visualiser des graphes.",
    details: "Un outil Python permettant de visualiser des graphes avec Matplotlib.",
    features: [
      "Affichage interactif",
      "Personnalisation des graphes",
      "Export des résultats"
    ],
    stack: [
      "Python",
      "Matplotlib"
    ],
    learning: [
      "Manipulation de données",
      "Création de visualisations",
      "Utilisation de bibliothèques Python"
    ],
    technologies: ["Python", "Matplotlib"]
  },
  {
    title: "Installation de poste",
    image: "assets/vm.png",
    description: "Automatisation de l'installation et configuration de postes.",
    details: "Un script Bash et Ansible pour automatiser l'installation et la configuration des postes de travail.",
    features: [
      "Installation automatisée",
      "Configuration réseau",
      "Déploiement de logiciels"
    ],
    stack: [
      "Bash",
      "Ansible"
    ],
    learning: [
      "Automatisation des tâches",
      "Gestion de configuration",
      "Scripting avancé"
    ],
    technologies: ["Bash", "Ansible"]
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
