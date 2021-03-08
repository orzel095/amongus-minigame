import {
  getGeneratedBoxes,
  getComputerCombination,
  boxAnimation,
  setPlayerBoxes,
  getGeneratedScores,
} from "./utils/index";
import "./styles/index.css";
//@ts-ignore
import Swal from "sweetalert2";

// elements
const selectElement: HTMLSelectElement | null = document.querySelector(
  "#steps"
);
const playBtn: HTMLButtonElement | null = document.querySelector(".play-btn");
const resetBtn: HTMLButtonElement | null = document.querySelector(".reset-btn");
const computerBoard: HTMLElement | null = document.querySelector(
  ".computer-board"
);
const playerBoard: HTMLElement | null = document.querySelector(".player-board");
const computerScore: HTMLElement | null = document.querySelector(
  ".computer-score"
);
const playerScore: HTMLElement | null = document.querySelector(".player-score");

//setting game

const gridSize: number = 4;
let maxSteps: number = Number(selectElement?.value);
let currentLevel: number = 1;
let currentStep: number = 0;
let isComputerPlay = false;

const boxes = getGeneratedBoxes(gridSize);

boxes.forEach((node) => {
  computerBoard?.appendChild(node.cloneNode());
  playerBoard?.appendChild(node.cloneNode());
});

const createScores = () => {
  if (computerScore) computerScore.innerHTML = "";
  if (playerScore) playerScore.innerHTML = "";

  const scores = getGeneratedScores(maxSteps);
  scores.forEach((node) => {
    computerScore?.appendChild(node.cloneNode());
    playerScore?.appendChild(node.cloneNode());
  });
};

createScores();

let computerCombination = getComputerCombination(gridSize, maxSteps);

const computerBoxes: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".computer-board .box"
);
const playerBoxes: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".player-board .box"
);

// helpers

const updateScore = () => {
  createScores();
  const computerScores: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".computer-score .score-box"
  );
  const playerScores: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".player-score .score-box"
  );
  computerScores.forEach((el, i) => {
    if (i < currentLevel) el.classList.add("active");
    else el.classList.remove("active");
  });
  playerScores.forEach((el, i) => {
    if (i < currentStep) el.classList.add("active");
    else el.classList.remove("active");
  });
};

const resetGame = () => {
  currentLevel = 1;
  currentStep = 0;
  updateScore();
  computerCombination = getComputerCombination(gridSize, maxSteps);
  isComputerPlay = false;
  setPlayerBoxes(playerBoxes, true);
};

const playComputerCombination = () => {
  isComputerPlay = true;
  setPlayerBoxes(playerBoxes, false);
  for (let i = 0; i < currentLevel; i++) {
    setTimeout(() => {
      isComputerPlay && boxAnimation(computerBoxes[computerCombination[i]]);
      if (i === currentLevel - 1) {
        isComputerPlay = false;
        setPlayerBoxes(playerBoxes, true);
      }
    }, (i + 1) * 500);
    updateScore();
  }
};

const updateStep = () => {
  currentStep++;
  updateScore();
};

const updateLevel = () => {
  currentLevel++;
  playComputerCombination();
  updateScore();
  setTimeout(() => {
    currentStep = 0;
    updateScore();
  }, 500);
};

const onSelectChange = (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  computerCombination = getComputerCombination(gridSize, Number(value));
  maxSteps = Number(value);
  resetGame();
};

const onWinGame = () => {
  Swal.fire("Brawo!", "Wygrałeś!", "success").then(() => {
    resetGame();
  });
};

const onPlayerClick = (e: Event) => {
  if (!isComputerPlay) {
    const { target } = e;
    const box = target as HTMLElement;
    const index: number = Number(box.dataset.index);
    if (computerCombination[currentStep] === index) {
      updateStep();
      boxAnimation(box);
      if (currentLevel === currentStep && currentLevel === maxSteps) {
        onWinGame();
        return false;
      }
      if (currentLevel === currentStep) {
        updateLevel();
      }
    } else {
      currentStep = 0;
      updateScore();
      playComputerCombination();
    }
  }
};

// events

playBtn?.addEventListener("click", onPlayerClick);
resetBtn?.addEventListener("click", resetGame);
selectElement?.addEventListener("change", onSelectChange);
playerBoxes.forEach((box) => {
  box.addEventListener("click", onPlayerClick);
});
