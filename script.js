// import { songs } from "./data";

const body = document.body;
const themeBtn = document.querySelector(".theme");

let currentSongIndex = 0;

body.setAttribute("data-theme", "light");

themeBtn.addEventListener("click", function() {
   console.log("clicked");
   const currentTheme = body.getAttribute("data-theme");
   const newTheme = currentTheme === "light" ? "dark" : "light";
   body.setAttribute("data-theme", newTheme);
});
