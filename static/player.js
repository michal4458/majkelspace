const audio = document.getElementById("audio");

const tracks = document.querySelectorAll(".track");

const playBtn = document.getElementById("play-btn");
const playIcon = playBtn.querySelector("img");

const loopBtn = document.getElementById("loop-btn");
const loopIcon = loopBtn.querySelector("img");

const volumeSlider = document.getElementById("volume-slider");
const seekSlider = document.getElementById("seek-slider");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let loopEnabled = false;
let currentTrack = 0;

const playlist = [
    "/music/Memory-Card.mp3",
    "/music/Cursor-Room.mp3",
    "/music/song3.mp3"
];

/* ICONY */
const playIconPath = "/icons/play.svg";
const pauseIconPath = "/icons/pause.svg";

const loopOffIconPath = "/icons/loop.svg";
const loopOnIconPath = "/icons/loop-on.svg";

/* load first track */
audio.src = playlist[currentTrack];

/* format time */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/* PLAY / PAUSE */
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playIcon.src = pauseIconPath;
    } else {
        audio.pause();
        playIcon.src = playIconPath;
    }
});

/* TRACK CLICK */
tracks.forEach((track, index) => {
    track.addEventListener("click", () => {
        currentTrack = index;
        audio.src = playlist[currentTrack];
        audio.play();
        playIcon.src = pauseIconPath;
    });
});

/* LOOP (IKONA) */
loopBtn.addEventListener("click", () => {
    loopEnabled = !loopEnabled;
    audio.loop = loopEnabled;

    loopIcon.src = loopEnabled
        ? loopOnIconPath
        : loopOffIconPath;
});

/* VOLUME */
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

/* SEEK + TIME */
audio.addEventListener("timeupdate", () => {
    seekSlider.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration || 0);
});

/* SEEK */
seekSlider.addEventListener("input", () => {
    audio.currentTime = (seekSlider.value / 100) * audio.duration;
});

/* END */
audio.addEventListener("ended", () => {
    playIcon.src = playIconPath;
});
