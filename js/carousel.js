import { fetchURL } from "./common.js";

let carousel;
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", async () =>{
    try{
 carousel = document.querySelector(".carousel-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");


function displayPosts (blogList){
    blogList.forEach((post) =>{
        const item = document.createElement ("div");
        item.className = "carousel-item";
        item.innerHTML= `<h3>${post.title.rendered}</h3>
        ${post.content.rendered}`;
        carousel.appendChild(item);
    });
}
const blogList = await fetchURL();
displayPosts(blogList);
updateCarousel();


prevButton.addEventListener ("click", () =>{
    if (currentIndex > 0){
        currentIndex --;
        updateCarousel();
    }
});
nextButton.addEventListener("click", () =>{
    const numItems = carousel.querySelectorAll (".carousel-item").length;
    if (currentIndex < numItems - 3) {
        currentIndex++;
        updateCarousel();
    }
});
    }catch (error) {
        console.error("An error occorred while fetching data:", error);
    }
});

function updateCarousel(){
    const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
    carousel.style.transform = `translateX(${currentIndex * (itemWidth + 10)}px)`;
}