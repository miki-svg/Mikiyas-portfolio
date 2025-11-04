(function() {
  const STORAGE_KEY = "preferred-theme";
  const CLASS_DARK = "dark";

  function getStoredPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function setStoredPreference(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {}
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle(CLASS_DARK, isDark);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.textContent = isDark ? '☀️' : '🌙';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initTheme() {
    const stored = getStoredPreference();
    const initial = stored || (systemPrefersDark() ? 'dark' : 'light');
    applyTheme(initial);
  }

  function toggleTheme() {
    const isCurrentlyDark = document.body.classList.contains(CLASS_DARK);
    const next = isCurrentlyDark ? 'light' : 'dark';
    applyTheme(next);
    setStoredPreference(next);
  }

  function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || elements.length === 0) {
      elements.forEach(el => el.classList.add('show'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  function initAvatarFallback() {
    const img = document.querySelector('.avatar');
    if (!img) return;
    const fallback = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=facearea&facepad=3';
    img.addEventListener('error', function onErr() {
      if (img.dataset.fallbackApplied) return;
      console.warn('Avatar image not found at', img.src, '- applying fallback. Place your photo at assets/profile.jpg');
      img.dataset.fallbackApplied = 'true';
      img.src = fallback;
    }, { once: true });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initRevealAnimations();
    initAvatarFallback();
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
  });
})();

// Contact form using Formspree
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("✅ Thank you! Your message has been sent successfully.");
      form.reset();
    } else {
      alert("❌ Oops! Something went wrong. Please try again.");
    }
  });
});
