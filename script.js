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