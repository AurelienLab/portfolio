function initPopovers() {
  const popoverList = document.querySelectorAll(".popover");

  for (const pop of popoverList) {
    const content = pop.dataset.popovercontent;
    const newElement = document.createElement("div");
    newElement.classList.add("popover__content");
    newElement.innerText = content;

    pop.appendChild(newElement);
  }
}
