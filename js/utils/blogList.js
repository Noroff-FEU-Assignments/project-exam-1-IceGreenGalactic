import { fetchURL } from "../common.js";
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
