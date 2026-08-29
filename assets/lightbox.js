(function () {
  const galleries = [...document.querySelectorAll(".gallery")];
  const overlay = document.getElementById("lightbox");
  if (!galleries.length || !overlay) return;

  const image = overlay.querySelector("#lightbox-img");
  const caption = overlay.querySelector("#lightbox-caption");

  let slides = [];
  let index = 0;

  const isOpen = () => overlay.classList.contains("open");

  function visibleLinks(gallery) {
    return [...gallery.querySelectorAll(".tile-link")].filter((link) => {
      const tile = link.closest(".tile");
      return !tile || !tile.classList.contains("is-hidden");
    });
  }

  function goTo(next) {
    index = (next + slides.length) % slides.length;
    const link = slides[index];
    image.src = link.getAttribute("href");
    image.alt = link.querySelector("img")?.alt ?? "";
    caption.textContent = link.dataset.title ?? "";
  }

  function open(gallery, link) {
    slides = visibleLinks(gallery);
    const start = slides.indexOf(link);
    if (start === -1) return;
    goTo(start);
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  }

  function close() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    image.src = "";
  }

  for (const gallery of galleries) {
    for (const link of gallery.querySelectorAll(".tile-link")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        open(gallery, link);
      });
    }
  }

  overlay.querySelector(".lightbox-close").addEventListener("click", close);
  overlay.querySelector(".lightbox-prev").addEventListener("click", () => goTo(index - 1));
  overlay.querySelector(".lightbox-next").addEventListener("click", () => goTo(index + 1));
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") goTo(index - 1);
    if (event.key === "ArrowRight") goTo(index + 1);
  });
})();
