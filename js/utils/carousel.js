import { fetchURL } from "../common.js";
import { createBlogElement } from "../blogList.js";

let carousel;
let currentIndex = 0;
let itemsPerPage;
let blogList;

document.addEventListener("DOMContentLoaded", async () =>{
    try{
 carousel = document.querySelector(".carousel-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const maxLength = 150;

blogList=await fetchURL();

function setItemsPerPage(){
    if (window.innerWidth >= 1500){
        itemsPerPage = 4;
    }else if(window.innerWidth >= 900){
        itemsPerPage = 3;
    }else{
        itemsPerPage = 2;
    }
}
    setItemsPerPage();
    displayPosts();

function displayPosts (){
    carousel.innerHTML = ``;
    for (let i = currentIndex; i < currentIndex + itemsPerPage && i <blogList.length; i++){
        const post = blogList[i];
        const bloggElement = createBlogElement(post, "carousel-title", "carousel-text", "carousel-img");
        const shortText = shorterText(post.excerpt.rendered, maxLength);
        bloggElement.querySelector(".carousel-text").innerHTML = shortText
        carousel.appendChild(bloggElement);
    }
}


function shorterText (text, maxLength) {
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

window.addEventListener("resize", ()=>{
    setItemsPerPage();
    displayPosts();
});
    }catch (error) {
        console.error("An error occorred while fetching data:", error);
    }
});

