(() => {
  const SOCIAL = {
    instagram: "",
    vk: "",
  };

  document.querySelectorAll("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    const url = SOCIAL[key];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      return;
    }
    el.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Ссылку на " + (key === "vk" ? "ВК" : "Instagram") + " добавим после выбора хэндла. Напишите в Telegram");
    });
  });

  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    const holdBrand = () => {
      try {
        heroVideo.pause();
        // кадр с полным титром, до финального fade
        if (heroVideo.duration && !Number.isNaN(heroVideo.duration)) {
          heroVideo.currentTime = Math.min(5.6, Math.max(0, heroVideo.duration - 3.2));
        }
      } catch (_) {
        /* ignore seek errors on some mobile browsers */
      }
    };
    heroVideo.addEventListener("ended", holdBrand);
    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = tabs
      .map((t) => document.getElementById(t.getAttribute("aria-controls")))
      .filter(Boolean);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t, i) => {
          const on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          if (panels[i]) panels[i].hidden = !on;
        });
      });
    });
  });

  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
  }
})();
