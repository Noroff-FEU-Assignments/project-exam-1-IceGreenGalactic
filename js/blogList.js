import { fetchURL } from "./common.js";
import { shorterText } from "./utils/carousel.js";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}
export function createBlogElement(post, titleClass, textClass, imageClass) {
  const bloggElement = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = post.title.rendered;
  title.className = titleClass;

  const text = document.createElement("p");
  if (window.innerWidth <= 600) {
    const maxLength = 150;
    const shortendText = shorterText(post.excerpt.rendered, maxLength);
    text.innerHTML = shortendText;
  } else if (window.innerWidth <= 900) {
    let maxLength = 200;
    text.innerHTML = shorterText(post.excerpt.rendered, maxLength);
  } else {
    text.innerHTML = post.excerpt.rendered;
  }

  text.className = textClass;

  const date = document.createElement("p");
  date.textContent = formatDate(post.date);
  date.className = "date";

  const image = document.createElement("img");
  image.className = imageClass;
  image.src = post.jetpack_featured_media_url;
  image.alt = post.title.rendered;

  bloggElement.appendChild(title);
  bloggElement.appendChild(image);
  bloggElement.appendChild(date);
  bloggElement.appendChild(text);

  bloggElement.addEventListener("click", () => {
    window.location.href = `/singleBlogPost.HTML?id=${post.id}`;
  });
  return bloggElement;
}

let displayedPosts = 10;
let startIndex = 0;

export async function displayPostsInContainer(
  buttonTextContent,
  filterFunction,
  targetContainerClass
) {
  try {
    const blogList = await fetchURL();
    const containerClasses = targetContainerClass.split(" ");

    containerClasses.forEach((targetContainerClass) => {
      const blogContainer = document.querySelector(`.${targetContainerClass}`);
      const buttonContainer = document.querySelector(".show-more-container");
      buttonContainer.className = "show-more-container";

      if (!blogContainer) {
        console.error(
          `container with class "${targetContainerClass}" not found.`
        );
        return;
      }

      let currentFilterFunction = filterAllPosts;
      if (targetContainerClass.includes("blog-show-posts")) {
        currentFilterFunction = filterShowPosts;
      } else if (targetContainerClass.includes("blog-puppies-posts")) {
        currentFilterFunction = filterPuppiesPosts;
      }

      const filteredPosts = blogList.filter(currentFilterFunction);
      let remainingPost = displayedPosts;

      for (
        let i = startIndex;
        i < startIndex + displayedPosts && i < blogList.length;
        i++
      ) {
        const post = filteredPosts[i];

        if (currentFilterFunction(post)) {
          const bloggElement = createBlogElement(
            post,
            "blog-list-title",
            "blog-list-text",
            "blog-list-image"
          );
          blogContainer.appendChild(bloggElement);
          remainingPost--;
        }
      }

      startIndex += displayedPosts - remainingPost;

      let initalButtonText = "view more posts";

      const buttonText = document.createElement("span");
      buttonText.className = "more-button-span";
      buttonText.textContent = buttonTextContent;

      const showMoreButton = document.createElement("button");
      showMoreButton.className = "show-more-button";
      showMoreButton.textContent = buttonTextContent;

      const iconElement = document.createElement("i");
      iconElement.className = "fa-solid fa-arrow-down";
      showMoreButton.textContent = initalButtonText;

      showMoreButton.appendChild(iconElement);

      showMoreButton.addEventListener("click", async () => {
        showMoreButton.textContent = "Loading...";
        await displayPostsInContainer(
          showMoreButton,
          filterFunction,
          targetContainerClass
        );
        showMoreButton.remove();
      });

      if (remainingPost != 0) {
        showMoreButton.textContent = "No more posts";
        showMoreButton.setAttribute("disabled", true);
      }

      buttonContainer.appendChild(showMoreButton);
    });
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

function filterAllPosts(post) {
  return true;
}
function filterShowPosts(post) {
  return post && post.categories.includes(52);
}
function filterPuppiesPosts(post) {
  return post && post.categories.includes(47);
}
document.addEventListener("DOMContentLoaded", () => {
  displayPostsInContainer(
    "view more posts",
    filterAllPosts,
    "blog-all-posts blog-show-posts blog-puppies-posts"
  );
});
