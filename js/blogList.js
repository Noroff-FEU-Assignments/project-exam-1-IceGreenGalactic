import { fetchURL } from "./common.js";

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

function shorterText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength) + "[...]"
    : text;
}
export function createBlogElement(post, titleClass, textClass, imageClass) {
  const blogElement = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = post.title.rendered;
  title.className = titleClass;

  const text = document.createElement("p");
  if (window.innerWidth <= 900) {
    const maxLength = 200;
    const shortendText = shorterText(post.excerpt.rendered, maxLength);
    text.innerHTML = shortendText;
  } else {
    let maxLength = 250;
    text.innerHTML = shorterText(post.excerpt.rendered, maxLength);
  }

  text.className = textClass;

  const date = document.createElement("p");
  date.textContent = formatDate(post.date);
  date.className = "date";

  const image = document.createElement("img");
  image.className = imageClass;
  image.src = post.jetpack_featured_media_url;
  image.alt = post.title.rendered;

  const readMore = document.createElement ("span");
  readMore.textContent= "Read more";
  readMore.className = "read-more"

  blogElement.appendChild(title);
  blogElement.appendChild(image);
  blogElement.appendChild(date);
  blogElement.appendChild(text);
  blogElement.appendChild(readMore);

  blogElement.addEventListener("click", () => {
    window.location.href = `/singleBlogPost.HTML?id=${post.id}`;
  });
  return blogElement;
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
        const isExpectedContainer = isExpectedContainerOnCurrentPage (targetContainerClass);
        
        if(!isExpectedContainer){
          //if container is not ecpected, no error logged.
        return;
      }
      
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
          const blogElement = createBlogElement(
            post,
            "blog-list-title",
            "blog-list-text",
            "blog-list-image"
          );
          blogContainer.appendChild(blogElement);
          remainingPost--;
        }
      }

      startIndex += displayedPosts - remainingPost;

      if (isExpectedContainerOnCurrentPage(targetContainerClass)){
        const buttonContainer = document.querySelector(".show-more-container");
        buttonContainer.className = "show-more-container";
  
        if(buttonContainer){
      let initalButtonText = "view more posts";

   

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
    }
  }
 });
  } catch (error) {
    console.error("error fetching and displaying posts:", error);
  }
}

function isExpectedContainerOnCurrentPage(ContainerClass){
  //removes error if targetClass is correct
  const currentPageURL = window.location.href;

  if (currentPageURL.includes("puppies")){
    return ContainerClass.includes("blog-puppies-posts");
  }
  else if (currentPageURL.includes("show")){
    return ContainerClass.includes("blog-show-posts");
  }else if(currentPageURL.includes("all")){
    return ContainerClass.includes ("blog-all-posts");
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
