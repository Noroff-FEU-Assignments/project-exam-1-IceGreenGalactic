import { fetchURL } from "./common.js";
import { createBlogElement } from "./blogList.js";
import { createModal, addImageClickEvent } from "./utils/modal.js";

document.addEventListener("DOMContentLoaded", function () {
  displaySinglePost();
});
async function displaySinglePost() {
  try {
    const postId = new URLSearchParams(window.location.search).get("id");
    if (!postId) {
      console.error("No post with this Id found in the URL");
      return;
    }
    const blogList = await fetchURL();
    const singlePost = blogList.find((post) => post.id === parseInt(postId));
    if (singlePost) {
      const blogPostContainer = document.querySelector(".blog-post-container");

      const blogElement = document.createElement("div");
      blogElement.className = "single-post";

      const contentContainer = document.createElement("div");
      contentContainer.innerHTML = singlePost.content.rendered;

      const title = document.createElement("h3");
      title.textContent = singlePost.title.rendered;
      title.className = "title-text";

      document.title = singlePost.title.rendered;

      const images = contentContainer.querySelectorAll("img");
      addImageClickEvent(images);

      blogElement.appendChild(title);
      blogElement.appendChild(contentContainer);
      blogPostContainer.appendChild(blogElement);
    }
  } catch (error) {
    console.error("Error fetching and displaying photos", error);
  }
}
