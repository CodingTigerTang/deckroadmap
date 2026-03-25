document.addEventListener("DOMContentLoaded", function () {
  function getConfig() {
    return document.querySelector("#roadmap-config");
  }

  function getSections() {
    const config = getConfig();
    if (!config) return [];

    const raw = config.getAttribute("data-sections") || "";
    return raw.split("|").map(x => x.trim()).filter(Boolean);
  }

  function getStyleName() {
    const config = getConfig();
    if (!config) return "pill";

    return config.getAttribute("data-style") || "pill";
  }

  function applyConfigVars(footer) {
    const config = getConfig();
    if (!config) return;

    const vars = [
      "--deckroadmap-font-size",
      "--deckroadmap-bottom",
      "--deckroadmap-active-bg-color",
      "--deckroadmap-done-bg-color",
      "--deckroadmap-todo-bg-color",
      "--deckroadmap-active-color",
      "--deckroadmap-done-color",
      "--deckroadmap-todo-color"
    ];

    vars.forEach(function (v) {
      const value = config.style.getPropertyValue(v);
      if (value) {
        footer.style.setProperty(v, value.trim());
      }
    });
  }

  function ensureFooter() {
    let footer = document.querySelector(".roadmap-footer");

    if (!footer) {
      footer = document.createElement("div");

      const revealRoot = document.querySelector(".reveal");
      if (revealRoot) {
        revealRoot.appendChild(footer);
      } else {
        document.body.appendChild(footer);
      }
    }

    footer.className = "roadmap-footer style-" + getStyleName();
    applyConfigVars(footer);

    return footer;
  }

  function getCurrentSlide() {
    if (window.Reveal && typeof Reveal.getCurrentSlide === "function") {
      return Reveal.getCurrentSlide();
    }

    return document.querySelector(".reveal section.present");
  }

  function renderRoadmap() {
    const sections = getSections();
    if (!sections.length) return;

    const slide = getCurrentSlide();
    if (!slide) return;

    const footer = ensureFooter();
    const current = slide.getAttribute("data-roadmap");
    const currentIndex = sections.indexOf(current);

    footer.innerHTML = "";

    sections.forEach((section, i) => {
      const item = document.createElement("span");
      item.className = "roadmap-item";

      if (i === 0) item.classList.add("is-first");
      if (i === sections.length - 1) item.classList.add("is-last");

      if (currentIndex !== -1) {
        if (i < currentIndex) item.classList.add("done");
        else if (i === currentIndex) item.classList.add("active");
        else item.classList.add("todo");
      } else {
        item.classList.add("todo");
      }

      item.textContent = section;
      footer.appendChild(item);

      if (i < sections.length - 1) {
        const sep = document.createElement("span");
        sep.className = "roadmap-sep";
        sep.textContent = "•";
        footer.appendChild(sep);
      }
    });
  }

  if (window.Reveal && typeof Reveal.on === "function") {
    Reveal.on("ready", renderRoadmap);
    Reveal.on("slidechanged", renderRoadmap);
  }

  renderRoadmap();
  setTimeout(renderRoadmap, 200);
});