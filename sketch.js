const panelEnum = {
  MENU: 'menu',
  INICIO: 'inicio',
  INSTR: 'instr',
  CREDT: 'credt',
  LOADING: 'loading',
};

let currentPanel = panelEnum.MENU;

//Controls
let muteIcon;
let unmuteIcon;

let muteUnmuteBtn = {
  X: 565,
  Y: 15,
  W: 20,
  H: 20,
};

let playIcon;
let pauseIcon;

let pausePlayBtn = {
  X: 530,
  Y: 15,
  W: 20,
  H: 20,
};

let isMuted = false;
let isPlayingBg = true;

let controlPanel = {
  X: 520,
  Y: 13,
};

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

let btnIniciar = {
  X: 180,
  Y: 250,
  W: 240,
  H: 70,
  text: 'Iniciar',
  textX: 180 + 120,
  textY: 250 + 50,
};

let btnInstr = {
  X: 180,
  Y: 370,
  W: 240,
  H: 70,
  text: 'Como Jogar',
  textX: 180 + 120,
  textY: 370 + 50,
};

let btnCredt = {
  X: 180,
  Y: 490,
  W: 240,
  H: 70,
  text: 'Creditos',
  textX: 180 + 120,
  textY: 490 + 50,
};

let menuBtnsCornerRadius = 20;

//Font
let mainFont;

//Colors
const colors = [{ colorName: '', hexCode: '' }];

function preload() {
  soundFormats('mp3');
  song = loadSound('files/audios/soundtrack.mp3', onSongLoaded);
  muteIcon = loadImage('files/images/icons8-mute-50.png');
  unmuteIcon = loadImage('files/images/unmute_106398.png');
  pauseIcon = loadImage('files/images/pause.png');
  playIcon = loadImage('files/images/play-buttton.png');
  mainFont = loadFont('files/fonts/BADABB__.TTF');
}

function drawStartScreen() {
  fill(255);
  textSize(60);
  text('Qual a cor resultante?', 300, 150);
}

function setup() {
  const mainCanvas = createCanvas(600, 600);

  bgRedIntervalRef = setInterval(myBgRedComponentLoop, 100 / 16);
  bgGreenIntervalRef = setInterval(myBgGreenComponentLoop, 100 / 8);
  bgBlueIntervalRef = setInterval(myBgBlueComponentLoop, 100 / 4);
}

function draw() {
  let color1 = color(backgroundR, backgroundG, backgroundB);
  let color2 = color(backgroundB, backgroundG, backgroundR);

  setGradient(0, 0, width, height, color1, color2);

  fill(255);
  rect(controlPanel.X, controlPanel.Y, 70, 25, 10);

  const pausePlayIcon = isPlayingBg ? pauseIcon : playIcon;
  const muteUnmuteIcon = isMuted ? unmuteIcon : muteIcon;

  image(
    pausePlayIcon,
    pausePlayBtn.X,
    pausePlayBtn.Y,
    pausePlayBtn.W,
    pausePlayBtn.H
  );
  image(
    muteUnmuteIcon,
    muteUnmuteBtn.X,
    muteUnmuteBtn.Y,
    muteUnmuteBtn.W,
    muteUnmuteBtn.H
  );

  if (currentPanel === panelEnum.MENU) {
    // clear();
    fill(255);
    textSize(80);
    textAlign(CENTER);
    textFont(mainFont);
    text('Guess The Color', 295, 150);

    rect(controlPanel.X, controlPanel.Y, 70, 25, 10);

    const pausePlayIcon = isPlayingBg ? pauseIcon : playIcon;
    const muteUnmuteIcon = isMuted ? unmuteIcon : muteIcon;

    image(
      pausePlayIcon,
      pausePlayBtn.X,
      pausePlayBtn.Y,
      pausePlayBtn.W,
      pausePlayBtn.H
    );
    image(
      muteUnmuteIcon,
      muteUnmuteBtn.X,
      muteUnmuteBtn.Y,
      muteUnmuteBtn.W,
      muteUnmuteBtn.H
    );

    fill(255, 255, 255);
    rect(
      btnIniciar.X,
      btnIniciar.Y,
      btnIniciar.W,
      btnIniciar.H,
      menuBtnsCornerRadius
    );
    rect(btnInstr.X, btnInstr.Y, btnInstr.W, btnInstr.H, menuBtnsCornerRadius);
    rect(btnCredt.X, btnCredt.Y, btnCredt.W, btnCredt.H, menuBtnsCornerRadius);

    fill(95, 158, 160);
    textSize(40);
    text(btnIniciar.text, btnIniciar.textX, btnIniciar.textY);
    text(btnInstr.text, btnInstr.textX, btnInstr.textY);
    text(btnCredt.text, btnCredt.textX, btnCredt.textY);
  }

  if (currentPanel === panelEnum.INICIO) {
    // clear();
    drawStartScreen();
  }

  if (currentPanel === panelEnum.INSTR) {
    // clear();
    background(220);
    fill(255);
    text('Tela de Instrucoes', 300, 300);
  }

  if (currentPanel === panelEnum.CREDT) {
    // clear();
    background(220);
    fill(255);
    text('Tela de Creditos', 300, 300);
  }
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
  song.loop();
}

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
    mouseX >= muteUnmuteBtn.X &&
    mouseX <= muteUnmuteBtn.X + muteUnmuteBtn.W &&
    mouseY >= muteUnmuteBtn.Y &&
    mouseY <= muteUnmuteBtn.Y + muteUnmuteBtn.H
  ) {
    if (isMuted) {
      song.setVolume(1.0);
      if (!song.isPlaying()) {
        song.loop();
      }
    } else {
      song.setVolume(0);
    }
    isMuted = !isMuted;
  }

  // Detectando clique sobre o botão de pausar a animação do background
  if (
    mouseX >= pausePlayBtn.X &&
    mouseX <= pausePlayBtn.X + pausePlayBtn.H &&
    mouseY >= pausePlayBtn.Y &&
    mouseY <= pausePlayBtn.Y + pausePlayBtn.H
  ) {
    isPlayingBg = !isPlayingBg;
  }

  if (currentPanel === panelEnum.MENU) {
    //Detectando clique sobre botão de iniciar
    if (
      mouseX >= btnIniciar.X &&
      mouseX <= btnIniciar.X + btnIniciar.W &&
      mouseY >= btnIniciar.Y &&
      mouseY <= btnIniciar.Y + btnIniciar.H
    ) {
      currentPanel = panelEnum.INICIO;
    }

    //Detectando clique sobre botão de instruções
    if (
      mouseX >= btnInstr.X &&
      mouseX <= btnInstr.X + btnInstr.W &&
      mouseY >= btnInstr.Y &&
      mouseY <= btnInstr.Y + btnInstr.H
    ) {
      currentPanel = panelEnum.INSTR;
    }

    //Detectando clique sobre botão de creditos
    if (
      mouseX >= btnCredt.X &&
      mouseX <= btnCredt.X + btnCredt.W &&
      mouseY >= btnCredt.Y &&
      mouseY <= btnCredt.Y + btnCredt.H
    ) {
      currentPanel = panelEnum.CREDT;
    }
  }
}
