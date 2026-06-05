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

  function getInheritTags() {
    const config = getConfig();
    if (!config) return true;
    return (config.getAttribute("data-inherit-tags") || "true") === "true";
  }

  function applyConfigVars(footer) {
    const config = getConfig();
    if (!config) return;

    const vars = [
      "--deckroadmap-font-size",
      "--deckroadmap-bottom",
      "--deckroadmap-active-color",
      "--deckroadmap-done-color",
      "--deckroadmap-todo-color",
      "--deckroadmap-active-bg-color",
      "--deckroadmap-done-bg-color",
      "--deckroadmap-todo-bg-color"
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

  function getAllSlides() {
    return Array.from(document.querySelectorAll(".reveal .slides section"));
  }

function resolveCurrentRoadmap(slide) {
  if (!slide) return { mode: "neutral", value: null };

  const explicit = slide.getAttribute("data-roadmap");

  if (explicit === "none") {
    return { mode: "hidden", value: null };
  }

  if (explicit) {
    return { mode: "tagged", value: explicit };
  }

  if (!getInheritTags()) {
    return { mode: "neutral", value: null };
  }

  const slides = getAllSlides();
  const currentIndex = slides.indexOf(slide);
  if (currentIndex === -1) {
    return { mode: "neutral", value: null };
  }

  for (let i = currentIndex - 1; i >= 0; i--) {
    const tag = slides[i].getAttribute("data-roadmap");

    if (!tag || tag === "none") {
      continue;
    }

    return { mode: "inherited", value: tag };
  }

  return { mode: "neutral", value: null };
}
  function renderRoadmap() {
    const sections = getSections();
    if (!sections.length) return;

    const slide = getCurrentSlide();
    if (!slide) return;

    const footer = ensureFooter();
    const resolved = resolveCurrentRoadmap(slide);

    if (resolved.mode === "hidden") {
      footer.style.display = "none";
      return;
    }

    footer.style.display = "";
    const current = resolved.value;
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
      }

      const label = document.createElement("span");
      label.className = "roadmap-label";
      label.textContent = section;

      item.appendChild(label);
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