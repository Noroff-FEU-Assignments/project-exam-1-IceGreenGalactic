import { fetchURL } from "./common.js";
import { createBlogElement } from "./blogList.js";

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

        const bloggElement = document.createElement("div");
        bloggElement.className ="single-post";

        const contentContainer = document.createElement ("div");
        contentContainer.innerHTML = singlePost.content.rendered

        const title = document.createElement("h2");
        title.textContent=singlePost.title.rendered;
        title.className ="title-text";

        document.title = singlePost.title.rendered;



        bloggElement.appendChild(title);
        bloggElement.appendChild(contentContainer)
        blogPostContainer.appendChild(bloggElement);

    }
}


fetchURL().then((posts)=> displaySinglePost(posts));



// const secondaryHeaders = bloggElement.querySelectorAll("p");
// secondaryHeaders.forEach((paragraph) => {
//     const paragraphText = paragraph.outerHTML;
//     if(paragraphText.endsWith ('\n<p>')){
//         paragraph.classList.add("single-post-header2")
//     }
// });