//Controls
let muteIcon;
let unmuteIcon;
let muteUnmuteBtnX = 565;
let muteUnmuteBtnY = 15;
let muteUnmuteBtnW = 20;
let muteUnmuteBtnH = 20;

let playIcon;
let pauseIcon;
let pausePlayBtnX = 530;
let pausePlayBtnY = 15;
let pausePlayBtnW = 20;
let pausePlayBtnH = 20;

let isMuted = false;
let isPlayingBg = true;

let controlPanelX = 520;
let controlPanelY = 13;

//Soundtrack
let song;

//Background
let bgRedIntervalRef;
let bgGreenIntervalRef;
let bgBlueIntervalRef;

let isBackgroundRIncreasing = false;
let isBackgroundGIncreasing = false;
let isBackgroundBIncreasing = false;

let backgroundR = 255;
let backgroundG = 255;
let backgroundB = 255;

let btnIniciarX = 180;
let btnIniciarY = 250;

let btnInstrX = 180;
let btnInstrY = 370;

let btnCredtX = 180;
let btnCredtY = 490;

let menuBtnsCornerRadius = 20;

//Font
let mainFont;

function preload() {
  soundFormats('mp3');
  song = loadSound('files/audios/soundtrack.mp3', onSongLoaded);
  muteIcon = loadImage('files/images/icons8-mute-50.png');
  unmuteIcon = loadImage('files/images/unmute_106398.png');
  pauseIcon = loadImage('files/images/pause.png');
  playIcon = loadImage('files/images/play-buttton.png');
  mainFont = loadFont('files/fonts/BADABB__.TTF');
}

function setup() {
  const mainCanvas = createCanvas(600, 600);

  bgRedIntervalRef = setInterval(myBgRedComponentLoop, 100 / 16);
  bgGreenIntervalRef = setInterval(myBgGreenComponentLoop, 100 / 8);
  bgBlueIntervalRef = setInterval(myBgBlueComponentLoop, 100 / 4);
}

function draw() {
  let color1 = color(backgroundR, backgroundG, backgroundB); // Red
  let color2 = color(backgroundB, backgroundG, backgroundR); // Blue

  // Create a linear gradient from top to bottom
  setGradient(0, 0, width, height, color1, color2);

  //

  fill(255);
  textSize(80);
  textAlign(CENTER);
  textFont(mainFont);
  text('Guess The Color', 295, 150);

  noStroke();
  rect(controlPanelX, controlPanelY, 70, 25, 10);

  const pausePlayIcon = isPlayingBg ? pauseIcon : playIcon;
  const muteUnmuteIcon = isMuted ? unmuteIcon : muteIcon;

  image(
    pausePlayIcon,
    pausePlayBtnX,
    pausePlayBtnY,
    pausePlayBtnW,
    pausePlayBtnH
  );
  image(
    muteUnmuteIcon,
    muteUnmuteBtnX,
    muteUnmuteBtnY,
    muteUnmuteBtnW,
    muteUnmuteBtnH
  );

  fill(255, 255, 255);
  noStroke();
  rect(btnIniciarX, btnIniciarY, 240, 70, menuBtnsCornerRadius);
  rect(btnInstrX, btnInstrY, 240, 70, menuBtnsCornerRadius);
  rect(btnCredtX, btnCredtY, 240, 70, menuBtnsCornerRadius);
}

function myBgBlueComponentLoop() {
  if (isPlayingBg) {
    if (backgroundB <= 0) {
      isBackgroundBIncreasing = true;
    }

    if (backgroundB >= 255) {
      isBackgroundBIncreasing = false;
    }

    if (isBackgroundBIncreasing) {
      backgroundB++;
    } else {
      backgroundB--;
    }
  }
}

function myBgGreenComponentLoop() {
  if (isPlayingBg) {
    if (backgroundG <= 0) {
      isBackgroundGIncreasing = true;
    }

    if (backgroundG >= 255) {
      isBackgroundGIncreasing = false;
    }

    if (isBackgroundGIncreasing) {
      backgroundG++;
    } else {
      backgroundG--;
    }
  }
}

function myBgRedComponentLoop() {
  if (isPlayingBg) {
    if (backgroundR <= 0) {
      isBackgroundRIncreasing = true;
    }

    if (backgroundG >= 255) {
      isBackgroundRIncreasing = false;
    }

    if (isBackgroundRIncreasing) {
      backgroundR++;
    } else {
      backgroundR--;
    }
  }
}

function onSongLoaded() {
  song.loop(); // Start playing the song
}

// Function to draw a linear gradient
function setGradient(x, y, w, h, color1, color2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let gradientColor = lerpColor(color1, color2, inter);
    stroke(gradientColor);
    line(x, i, x + w, i);
  }
}

function mouseClicked() {
  // Detectando clique sobre o botão de pausar a música
  if (
    mouseX >= muteUnmuteBtnX &&
    mouseX <= muteUnmuteBtnX + muteUnmuteBtnW &&
    mouseY >= muteUnmuteBtnY &&
    mouseY <= muteUnmuteBtnY + muteUnmuteBtnH
  ) {
    if (isMuted) {
      song.setVolume(1.0); // Stop the song if it is playing
    } else {
      song.setVolume(0);
    }
    isMuted = !isMuted;
  }

  // Detectando clique sobre o botão de pausar a animação do background
  if (
    mouseX >= pausePlayBtnX &&
    mouseX <= pausePlayBtnX + pausePlayBtnH &&
    mouseY >= pausePlayBtnY &&
    mouseY <= pausePlayBtnY + pausePlayBtnH
  ) {
    isPlayingBg = !isPlayingBg;
  }
}
