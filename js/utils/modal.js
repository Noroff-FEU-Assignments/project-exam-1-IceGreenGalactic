export function createModal(imageSrc, altText, index) {
  const modal = document.createElement("dialog");
  modal.className = "modal";

  const modalImage = document.createElement("img");
  modalImage.src = imageSrc;
  modalImage.alt = altText;

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  const iconElement = document.createElement("i");
  iconElement.className = "fa-regular fa-circle-xmark";
  closeButton.appendChild(iconElement);

  closeButton.addEventListener("click", () => modal.close());

  modal.appendChild(modalImage);
  modal.appendChild(closeButton);
  document.body.appendChild(modal);

  modal.showModal();

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

export function addImageClickEvent(images) {
  images.forEach((img, index) => {
    img.addEventListener("click", function () {
      createModal(this.src, this.alt, index);
    });
  });
}
