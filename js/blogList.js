import { fetchURL } from "./common.js";
export function createBlogElement(post, titleClass, textClass, imageClass){
    const bloggElement = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent=post.title.rendered;
    title.className =titleClass

    const text = document.createElement("p");
    text.innerHTML =post.excerpt.rendered;
    text.className =textClass

    const image = document.createElement("img");
    image.className = imageClass
        image.src = post.jetpack_featured_media_url;
        image.alt = post.title.rendered;

bloggElement.appendChild(title);
bloggElement.appendChild(image);
bloggElement.appendChild(text);

bloggElement.addEventListener ("click", () =>{
    window.location.href = `/singleBlogPost.HTML?id=${post.id}`;
});
return bloggElement;
}

async function displayPuppiesPosts(){
    const blogList = await fetchURL();
    const blogContainer = document.querySelector (".blog-list");
    blogList.forEach((post) =>{
        const puppyCategory = post.categories.includes(47);

        if (puppyCategory){
        const bloggElement = createBlogElement(post, "blog-list-title", "blog-list-text", "blog-list-image");
        blogContainer.appendChild(bloggElement);
    }
    });
}

displayPuppiesPosts();



async function displayShowPosts(){
    const blogList = await fetchURL();
    const blogContainer = document.querySelector (".blog-show-list");
    blogList.forEach((post) =>{
        const puppyCategory = post.categories.includes(52);

        if (puppyCategory){
        const bloggElement = createBlogElement(post, "blog-list-title", "blog-list-text", "blog-list-image");
        blogContainer.appendChild(bloggElement);
    }
    });
}

displayShowPosts();


