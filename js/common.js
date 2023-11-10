import { showLoader,hideLoader } from "./utils/loader.js";
const apiURL = "https://www.galacticvortexcode.no/wp-json/wp/v2/posts";

export async function fetchURL(){
    try{
        showLoader();
        
        const response = await fetch (apiURL);
        if (!response.ok){
            throw Error ("failed to fetch data");
        }
        const blogList = await response.json();
        
        return blogList;
        
    }catch (error){
        console.error ("An error occorred while fetching data. pleas try again later");

    }
}

function setupHero(){
    const heroContainer = document.querySelector(`.hero-container`);
    
    const heroLink = document.createElement("a");
    heroLink.href = "/index.HTML";
    const heroImage = document.createElement("img");
    heroImage.src ="/images/poodleHero.jpg";
    heroImage.alt ="Hero Image of five poodels sitting in the grass";
    const heroTitle = document.createElement("h1");
    heroTitle.textContent = "Kennel Shirkus";
    
    heroLink.appendChild (heroImage);
    heroLink.appendChild(heroTitle);
    heroContainer.appendChild (heroLink);
}

function createButtons(){
    const buttonContainer = document.querySelector (".button-container");
    const buttonNames =[ "Home", "Our dogs", "Puppies", "Shows", "About us", "Contact"];
    const buttonLinks =[ "index.HTML", "dogs.HTML", "puppies.HTML", "shows.HTML", "about.HTML", "contact.HTML"];

    buttonNames.forEach((name, index) =>{
        const button = document.createElement("a");
        button.textContent = name;
        button.href = buttonLinks[index];
        const buttonElement = document.createElement("button");
        buttonElement.appendChild(button);
        buttonContainer.appendChild(buttonElement);
    });
}
fetchURL();
setupHero();
createButtons();