// import { songs } from "./data";

const songs = [
   {
      id: 1,
      name: "Stairway To Heaven",
      artist: "Led Zeppelin",
      image: "AlbumArt/Zeppelin.png",
      genre: "Rock",
      source: "Music/Rock/Stairway To Heaven.mp3",
   },
   {
      id: 2,
      name: "RoadHouse Blues",
      artist: "The Doors",
      image: "AlbumArt/Doors.jpg",
      genre: "Rock",
      source: "Music/Rock/Roadhouse Blues.mp3",
   },
   {
      id: 3,
      name: "Everyday I Have The Blues",
      artist: "John Mayer Trio",
      image: "AlbumArt/jmt.jpg",
      genre: "Blues",
      source: "Music/Blues/Everyday I Have The Blues.mp3",
   },
   {
      id: 4,
      name: "Pride n Joy",
      artist: "Stevie Ray Vaughn",
      image: "AlbumArt/srv.jpg",
      genre: "Blues",
      source: "Music/Blues/Pride n Joy.mp3",
   },

   {
      id: 5,
      name: "Giant Steps",
      artist: "John Coltrane",
      image: "AlbumArt/coltrane.jpg",
      genre: "Jazz",
      source: "Music/Jazzz/Giant Steps.mp3",
   },
   {
      id: 6,
      name: "In a Sentimental Mood",
      artist: "John Coltrane",
      image: "AlbumArt/coltrane.jpg",
      genre: "Jazz",
      source: "Music/Jazzz/In a Sentimental Mood.mp3",
   },
   {
      id: 7,
      name: "Bewajah",
      artist: "YRM & RaajMusic",
      image: "AlbumArt/yrm.jpg",
      genre: "Hip-Hop",
      source: "Music/Hip-Hop/Bewajah.mp3",
   },
   {
      id: 8,
      name: "I",
      artist: "Kendrick Lamar",
      image: "AlbumArt/kdot.jpg",
      genre: "Hip-Hop",
      source: "Music/Hip-Hop/I.mp3",
   },
   {
      id: 9,
      name: "Jauno Tauno",
      artist: "Shikriwal, Bhaduria",
      image: "AlbumArt/bhaduria.jpg",
      genre: "Hip-Hop",
      source: "Music/Hip-Hop/Jauno Tauno.mp3",
   },
];

const body = document.body;
const themeBtn = document.querySelector(".theme");
const genreFilter = document.querySelector("#genre-filter");
const songList = document.querySelector("#song-list");
// console.log(genreFilter[0].value);
let currentSongIndex = 0;

body.setAttribute("data-theme", "light");

themeBtn.addEventListener("click", () => {
   const currentTheme = body.getAttribute("data-theme");
   const newTheme = currentTheme === "light" ? "dark" : "light";
   body.setAttribute("data-theme", newTheme);
});

function showSongs(genre = "All") {
   songList.innerHTML = "";
   const filteredSongs = genre === "All" ? songs : songs.filter((s) => s.genre === genre);

   filteredSongs.forEach((s) => {
      const song = document.createElement("li");
      song.textContent = s.name;
      songList.appendChild(song);
   });
}
showSongs();

genreFilter.addEventListener("change", (e) => {
   const selectedGenre = e.target.value;
   showSongs(selectedGenre);
});
function filterSongs() {}
