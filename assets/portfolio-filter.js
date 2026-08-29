(function () {
  const bar = document.querySelector(".filter-bar");
  if (!bar) return;

  const buttons = [...bar.querySelectorAll(".filter-btn")];
  const tiles = [...document.querySelectorAll("#portfolio-gallery .tile")];

  function showCategory(category) {
    for (const tile of tiles) {
      const matches = category === "all" || tile.dataset.category === category;
      tile.classList.toggle("is-hidden", !matches);
    }
  }

  function select(button) {
    for (const other of buttons) {
      other.classList.toggle("is-active", other === button);
    }
    showCategory(button.dataset.filter);
  }

  for (const button of buttons) {
    button.addEventListener("click", () => select(button));
  }

  const requested = new URLSearchParams(location.search).get("filter");
  const preselected = buttons.find((button) => button.dataset.filter === requested);
  if (preselected) select(preselected);
})();
