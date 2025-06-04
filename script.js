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

const nowPlaying = document.querySelector(".now-playing");
const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");

const playPauseBtn = document.querySelector(".playPause-track");
const prevBtn = document.querySelector(".prev-track");
const nextBtn = document.querySelector(".next-track");
const shuffleBtn = document.querySelector(".fa-random");
const addToPlaylistBtn = document.querySelector(".add-to-playlist .fa-solid");
const song = document.querySelector("audio");

const seekSlider = document.querySelector(".seek-slider");
const volumeSlider = document.querySelector(".volume-slider");

const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

const playlistInput = document.querySelector("#playlist-input");
const createPlaylistBtn = document.querySelector(".create-playlist-btn");
const currentPlaylistSongContainer = document.querySelector(".current-list");
const playlistContainer = document.querySelector(".all-list");

let songIndex = 0;
let isPlaying = false;
let updateTimer;
const playlist = [];
let selectedPlaylistIndex = null;

body.setAttribute("data-theme", "light");

themeBtn.addEventListener("click", () => {
   const currentTheme = body.getAttribute("data-theme");
   const newTheme = currentTheme === "light" ? "dark" : "light";
   body.setAttribute("data-theme", newTheme);
});

//===========================================================> Render Songs
function showSongs(genre = "All") {
   songList.innerHTML = "";
   const filteredSongs = genre === "All" ? songs : songs.filter((s) => s.genre === genre);

   filteredSongs.forEach((s) => {
      const songItem = document.createElement("li");
      songItem.textContent = s.name;
      songItem.dataset.id = s.id;

      if (songs[songIndex].id === s.id) {
         songItem.classList.add("playing");
      }

      songItem.addEventListener("click", () => {
         songIndex = songs.findIndex((song) => song.id === s.id);
         renderSong(songIndex);
      });
      songList.appendChild(songItem);
   });
}
//===========================================================> Filter Songs based on Genre
function filterSongs() {
   const selectedGenre = this.value;
   const filteredSongs = selectedGenre === "All" ? songs : songs.filter((s) => s.genre === selectedGenre);

   // Check if current song is in filtered list
   const currentSongVisible = filteredSongs.some((s) => s.id === songs[songIndex].id);

   // If not, switch to first song in that genre
   if (!currentSongVisible && filteredSongs.length > 0) {
      const firstSongId = filteredSongs[0].id;
      songIndex = songs.findIndex((s) => s.id === firstSongId);
      renderSong(songIndex);
   }
   showSongs(selectedGenre);
}

//============================================================> Render Songs
function renderSong(index) {
   clearInterval(updateTimer);
   reset();
   song.src = "";
   const songToRender = songs[index];
   song.src = songToRender.source;
   songImg.style.backgroundImage = `url(${songToRender.image})`;
   songName.textContent = songToRender.name;
   artistName.textContent = songToRender.artist;
   nowPlaying.textContent = `Playing music ${songToRender.id} of ${songs.length}`;
   updateTimer = setInterval(setUpdate, 1000);

   updatePlayingClass();

   isPlaying = false;
   playPause();
}
function reset() {
   currentTime.textContent = "00:00";
   totalTime.textContent = "00:00";
   seekSlider.value = 0;
}
function seekTo() {
   let seekTo = song.duration * (seekSlider.value / 100);
   song.currentTime = seekTo;
   playSong();
}
function shuffle() {
   const randomIndex = Math.floor(Math.random() * songs.length);
   songIndex = randomIndex;
   renderSong(songIndex);
}
function setVolume() {
   song.volume = volumeSlider.value / 100;
}

function playPause() {
   isPlaying ? pauseSong() : playSong();
}

function pauseSong() {
   song.pause();
   isPlaying = false;
   songImg.classList.remove("rotate");
   playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
}
function playSong() {
   song.play();
   isPlaying = true;
   songImg.classList.add("rotate");
   playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
}

//To highlight the current playing song
function updatePlayingClass() {
   const allItems = document.querySelectorAll("#song-list li");
   allItems.forEach((li) => {
      const liId = parseInt(li.dataset.id);
      if (liId === songs[songIndex].id) {
         li.classList.add("playing");
      } else {
         li.classList.remove("playing");
      }
   });
}

//--------------------------------------------------------------------------------> Prev and Next functionality
function prevSong() {
   songIndex--;
   if (songIndex < 0) {
      songIndex = songs.length - 1;
   }
   renderSong(songIndex);
}
function nextSong() {
   songIndex++;
   if (songIndex >= songs.length) {
      songIndex = 0;
   }
   renderSong(songIndex);
}

function setUpdate() {
   let seekPosition = 0;
   if (!isNaN(song.duration)) {
      seekPosition = song.currentTime * (100 / song.duration);
      seekSlider.value = seekPosition;

      let currentMinutes = Math.floor(song.currentTime / 60);
      let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);

      let durationMinutes = Math.floor(song.duration / 60);
      let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

      if (currentSeconds < 10) {
         currentSeconds = 0 + currentSeconds;
      }
      if (durationSeconds < 10) {
         durationSeconds = 0 + durationSeconds;
      }
      if (currentMinutes < 10) {
         currentMinutes = 0 + currentMinutes;
      }
      if (durationMinutes < 10) {
         durationMinutes = 0 + durationMinutes;
      }

      currentTime.textContent = currentMinutes + ":" + currentSeconds;
      totalTime.textContent = durationMinutes + ":" + durationSeconds;
   }
}

//-----------------------------------------------------------------------------> Create Playlist
function createPlaylist() {
   const name = playlistInput.value.trim();
   if (name === "") return alert("Please enter a Playlist name!");

   //check if the playlist name already exists
   const exist = playlist.some((p) => p.name === name);
   if (exist) return alert("Different Playlist with the Same Name already Exists!");

   playlist.push({ name, songs: [] });
   playlistInput.value = "";

   renderPlaylist();
}
//-------------------------------------------------------------------------------->Render Playlist
function renderPlaylist() {
   playlistContainer.innerHTML = "";

   playlist.forEach((p, index) => {
      const li = document.createElement("li");
      li.textContent = p.name;

      li.addEventListener("click", () => {
         selectedPlaylistIndex = index;
         renderPlaylistSongs(p.name);
      });
      playlistContainer.appendChild(li);
   });
}

//-----------------------------------------------------------------------------> Add to playlist
function addToPlaylist(songId, playlistIndex) {
   const selectedPlaylist = playlist[playlistIndex];

   if (!selectedPlaylist.songs.includes(songId)) {
      selectedPlaylist.songs.push(songId);
      alert("Added to Playlist");
      renderPlaylistSongs(selectedPlaylist.name);
   } else {
      alert("Song already in Playlist!");
   }
}

//------------------------------------------------------------------------------------->Render Playlist Songs
function renderPlaylistSongs(name) {
   const p = playlist.find((pl) => pl.name === name);
   if (!p) return;

   currentPlaylistSongContainer.innerHTML = "";
   p.songs.forEach((songId) => {
      const songObj = songs.find((s) => s.id === songId);
      if (songObj) {
         const li = document.createElement("li");
         li.textContent = `${songObj.name} - ${songObj.artist}`;
         li.addEventListener("click", () => {
            songIndex = songs.findIndex((s) => s.id === songObj.id);
            renderSong(songIndex);
         });
         currentPlaylistSongContainer.appendChild(li);
      }
   });
}

genreFilter.addEventListener("change", filterSongs);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
seekSlider.addEventListener("input", seekTo);
volumeSlider.addEventListener("input", setVolume);
song.addEventListener("ended", nextSong);
createPlaylistBtn.addEventListener("click", createPlaylist);
addToPlaylistBtn.addEventListener("click", () => {
   if (selectedPlaylistIndex === null) {
      alert("Please select a playlist first!");
      return;
   }
   const songId = songs[songIndex].id;
   addToPlaylist(songId, selectedPlaylistIndex);
});

showSongs();

renderSong(songIndex);
