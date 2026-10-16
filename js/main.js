document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(activeTab, moveFocus = false) {
    tabButtons.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
      panel.hidden = panel.id !== activeTab.getAttribute("aria-controls");
    });

    if (moveFocus) activeTab.focus();
  }

  tabButtons.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabButtons.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateTab(tabButtons[nextIndex], true);
    });
  });

  const dialog = document.querySelector(".trailer-dialog");
  const trailerFrame = dialog?.querySelector("iframe");
  const trailerButton = document.querySelector(".trailer-trigger");
  const closeButton = dialog?.querySelector(".dialog-close");

  trailerButton?.addEventListener("click", () => {
    if (!dialog || !trailerFrame) return;
    trailerFrame.src = trailerFrame.dataset.src;
    dialog.showModal();
  });

  closeButton?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener("close", () => {
    if (trailerFrame) trailerFrame.src = "";
    trailerButton?.focus();
  });
});
