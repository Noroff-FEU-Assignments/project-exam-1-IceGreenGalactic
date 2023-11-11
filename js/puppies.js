import { fetchURL } from "./common.js";
import { createBlogElement } from "./utils/blogList.js";

async function displayAllPosts(){
    const blogList = await fetchURL();
    const blogContainer = document.querySelector (".blog-list");
    blogList.forEach((post) =>{
        const bloggElement = createBlogElement(post, "blog-title", "blog-text", "blog-image");
        blogContainer.appendChild(bloggElement);
    });
}

displayAllPosts();