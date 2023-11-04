const URL = "";

export async function fetchURL(URL){
    try{
        const response = await fetch (URL);
        if (!response.ok){
            throw Error ("failed to fetch data");
        }
        const blogList = await response.json();
        return blogList;
    }catch (error){
        const errorMessage = "An error occorred while fetching data. pleas try again later";
        displayMessage (errorMessage);
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
    const buttonNames =[ "Hjem", "Hundene våre", "Valper", "Utstillinger", "Om Oss", "Kontakt oss"];
    const buttonLinks =[ "index.HTML", "hundene.HTML", "valper.HTML", "utstillinger.HTML", "omOss.HTML", "kontakt.HTML"];

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