import { fetchURL } from "./common.js";

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

fetchURL().then((posts)=> displaySinglePost(posts));