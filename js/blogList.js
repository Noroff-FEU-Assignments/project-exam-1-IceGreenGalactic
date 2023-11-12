import { fetchURL } from "./common.js";
export function createBlogElement(post, titleClass, textClass, imageClass) {
    const bloggElement = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = post.title.rendered;
    title.className = titleClass

    const text = document.createElement("p");
    text.innerHTML = post.excerpt.rendered;
    text.className = textClass

    const image = document.createElement("img");
    image.className = imageClass
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

async function displayPuppiesPosts() {
    const blogList = await fetchURL();
    const blogContainer = document.querySelector(".blog-list");
    


    for (let i = startIndex; i < startIndex + displayedPosts; i++) {
        const post = blogList[i];

        if (!post) {
            break;
        }

        if (post.categories.includes(47)) {
            const bloggElement = createBlogElement(post, "blog-list-title", "blog-list-text", "blog-list-image");
            blogContainer.appendChild(bloggElement);
        }
    }

    startIndex += displayedPosts;

    if (startIndex < blogList.length) {
        const buttonContainer = document.createElement ("div");
        buttonContainer.className ="show-more-container";
        
        const buttonText = document.createElement("span");
        buttonText.className ="more-button-span"
        buttonText.textContent = "view more posts";
        
        const showMoreButton = document.createElement("button");
        showMoreButton.className = "show-more-button"
        const iconElement = document.createElement("i");
        iconElement.className = "fa-solid fa-arrow-down"
        showMoreButton.appendChild(iconElement);


        showMoreButton.addEventListener("click", () => {
            displayPuppiesPosts();
            buttonContainer.remove();
            
            if (startIndex >= blogList.length){
                buttonText.textContent = "No more posts";
                showMoreButton.removeChild(iconElement);
            }
        });
        buttonContainer.appendChild(buttonText);
        buttonContainer.appendChild(showMoreButton)
        document.body.appendChild(buttonContainer);
    }
}

displayPuppiesPosts();



async function displayShowPosts() {
    const blogList = await fetchURL();
    const blogContainer = document.querySelector(".blog-show-list");
    blogList.forEach((post) => {
        const puppyCategory = post.categories.includes(52);

        if (puppyCategory) {
            const bloggElement = createBlogElement(post, "blog-list-title", "blog-list-text", "blog-list-image");
            blogContainer.appendChild(bloggElement);
        }
    });
}

displayShowPosts();


