(() => {
  const SOCIAL = {
    // Подставьте финальные хэндлы, когда выберете
    instagram: "",
    vk: "",
  };

  function wireSocials() {
    document.querySelectorAll("[data-social]").forEach((el) => {
      const key = el.getAttribute("data-social");
      const url = SOCIAL[key];
      if (url) {
        el.href = url;
        return;
      }
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const status = document.getElementById("form-status");
        if (status) {
          status.dataset.tone = "";
          status.textContent = "Ссылку на " + (key === "vk" ? "ВК" : "Instagram") + " скоро добавим. Напишите в Telegram или оставьте заявку";
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function wireTabs(root) {
    if (!root) return;
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = tabs
      .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
      .filter(Boolean);

    function activate(next) {
      tabs.forEach((tab, i) => {
        const on = tab === next;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        if (panels[i]) panels[i].hidden = !on;
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab));
    });
  }

  function wireReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function wireForm() {
    const form = document.getElementById("lead-form");
    const status = document.getElementById("form-status");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      const consent = form.querySelector("#pd_consent");
      const required = [...form.querySelectorAll("[required]")];
      const missing = required.filter((el) => {
        if (el.type === "checkbox") return !el.checked;
        return !String(el.value || "").trim();
      });

      if (missing.length) {
        e.preventDefault();
        status.dataset.tone = "error";
        status.textContent = "Заполните обязательные поля и отметьте согласие на обработку персональных данных";
        missing[0].focus();
        return;
      }

      if (!consent.checked) {
        e.preventDefault();
        status.dataset.tone = "error";
        status.textContent = "Нужно согласие на обработку персональных данных";
        consent.focus();
        return;
      }

      status.dataset.tone = "";
      status.textContent = "Отправляем заявку";
    });
  }

  document.querySelectorAll("[data-audience], [data-audience-formats]").forEach(wireTabs);
  wireSocials();
  wireReveal();
  wireForm();
})();
