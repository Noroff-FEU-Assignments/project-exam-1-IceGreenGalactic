import { fetchURL } from "../common.js";
import { createBlogElement } from "../blogList.js";
import { showError, hideError } from "./error.js";

let carousel;
let currentIndex = 0;
let itemsPerPage;
let blogList;
let nextButton;

function shorterText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength) + "[...]"
    : text;
}
function setItemsPerPage() {
  if (window.innerWidth >= 1200) {
    itemsPerPage = 4;
  } else if (window.innerWidth >= 700) {
    itemsPerPage = 3;
  } else if (window.innerWidth >= 515) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 1;
  }
}

function displayPosts() {
  carousel.innerHTML = ``;
  const recentPosts = blogList.slice(0, 9);
  for (
    let i = currentIndex;
    i < currentIndex + itemsPerPage && i < recentPosts.length;
    i++
  ) {
    const post = blogList[i];
    const blogElement = createBlogElement(
      post,
      "carousel-title",
      "carousel-text",
      "carousel-img"
    );

    const maxLength =
      window.innerWidth >= 1000 ? 190 : window.innerWidth >= 820 ? 180 : 120;

    const shortText = shorterText(post.excerpt.rendered, maxLength);
    blogElement.querySelector(".carousel-text").innerHTML = shortText;
    carousel.appendChild(blogElement);
  }
  nextButton.disabled = currentIndex + itemsPerPage >= recentPosts.length;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    carousel = document.querySelector(".carousel-container");
    const prevButton = document.querySelector(".prev-button");
    nextButton = document.querySelector(".next-button");

    if (!blogList) {
      blogList = await fetchURL();
    }
    setItemsPerPage();
    displayPosts();

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex -= itemsPerPage;
        displayPosts();
      }
    });
    nextButton.addEventListener("click", () => {
      const numItems = blogList.length;
      if (currentIndex + itemsPerPage < numItems) {
        currentIndex += itemsPerPage;
        displayPosts();
      }
    });

    window.addEventListener("resize", () => {
      setItemsPerPage();
      displayPosts();
    });
  } catch (error) {
    console.error("An error occorred while fetching data:", error);
  }
});
