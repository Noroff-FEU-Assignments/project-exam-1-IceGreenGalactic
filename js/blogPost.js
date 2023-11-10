import { showLoader, hideLoader } from "./utils/loader.js";
import { fetchURL } from "./common.js";

export function createBlogElement(post){
    const bloggElement = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent=post.title.rendered;
    title.className ="blog-title"

    const text = document.createElement("p");
    text.innerHTML =post.excerpt.rendered;
    text.className ="blog-text"

    const image = document.createElement("img");
    image.className = "blog-img"
        image.src = post.jetpack_featured_media_url;
        image.alt = post.title.rendered;

bloggElement.appendChild(title);
bloggElement.appendChild(image);
bloggElement.appendChild(text);

bloggElement.addEventListener ("click", () =>{
    window.location.href = `/blogPost.html?id=${post.id}`;
});
return bloggElement;
}

async function displayAllPosts(){
    const blogList = await fetchURL();
    const blogContainer = document.querySelector (".blog-list");
    blogList.forEach((post) =>{
        const bloggElement = createBlogElement(post, "blog-title", "blog-text", "blog-image");
        blogContainer.appendChild(bloggElement);
    });
}

async function displaySinglePost(){
    const postId = new URLSearchParams(window.location.search).get("id");
    if(!postId){
        console.error("No post with this Id found in the URL");
        return;
    }
    const blogList = await fetchURL();
    const singlePost = blogList.find((post)=> post.id === parseInt(postId));
    if (singlePost){
        const blogPostContainer = document.querySelector(".blog-post-container");

        const title = document.createElement("h2");
        title.textContent=singlePost.title.rendered;
        title.className ="blog-title"
    
        const text = document.createElement("p");
        text.innerHTML =singlePost.excerpt.rendered;
        text.className ="blog-text"
    
        const image = document.createElement("img");
        image.className = "blog-img"
            image.src = singlePost.jetpack_featured_media_url;
            image.alt = singlePost.title.rendered;
            
            blogPostContainer.appendChild(image)
            blogPostContainer.appendChild(title);
            blogPostContainer.appendChild(text)

    }
}


displayAllPosts();
fetchURL().then((posts)=> displaySinglePost(posts));