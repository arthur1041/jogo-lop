const panelEnum = {
  MENU: 'menu',
  INICIO: 'inicio',
  INSTR: 'instr',
  CREDT: 'credt',
  LOADING: 'loading',
};

const stagesEnum = {
  LEVELS: 0,
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  END: 5,
};

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

let currentPanel;
let currentStage;

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

let firstColorIcon = {
  X: 80,
  Y: 200,
  W: 150,
  H: 150,
  R: 150,
};

let retries;

let secondColorIcon = {
  X: 370,
  Y: 200,
  W: 150,
  H: 150,
  R: 150,
};

const colorsOptionsXPositionsArray = [
  90,
  90 + 90,
  90 + 2 * 90,
  90 + 3 * 90,
  90 + 4 * 90,
];

function sortElementWithUniquePrevious() {
  const sortedElements =
    JSON.parse(sessionStorage.getItem('sortedElements')) || [];

  const availableElements = colorsOptionsXPositionsArray.filter(
    (element) => !sortedElements.includes(element)
  );

  const sortedElement =
    availableElements[Math.floor(Math.random() * availableElements.length)];
  sortedElements.push(sortedElement);

  sessionStorage.setItem('sortedElements', JSON.stringify(sortedElements));

  return sortedElement;
}

let firstAlternativeIcon = {
  X: undefined,
  Y: 440,
  W: 60,
  H: 60,
  R: 60,
};

let secondAlternativeIcon = {
  X: undefined,
  Y: 440,
  W: 60,
  H: 60,
  R: 60,
};

let thirdAlternativeIcon = {
  X: undefined,
  Y: 440,
  W: 60,
  H: 60,
  R: 60,
};

let fourthAlternativeIcon = {
  X: undefined,
  Y: 440,
  W: 60,
  H: 60,
  R: 60,
};

let fifithAlternativeIcon = {
  X: undefined,
  Y: 440,
  W: 60,
  H: 60,
  R: 60,
};

//Font
let mainFont;

//Colors
const colors = {
  RED: { colorName: 'red', hexCode: '#FF0000' },
  YELLOW: { colorName: 'yellow', hexCode: '#FFFF00' },
  ORANGE: { color1Name: 'orange', hexCode: '#FF8000' },
  GREEN: { colorName: 'green', hexCode: '#00FF00' },
  BLUE: { colorName: 'blue', hexCode: '#0000FF' },
  TEAL: { colorName: 'teal', hexCode: '#008080' },
  OLIVE_DRAB: { colorName: 'olive drab', hexCode: '#808040' },
  PURPLE: { colorName: 'purple', hexCode: '#800080' },
};

const getColorsCombinationResult = (color1Name, color2Name) => {
  const color1Hex = colors[color1Name.toUpperCase()];
  const color2Hex = colors[color2Name.toUpperCase()];

  if (color1Hex === colors.RED.hexCode && color2Hex === colors.YELLOW.hexCode) {
    return colors.ORANGE;
  }
};

function preload() {
  soundFormats('mp3');
  song = loadSound('files/audios/soundtrack.mp3', onSongLoaded);
  muteIcon = loadImage('files/images/icons8-mute-50.png');
  unmuteIcon = loadImage('files/images/unmute_106398.png');
  pauseIcon = loadImage('files/images/pause.png');
  playIcon = loadImage('files/images/play-buttton.png');
  mainFont = loadFont('files/fonts/BADABB__.TTF');
}

function drawMenuScreen() {
  cursor(ARROW);
  if (
    isMouseOver(btnIniciar.X, btnIniciar.Y, btnIniciar.W, btnIniciar.H) ||
    isMouseOver(btnInstr.X, btnInstr.Y, btnInstr.W, btnInstr.H) ||
    isMouseOver(btnCredt.X, btnCredt.Y, btnCredt.W, btnCredt.H)
  ) {
    cursor(HAND);
  }

  fill(255);
  textSize(80);
  textAlign(CENTER);
  textFont(mainFont);
  text('Guess The Color', 295, 150);

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

function drawStartScreen() {
  cursor(ARROW);
  if (currentStage === undefined || currentStage === stagesEnum.LEVELS) {
    currentStage = stagesEnum.LEVELS;
    if (
      isMouseOver(btnIniciar.X, btnIniciar.Y, btnIniciar.W, btnIniciar.H) ||
      isMouseOver(btnInstr.X, btnInstr.Y, btnInstr.W, btnInstr.H) ||
      isMouseOver(btnCredt.X, btnCredt.Y, btnCredt.W, btnCredt.H)
    ) {
      cursor(HAND);
    }

    fill(255);
    textSize(80);
    textAlign(CENTER);
    textFont(mainFont);
    text('Escolha o nivel', 295, 150);

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
    text('Facil', btnIniciar.textX, btnIniciar.textY);
    text('Medio', btnInstr.textX, btnInstr.textY);
    text('Dificil', btnCredt.textX, btnCredt.textY);

    return;
  }

  if (retries > 0) {
    if (
      isMouseOver(
        firstAlternativeIcon.X,
        firstAlternativeIcon.Y,
        firstAlternativeIcon.W,
        firstAlternativeIcon.H
      ) ||
      isMouseOver(
        secondAlternativeIcon.X,
        secondAlternativeIcon.Y,
        secondAlternativeIcon.W,
        secondAlternativeIcon.H
      ) ||
      isMouseOver(
        thirdAlternativeIcon.X,
        thirdAlternativeIcon.Y,
        thirdAlternativeIcon.W,
        thirdAlternativeIcon.H
      ) ||
      isMouseOver(
        fourthAlternativeIcon.X,
        fourthAlternativeIcon.Y,
        fourthAlternativeIcon.W,
        fourthAlternativeIcon.H
      ) ||
      isMouseOver(
        fifithAlternativeIcon.X,
        fifithAlternativeIcon.Y,
        fifithAlternativeIcon.W,
        fifithAlternativeIcon.H
      )
    ) {
      cursor(HAND);
    }
    fill(255);
    textSize(25);
    text(`Tentativas: ${retries}`, 100, 50);

    textSize(60);
    text('Qual a cor resultante?', 300, 150);

    textSize(150);
    text('+', 300, 320);

    textSize(30);
    text('Alternativas:', 130, 410);

    stroke(255, 255, 255);
    strokeWeight(4);
    if (currentStage === stagesEnum.FIRST) {
      fill(color(colors.RED.hexCode));
      rect(
        firstColorIcon.X,
        firstColorIcon.Y,
        firstColorIcon.W,
        firstColorIcon.H,
        firstColorIcon.R
      );

      fill(color(colors.YELLOW.hexCode));
      rect(
        secondColorIcon.X,
        secondColorIcon.Y,
        secondColorIcon.W,
        secondColorIcon.H,
        secondColorIcon.R
      );

      strokeWeight(2);
      fill(color(colors.ORANGE.hexCode));
      rect(
        firstAlternativeIcon.X,
        firstAlternativeIcon.Y,
        firstAlternativeIcon.W,
        firstAlternativeIcon.H,
        firstAlternativeIcon.R
      );

      const secondColorCacheKey = `${stagesEnum.FIRST}-secondAlternativeIcon`;

      if (!sessionStorage.getItem(secondColorCacheKey)) {
        sessionStorage.setItem(
          secondColorCacheKey,
          generateRandomHexCode(colors.ORANGE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(secondColorCacheKey)));
      rect(
        secondAlternativeIcon.X,
        secondAlternativeIcon.Y,
        secondAlternativeIcon.W,
        secondAlternativeIcon.H,
        secondAlternativeIcon.R
      );

      const thirdColorCacheKey = `${stagesEnum.FIRST}-thirdAlternativeIcon`;

      if (!sessionStorage.getItem(thirdColorCacheKey)) {
        sessionStorage.setItem(
          thirdColorCacheKey,
          generateRandomHexCode(colors.ORANGE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(thirdColorCacheKey)));
      rect(
        thirdAlternativeIcon.X,
        thirdAlternativeIcon.Y,
        thirdAlternativeIcon.W,
        thirdAlternativeIcon.H,
        thirdAlternativeIcon.R
      );

      const fourthColorCacheKey = `${stagesEnum.FIRST}-fourthAlternativeIcon`;

      if (!sessionStorage.getItem(fourthColorCacheKey)) {
        sessionStorage.setItem(
          fourthColorCacheKey,
          generateRandomHexCode(colors.ORANGE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fourthColorCacheKey)));
      rect(
        fourthAlternativeIcon.X,
        fourthAlternativeIcon.Y,
        fourthAlternativeIcon.W,
        fourthAlternativeIcon.H,
        fourthAlternativeIcon.R
      );

      const fifithColorCacheKey = `${stagesEnum.FIRST}-fifithAlternativeIcon`;

      if (!sessionStorage.getItem(fifithColorCacheKey)) {
        sessionStorage.setItem(
          fifithColorCacheKey,
          generateRandomHexCode(colors.ORANGE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fifithColorCacheKey)));
      rect(
        fifithAlternativeIcon.X,
        fifithAlternativeIcon.Y,
        fifithAlternativeIcon.W,
        fifithAlternativeIcon.H,
        fifithAlternativeIcon.R
      );
    }

    if (currentStage === stagesEnum.SECOND) {
      fill(color(colors.GREEN.hexCode));
      rect(
        firstColorIcon.X,
        firstColorIcon.Y,
        firstColorIcon.W,
        firstColorIcon.H,
        firstColorIcon.R
      );

      fill(color(colors.BLUE.hexCode));
      rect(
        secondColorIcon.X,
        secondColorIcon.Y,
        secondColorIcon.W,
        secondColorIcon.H,
        secondColorIcon.R
      );

      strokeWeight(2);
      fill(color(colors.TEAL.hexCode));
      rect(
        firstAlternativeIcon.X,
        firstAlternativeIcon.Y,
        firstAlternativeIcon.W,
        firstAlternativeIcon.H,
        firstAlternativeIcon.R
      );

      const secondColorCacheKey = `${stagesEnum.SECOND}-secondAlternativeIcon`;

      if (!sessionStorage.getItem(secondColorCacheKey)) {
        sessionStorage.setItem(
          secondColorCacheKey,
          generateRandomHexCode(colors.TEAL.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(secondColorCacheKey)));
      rect(
        secondAlternativeIcon.X,
        secondAlternativeIcon.Y,
        secondAlternativeIcon.W,
        secondAlternativeIcon.H,
        secondAlternativeIcon.R
      );

      const thirdColorCacheKey = `${stagesEnum.SECOND}-thirdAlternativeIcon`;

      if (!sessionStorage.getItem(thirdColorCacheKey)) {
        sessionStorage.setItem(
          thirdColorCacheKey,
          generateRandomHexCode(colors.TEAL.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(thirdColorCacheKey)));
      rect(
        thirdAlternativeIcon.X,
        thirdAlternativeIcon.Y,
        thirdAlternativeIcon.W,
        thirdAlternativeIcon.H,
        thirdAlternativeIcon.R
      );

      const fourthColorCacheKey = `${stagesEnum.SECOND}-fourthAlternativeIcon`;

      if (!sessionStorage.getItem(fourthColorCacheKey)) {
        sessionStorage.setItem(
          fourthColorCacheKey,
          generateRandomHexCode(colors.TEAL.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fourthColorCacheKey)));
      rect(
        fourthAlternativeIcon.X,
        fourthAlternativeIcon.Y,
        fourthAlternativeIcon.W,
        fourthAlternativeIcon.H,
        fourthAlternativeIcon.R
      );

      const fifithColorCacheKey = `${stagesEnum.SECOND}-fifithAlternativeIcon`;

      if (!sessionStorage.getItem(fifithColorCacheKey)) {
        sessionStorage.setItem(
          fifithColorCacheKey,
          generateRandomHexCode(colors.TEAL.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fifithColorCacheKey)));
      rect(
        fifithAlternativeIcon.X,
        fifithAlternativeIcon.Y,
        fifithAlternativeIcon.W,
        fifithAlternativeIcon.H,
        fifithAlternativeIcon.R
      );
    }

    if (currentStage === stagesEnum.THIRD) {
      fill(color(colors.ORANGE.hexCode));
      rect(
        firstColorIcon.X,
        firstColorIcon.Y,
        firstColorIcon.W,
        firstColorIcon.H,
        firstColorIcon.R
      );

      fill(color(colors.TEAL.hexCode));
      rect(
        secondColorIcon.X,
        secondColorIcon.Y,
        secondColorIcon.W,
        secondColorIcon.H,
        secondColorIcon.R
      );

      strokeWeight(2);
      fill(color(colors.OLIVE_DRAB.hexCode));
      rect(
        firstAlternativeIcon.X,
        firstAlternativeIcon.Y,
        firstAlternativeIcon.W,
        firstAlternativeIcon.H,
        firstAlternativeIcon.R
      );

      const secondColorCacheKey = `${stagesEnum.THIRD}-secondAlternativeIcon`;

      if (!sessionStorage.getItem(secondColorCacheKey)) {
        sessionStorage.setItem(
          secondColorCacheKey,
          generateRandomHexCode(colors.OLIVE_DRAB.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(secondColorCacheKey)));
      rect(
        secondAlternativeIcon.X,
        secondAlternativeIcon.Y,
        secondAlternativeIcon.W,
        secondAlternativeIcon.H,
        secondAlternativeIcon.R
      );

      const thirdColorCacheKey = `${stagesEnum.THIRD}-thirdAlternativeIcon`;

      if (!sessionStorage.getItem(thirdColorCacheKey)) {
        sessionStorage.setItem(
          thirdColorCacheKey,
          generateRandomHexCode(colors.OLIVE_DRAB.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(thirdColorCacheKey)));
      rect(
        thirdAlternativeIcon.X,
        thirdAlternativeIcon.Y,
        thirdAlternativeIcon.W,
        thirdAlternativeIcon.H,
        thirdAlternativeIcon.R
      );

      const fourthColorCacheKey = `${stagesEnum.THIRD}-fourthAlternativeIcon`;

      if (!sessionStorage.getItem(fourthColorCacheKey)) {
        sessionStorage.setItem(
          fourthColorCacheKey,
          generateRandomHexCode(colors.OLIVE_DRAB.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fourthColorCacheKey)));
      rect(
        fourthAlternativeIcon.X,
        fourthAlternativeIcon.Y,
        fourthAlternativeIcon.W,
        fourthAlternativeIcon.H,
        fourthAlternativeIcon.R
      );

      const fifithColorCacheKey = `${stagesEnum.THIRD}-fifithAlternativeIcon`;

      if (!sessionStorage.getItem(fifithColorCacheKey)) {
        sessionStorage.setItem(
          fifithColorCacheKey,
          generateRandomHexCode(colors.OLIVE_DRAB.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fifithColorCacheKey)));
      rect(
        fifithAlternativeIcon.X,
        fifithAlternativeIcon.Y,
        fifithAlternativeIcon.W,
        fifithAlternativeIcon.H,
        fifithAlternativeIcon.R
      );
    }

    if (currentStage === stagesEnum.FOURTH) {
      fill(color(colors.RED.hexCode));
      rect(
        firstColorIcon.X,
        firstColorIcon.Y,
        firstColorIcon.W,
        firstColorIcon.H,
        firstColorIcon.R
      );

      fill(color(colors.BLUE.hexCode));
      rect(
        secondColorIcon.X,
        secondColorIcon.Y,
        secondColorIcon.W,
        secondColorIcon.H,
        secondColorIcon.R
      );

      strokeWeight(2);
      fill(color(colors.PURPLE.hexCode));
      rect(
        firstAlternativeIcon.X,
        firstAlternativeIcon.Y,
        firstAlternativeIcon.W,
        firstAlternativeIcon.H,
        firstAlternativeIcon.R
      );

      const secondColorCacheKey = `${stagesEnum.FOURTH}-secondAlternativeIcon`;

      if (!sessionStorage.getItem(secondColorCacheKey)) {
        sessionStorage.setItem(
          secondColorCacheKey,
          generateRandomHexCode(colors.PURPLE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(secondColorCacheKey)));
      rect(
        secondAlternativeIcon.X,
        secondAlternativeIcon.Y,
        secondAlternativeIcon.W,
        secondAlternativeIcon.H,
        secondAlternativeIcon.R
      );

      const thirdColorCacheKey = `${stagesEnum.FOURTH}-thirdAlternativeIcon`;

      if (!sessionStorage.getItem(thirdColorCacheKey)) {
        sessionStorage.setItem(
          thirdColorCacheKey,
          generateRandomHexCode(colors.PURPLE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(thirdColorCacheKey)));
      rect(
        thirdAlternativeIcon.X,
        thirdAlternativeIcon.Y,
        thirdAlternativeIcon.W,
        thirdAlternativeIcon.H,
        thirdAlternativeIcon.R
      );

      const fourthColorCacheKey = `${stagesEnum.FOURTH}-fourthAlternativeIcon`;

      if (!sessionStorage.getItem(fourthColorCacheKey)) {
        sessionStorage.setItem(
          fourthColorCacheKey,
          generateRandomHexCode(colors.PURPLE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fourthColorCacheKey)));
      rect(
        fourthAlternativeIcon.X,
        fourthAlternativeIcon.Y,
        fourthAlternativeIcon.W,
        fourthAlternativeIcon.H,
        fourthAlternativeIcon.R
      );

      const fifithColorCacheKey = `${stagesEnum.FOURTH}-fifithAlternativeIcon`;

      if (!sessionStorage.getItem(fifithColorCacheKey)) {
        sessionStorage.setItem(
          fifithColorCacheKey,
          generateRandomHexCode(colors.PURPLE.hexCode)
        );
      }
      fill(color(sessionStorage.getItem(fifithColorCacheKey)));
      rect(
        fifithAlternativeIcon.X,
        fifithAlternativeIcon.Y,
        fifithAlternativeIcon.W,
        fifithAlternativeIcon.H,
        fifithAlternativeIcon.R
      );
    }

    if (currentStage === stagesEnum.END) {
      background(0, 255, 0);
      textSize(120);
      text('Vencendor', 300, 320);
    }
  } else {
    song.stop();
    background(255, 0, 0);
    textSize(120);
    text('Game Over', 300, 320);
  }
}

function drawInstrScreen() {
  fill(255);
  text('Tela de Instrucoes', 300, 300);
}

function drawCredtScreen() {
  fill(255);
  text('Tela de Creditos', 300, 300);
}

function setup() {
  sessionStorage.clear();
  currentPanel = panelEnum.MENU;
  firstAlternativeIcon.X = sortElementWithUniquePrevious();
  secondAlternativeIcon.X = sortElementWithUniquePrevious();
  thirdAlternativeIcon.X = sortElementWithUniquePrevious();
  fourthAlternativeIcon.X = sortElementWithUniquePrevious();
  fifithAlternativeIcon.X = sortElementWithUniquePrevious();
  const mainCanvas = createCanvas(600, 600);
  bgRedIntervalRef = setInterval(myBgRedComponentLoop, 100 / 16);
  bgGreenIntervalRef = setInterval(myBgGreenComponentLoop, 100 / 8);
  bgBlueIntervalRef = setInterval(myBgBlueComponentLoop, 100 / 4);
}

function draw() {
  cursor(ARROW);
  let color1 = color(backgroundR, backgroundG, backgroundB);
  let color2 = color(backgroundB, backgroundG, backgroundR);

  setGradient(0, 0, width, height, color1, color2);

  fill(255);
  rect(controlPanel.X, controlPanel.Y, 70, 25, 10);

  const pausePlayIcon = isPlayingBg ? pauseIcon : playIcon;
  const muteUnmuteIcon = isMuted ? unmuteIcon : muteIcon;

  if (
    isMouseOver(btnIniciar.X, btnIniciar.Y, btnIniciar.W, btnIniciar.H) ||
    isMouseOver(btnInstr.X, btnInstr.Y, btnInstr.W, btnInstr.H) ||
    isMouseOver(btnCredt.X, btnCredt.Y, btnCredt.W, btnCredt.H) ||
    isMouseOver(
      pausePlayBtn.X,
      pausePlayBtn.Y,
      pausePlayBtn.W,
      pausePlayBtn.H
    ) ||
    isMouseOver(
      muteUnmuteBtn.X,
      muteUnmuteBtn.Y,
      muteUnmuteBtn.W,
      muteUnmuteBtn.H
    )
  ) {
    cursor(HAND);
  }

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
    drawMenuScreen();
  }

  if (currentPanel === panelEnum.INICIO) {
    drawStartScreen();
  }

  if (currentPanel === panelEnum.INSTR) {
    drawInstrScreen();
  }

  if (currentPanel === panelEnum.CREDT) {
    drawCredtScreen();
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

  if (currentPanel === panelEnum.INICIO && currentStage === stagesEnum.LEVELS) {
    //Detectando clique sobre botão de iniciar
    if (
      mouseX >= btnIniciar.X &&
      mouseX <= btnIniciar.X + btnIniciar.W &&
      mouseY >= btnIniciar.Y &&
      mouseY <= btnIniciar.Y + btnIniciar.H
    ) {
      retries = 3;
      currentStage = stagesEnum.FIRST;
    }

    //Detectando clique sobre botão de instruções
    if (
      mouseX >= btnInstr.X &&
      mouseX <= btnInstr.X + btnInstr.W &&
      mouseY >= btnInstr.Y &&
      mouseY <= btnInstr.Y + btnInstr.H
    ) {
      retries = 2;
      currentStage = stagesEnum.FIRST;
    }

    //Detectando clique sobre botão de creditos
    if (
      mouseX >= btnCredt.X &&
      mouseX <= btnCredt.X + btnCredt.W &&
      mouseY >= btnCredt.Y &&
      mouseY <= btnCredt.Y + btnCredt.H
    ) {
      retries = 1;
      currentStage = stagesEnum.FIRST;
    }
  }

  if (currentPanel === panelEnum.INICIO) {
    // if(currentStage === stagesEnum.FIRST) {
    if (
      mouseX >= firstAlternativeIcon.X &&
      mouseX <= firstAlternativeIcon.X + firstAlternativeIcon.H &&
      mouseY >= firstAlternativeIcon.Y &&
      mouseY <= firstAlternativeIcon.Y + firstAlternativeIcon.H
    ) {
      currentStage = currentStage + 1;
    }

    if (
      mouseX >= secondAlternativeIcon.X &&
      mouseX <= secondAlternativeIcon.X + secondAlternativeIcon.H &&
      mouseY >= secondAlternativeIcon.Y &&
      mouseY <= secondAlternativeIcon.Y + secondAlternativeIcon.H
    ) {
      retries--;
    }

    if (
      mouseX >= thirdAlternativeIcon.X &&
      mouseX <= thirdAlternativeIcon.X + thirdAlternativeIcon.H &&
      mouseY >= thirdAlternativeIcon.Y &&
      mouseY <= thirdAlternativeIcon.Y + thirdAlternativeIcon.H
    ) {
      retries--;
    }

    if (
      mouseX >= fourthAlternativeIcon.X &&
      mouseX <= fourthAlternativeIcon.X + fourthAlternativeIcon.H &&
      mouseY >= fourthAlternativeIcon.Y &&
      mouseY <= fourthAlternativeIcon.Y + fourthAlternativeIcon.H
    ) {
      retries--;
    }

    if (
      mouseX >= fifithAlternativeIcon.X &&
      mouseX <= fifithAlternativeIcon.X + fifithAlternativeIcon.H &&
      mouseY >= fifithAlternativeIcon.Y &&
      mouseY <= fifithAlternativeIcon.Y + fifithAlternativeIcon.H
    ) {
      retries--;
    }

    // }
  }
}

function generateRandomHexCode(excludeHexCode) {
  let randomHexCode;
  let isTooDark;
  let isTooWhite;

  do {
    const randomNum = Math.floor(Math.random() * 16777216);

    randomHexCode = randomNum.toString(16).toUpperCase();

    while (randomHexCode.length < 6) {
      randomHexCode = '0' + randomHexCode;
    }

    const colorValue = parseInt(randomHexCode, 16);
    const r = (colorValue >> 16) & 255;
    const g = (colorValue >> 8) & 255;
    const b = colorValue & 255;
    const brightness = (r + g + b) / 3;

    isTooDark = brightness < 64;
    isTooWhite = brightness > 192;
  } while (randomHexCode === excludeHexCode || isTooDark || isTooWhite);

  return '#' + randomHexCode;
}

function isMouseOver(x, y, width, height) {
  return (
    mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height
  );
}
