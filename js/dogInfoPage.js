import { createModal, addImageClickEvent } from "./utils/modal.js";

document.addEventListener("DOMContentLoaded", function () {
  setupDogInfoPage();
});

function setupDogInfoPage() {
  const dogInfoContainer = document.querySelector(".dogs-info");
  const dogInfoElement = document.createElement("div");
  dogInfoElement.className = "dog-info";
  dogInfoContainer.appendChild(dogInfoElement);
  const images = dogInfoContainer.querySelectorAll("img");
  addImageClickEvent(images);
}
