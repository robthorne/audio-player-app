document.addEventListener("DOMContentLoaded", () => {
    const audioFiles = [
        { src: "audio/pūtātara.wav", img: "images/_43O9926.jpeg" },
        { src: "audio/soft-pūtōrino.wav", img: "images/putangitangi.jpeg" },
        { src: "audio/rehu.wav", img: "images/rehu+toroa.jpeg" },
        { src: "audio/kōauau.wav", img: "images/koauau+rakau.jpeg" },
        { src: "audio/Pūtōrino_Kōkiri.wav", img: "images/putorino.jpeg" },
        { src: "audio/Mirimiri_Kohatu.wav", img: "images/tumutumu+kohatu.jpeg" },
        { src: "audio/Kohatu_Rain.wav", img: "images/pakuru.jpeg" },
        { src: "audio/Porotiti_Gentle.wav", img: "images/koauau+ponga+ihu.jpeg" },
        { src: "audio/Soft_Mangai.wav", img: "images/nguru+rakau.jpeg" }
    ];

    const app = document.getElementById("app");
    const audioContainer = document.createElement("div");
    audioContainer.id = "audio-container";
    app.appendChild(audioContainer);

    audioFiles.forEach((file, index) => {
        const audioPlayer = document.createElement("div");
        audioPlayer.className = "audio-player";
        audioPlayer.innerHTML = `
            <img src="${file.img}" alt="Audio Image" onclick="togglePlayer(${index})">
            <audio id="audio-${index}" src="${file.src}" loop></audio>
            <div class="controls">
                <div class="volume-control">
                    <input type="range" class="volume-slider" min="0" max="100" step="25" value="100" onchange="setVolume(${index}, this.value)">
                    <span class="speaker-icon">&#x1F50A;</span>
                </div>
            </div>
        `;
        audioContainer.appendChild(audioPlayer);
    });
});

function togglePlayer(index) {
    const audioPlayer = document.querySelectorAll(".audio-player")[index];
    const audio = document.getElementById(`audio-${index}`);
    const globalControlPlayStopButton = document.getElementById("global-control-play-stop");
    const isGlobalPlaying = globalControlPlayStopButton.innerHTML === "⏹"; // Stop symbol indicates global play mode

    audioPlayer.classList.toggle("disabled");
    if (audioPlayer.classList.contains("disabled")) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("data-enabled");
    } else {
        audio.setAttribute("data-enabled", "true");
        if (isGlobalPlaying) {
            audio.play();
        }
    }
}

function setVolume(index, value) {
    const audio = document.getElementById(`audio-${index}`);
    audio.volume = value / 100;

    const volumeLabel = document.querySelector(`#audio-container .audio-player:nth-child(${index + 1}) .volume-label`);
    volumeLabel.textContent = `${value}%`;
}

function controlTogglePlayStop() {
    const controlPlayStopButton = document.getElementById("global-control-play-stop");
    const isPlaying = controlPlayStopButton.innerHTML === "▶"; // Play symbol

    const allAudioPlayers = document.querySelectorAll("#audio-container audio");
    allAudioPlayers.forEach(audio => {
        if (isPlaying && audio.hasAttribute("data-enabled")) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    controlPlayStopButton.innerHTML = isPlaying ? "⏹" : "▶"; // Toggle symbol
}

function controlSetVolume(value) {
    const allAudioPlayers = document.querySelectorAll("#audio-container audio");
    allAudioPlayers.forEach(audio => {
        audio.volume = value / 100;
    });
}
