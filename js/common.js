import { showError } from "./utils/error.js";
import { showLoader, hideLoader } from "./utils/loader.js";
const apiURL =
  "https://www.galacticvortexcode.no/wp-json/wp/v2/posts?per_page=100";

export async function fetchURL() {
  try {  console.log("fetchURL function called");
    showLoader();

    const response = await fetch(apiURL);
    if (!response.ok) {
      throw Error(`<i class="fa-solid fa-shield-dog"></i>OOOOps! The squerls stole our data.. Status: ${response.status}`);
    }
    const blogList = await response.json();
    hideLoader();

    return blogList;
  
  } catch (error) {
    hideLoader();
    showError(`uh-oh! it seems our doggy servers are napping. Pleas try again later. Error:${error.message}`);
    console.error(
      "An error occorred while fetching data: ${error.message}. Please try again later. ", 
    );
    throw error;
  }
}

function setupHero() {
  const heroContainer = document.querySelector(".hero-container");

  const heroLink = document.createElement("a");
  heroLink.href = "/index.HTML";
  const heroImage = document.createElement("img");
  heroImage.src = "/images/poodleHero.jpg";
  heroImage.alt = "Hero Image of five poodels sitting in the grass";
  const heroTitle = document.createElement("h1");
  heroTitle.textContent = "Kennel Shirkus";

  heroLink.appendChild(heroImage);
  heroLink.appendChild(heroTitle);
  heroContainer.appendChild(heroLink);
}

function createButtons() {
  const buttonContainer = document.querySelector(".button-container");
  const buttonNames = ["Home", "Our dogs", "Blog", "About us", "Contact"];
  const rootPath = "/";
  const buttonLinks = [
    `${rootPath}index.HTML`,
    `${rootPath}dogs.HTML`,
    `${rootPath}AllPosts.HTML`,
    `${rootPath}about.HTML`,
    `${rootPath}contact.HTML`,
  ];

  buttonNames.forEach((name, index) => {
    const button = document.createElement("a");
    button.textContent = name;
    button.classList.add("menu-buttons");
    button.href = buttonLinks[index];

    const buttonElement = document.createElement("button");
    buttonElement.appendChild(button);

    if (name === "Blog") {
      const dropdownContainer = document.createElement("div");
      dropdownContainer.classList.add("dropdown-container");
      buttonElement.appendChild(dropdownContainer);

      const allPostsButton = createDropdownButton(
        "All Posts",
        `${rootPath}allPosts.HTML`
      );
      const PuppiePostsButton = createDropdownButton(
        "Puppies",
        `${rootPath}puppies.HTML`
      );
      const ShowPostsButton = createDropdownButton(
        "Shows",
        `${rootPath}shows.HTML`
      );

      dropdownContainer.appendChild(allPostsButton);
      dropdownContainer.appendChild(PuppiePostsButton);
      dropdownContainer.appendChild(ShowPostsButton);
    }
    buttonContainer.appendChild(buttonElement);
  });
}
function createDropdownButton(name, link) {
  const dropdownButton = document.createElement("a");
  dropdownButton.textContent = name;
  dropdownButton.href = link;
  return dropdownButton;
}

const upButton = document.createElement("button");
upButton.textContent = "^";
upButton.className = "up-button";
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    upButton.style.display = "block";
    upButton.style.bottom = "60px";
  } else {
    upButton.style.bottom = "-100px";
  }
}
upButton.addEventListener("click", async () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

document.body.appendChild(upButton);

function setupFooter() {
  const footerContainer = document.querySelector("footer");
  footerContainer.className = "footer";
  const copyrightText = document.createElement("p");
  copyrightText.textContent = "© KennelShirkus - ALL RIGHTS RESERVED";

  const linksContainer = document.createElement("div");
  linksContainer.className = "footer-links";

  const aboutLink = createFooterLink("About", "about.html");
  const contactLink = createFooterLink("Contact", "contact.HTML");

  linksContainer.appendChild(aboutLink);
  linksContainer.appendChild(contactLink);

  footerContainer.appendChild(copyrightText);
  footerContainer.appendChild(linksContainer);
}

function createFooterLink(text, href) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = href;
  return link;
}

document.addEventListener("DOMContentLoaded", function(){
  
fetchURL();
setupHero();
createButtons();
setupFooter();

});