import { showError } from "./utils/error.js";
import { showLoader, hideLoader } from "./utils/loader.js";
const apiURL =
  "https://www.galacticvortexcode.no/wp-json/wp/v2/posts?per_page=100";

export async function fetchURL() {
  try {
    showLoader();

    const response = await fetch(apiURL);
    if (!response.ok) {
      throw Error(
        `<i class="fa-solid fa-shield-dog"></i>OOOOps! The squerls stole our data.. Status: ${response.status}`
      );
    }
    const blogList = await response.json();
    hideLoader();

    return blogList;
  } catch (error) {
    hideLoader();
    showError(
      `<i class="fa-solid fa-shield-dog"></i> <br> OOOOps! The squerls stole our data... Error:${error.message}`
    );
    console.error(
      "An error occorred while fetching data: ${error.message}. Please try again later. "
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

    if (name.toLowerCase() === "our dogs") {
      const dogsDropdownContainer = document.createElement("div");
      dogsDropdownContainer.classList.add("dogs-dropdown-container");
      buttonElement.appendChild(dogsDropdownContainer);
      const allDogsButton = createDropdownButton(
        "All dogs",
        `${rootPath}dogs.HTML`
      );
      const zizuButton = createDropdownButton(
        "Zizu",
        `${rootPath}DogsInfo/zizu.HTML`
      );
      const rayaButton = createDropdownButton(
        "Raya",
        `${rootPath}DogsInfo/Raya.HTML`
      );
      const zpiceyButton = createDropdownButton(
        "Zpicey",
        `${rootPath}DogsInfo/zpicey.HTML`
      );
      const eeveeButton = createDropdownButton(
        "Eevee",
        `${rootPath}DogsInfo/eevee.HTML`
      );
      const fantButton = createDropdownButton(
        "Fant",
        `${rootPath}DogsInfo/fant.HTML`
      );
      const nalaButton = createDropdownButton(
        "Nala",
        `${rootPath}DogsInfo/nala.HTML`
      );
      const zieraButton = createDropdownButton(
        "Ziera",
        `${rootPath}DogsInfo/ziera.HTML`
      );
      const izzyButton = createDropdownButton(
        "Izzy",
        `${rootPath}DogsInfo/izzy.HTML`
      );
      const kiraButton = createDropdownButton(
        "kira",
        `${rootPath}DogsInfo/kira.HTML`
      );

      dogsDropdownContainer.appendChild(allDogsButton);
      dogsDropdownContainer.appendChild(zizuButton);
      dogsDropdownContainer.appendChild(rayaButton);
      dogsDropdownContainer.appendChild(zpiceyButton);
      dogsDropdownContainer.appendChild(eeveeButton);
      dogsDropdownContainer.appendChild(fantButton);
      dogsDropdownContainer.appendChild(nalaButton);
      dogsDropdownContainer.appendChild(zieraButton);
      dogsDropdownContainer.appendChild(izzyButton);
      dogsDropdownContainer.appendChild(kiraButton);
    } else if (name === "Blog") {
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

const upIcon = document.createElement("i");
upIcon.className = "fa-solid fa-angles-up";

const upButton = document.createElement("button");
upButton.textContent = "";
upButton.className = "up-button";
upButton.appendChild(upIcon);
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

  const iconContainer = document.createElement("div");
  const iconImg = document.createElement("img");
  iconImg.src = "/favicon.ico";
  iconImg.alt = "favIcon a poodle with the text kennel Shirkus underneeth";
  iconImg.className = "favicon";

  iconContainer.appendChild(iconImg);

  const aboutLink = createFooterLink("About", "/about.html");
  const contactLink = createFooterLink("Contact", "/contact.HTML");

  linksContainer.appendChild(aboutLink);
  linksContainer.appendChild(contactLink);

  footerContainer.appendChild(iconContainer);
  footerContainer.appendChild(copyrightText);
  footerContainer.appendChild(linksContainer);
}

function createFooterLink(text, href) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = href;
  return link;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchURL();
  setupHero();
  createButtons();
  setupFooter();
});
