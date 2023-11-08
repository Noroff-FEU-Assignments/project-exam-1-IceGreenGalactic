import { fetchURL } from "./common.js";

let carousel;
let currentIndex = 0;
const itemsPerPage = 3;
let blogList;

document.addEventListener("DOMContentLoaded", async () =>{
    try{
 carousel = document.querySelector(".carousel-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const maxLength = 150;

function displayPosts (){
    carousel.innerHTML = ``;
    for (let i = currentIndex; i < currentIndex + itemsPerPage && i <blogList.length; i++){
        const post = blogList[i];

        const bloggElement = document.createElement ("div");
        bloggElement.className ="blog-element"
        const title = document.createElement ("h3");
        title.className = "carousel-title";
        title.innerHTML= `${post.title.rendered}`

        const text = document.createElement("p");
        text.className = "carousel-text";
        text.innerHTML =  shortText(post.excerpt.rendered, maxLength);
        
        const img = document.createElement ("img");
        img.className = "carousel-img";
        img.setAttribute ("src", post.jetpack_featured_media_url);

     
        bloggElement.appendChild(img);
        bloggElement.appendChild(title);
        bloggElement.appendChild(text);
        carousel.appendChild(bloggElement);
    }
}

blogList = await fetchURL();
displayPosts();

function shortText (text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

prevButton.addEventListener ("click", () =>{
    if (currentIndex > 0){
        currentIndex -= itemsPerPage;
        displayPosts();
    }
});
nextButton.addEventListener("click", () =>{
    const numItems = blogList.length;
    if (currentIndex + itemsPerPage < numItems ) {
        currentIndex+= itemsPerPage;
        displayPosts();
    }
});
    }catch (error) {
        console.error("An error occorred while fetching data:", error);
    }
});

