import { fetchURL } from "./common.js";
export function createBlogElement(post, titleClass, textClass, imageClass) {
  const bloggElement = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = post.title.rendered;
  title.className = titleClass;

  const text = document.createElement("p");
  text.innerHTML = post.excerpt.rendered;
  text.className = textClass;

  const image = document.createElement("img");
  image.className = imageClass;
  image.src = post.jetpack_featured_media_url;
  image.alt = post.title.rendered;

  bloggElement.appendChild(title);
  bloggElement.appendChild(image);
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

      for (
        let i = startIndex;
        i < startIndex + displayedPosts && i < blogList.length;
        i++
      ) {
        const post = blogList[i];

        if (currentFilterFunction(post)) {
          const bloggElement = createBlogElement(
            post,
            "blog-list-title",
            "blog-list-text",
            "blog-list-image"
          );
          blogContainer.appendChild(bloggElement);
        }
      }

      startIndex += displayedPosts;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "show-more-container";

      const buttonText = document.createElement("span");
      buttonText.className = "more-button-span";
      buttonText.textContent = buttonTextContent;

      const showMoreButton = document.createElement("button");
      showMoreButton.className = "show-more-button";
      showMoreButton.textContent = buttonTextContent;

      const iconElement = document.createElement("i");
      iconElement.className = "fa-solid fa-arrow-down";
      showMoreButton.appendChild(iconElement);

      if (startIndex >= blogList.length) {
        showMoreButton.textContent = "No more posts";
        showMoreButton.removeChild(iconElement);
        showMoreButton.setAttribute("disabled", true);
      } else {
        buttonText.textContent = buttonTextContent;
      }

      showMoreButton.addEventListener("click", async () => {
        await displayPostsInContainer(
          buttonTextContent,
          filterFunction,
          targetContainerClass
        );
        buttonContainer.remove();
      });

      buttonContainer.appendChild(showMoreButton);
      document.body.appendChild(buttonContainer);
    });
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

function filterAllPosts(post) {
  return true;
}
function filterShowPosts(post) {
  return post.categories.includes(52);
}
function filterPuppiesPosts(post) {
  return post.categories.includes(47);
}

displayPostsInContainer(
  "view more posts",
  filterAllPosts,
  "blog-all-posts blog-show-posts blog-puppies-posts"
);
