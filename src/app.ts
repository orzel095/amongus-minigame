import {
  getGeneratedBoxes,
  getComputerCombination,
  boxAnimation,
  updateScore,
} from "./utils/index";
import "./styles/index.css";

// elements
const selectElement: HTMLSelectElement | null = document.querySelector(
  "#steps"
);
const playBtn: HTMLButtonElement | null = document.querySelector(".play-btn");
const resetBtn: HTMLButtonElement | null = document.querySelector(".reset-btn");
const preview: HTMLElement | null = document.querySelector(".preview");
const board: HTMLElement | null = document.querySelector(".board");

//setting game

const gridSize: number = 4;
let maxSteps: number = Number(selectElement?.value);
let level = 1;
let currentStep = 0;

const boxes = getGeneratedBoxes(gridSize);

boxes.forEach((node) => {
  preview?.appendChild(node.cloneNode());
  board?.appendChild(node.cloneNode());
});

let computerCombination = getComputerCombination(gridSize, maxSteps);

const previewBoxes: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".preview .box"
);
const boardBoxes: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".board .box"
);

// helpers

const resetGame = () => {
  level = 1;
  currentStep = 0;
  updateScore();
  computerCombination = getComputerCombination(gridSize, maxSteps);
};

const showPreview = () => {
  for (let i = 0; i < level; i++) {
    setTimeout(() => {
      boxAnimation(previewBoxes[computerCombination[i]]);
    }, (i + 1) * 500);
    updateScore();
  }
};

const updateStep = () => {
  currentStep++;
  updateScore();
};

const updateLevel = () => {
  level++;
  showPreview();
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
};

const onBoxClick = (e: Event) => {
  const { target } = e;
  const box = target as HTMLElement;
  const index: number = Number(box.dataset.index);
  if (computerCombination[currentStep] === index) {
    updateStep();
    boxAnimation(box);
    if (level === currentStep && level === maxSteps) {
      alert("win");
      return false;
    }
    if (level === currentStep) {
      updateLevel();
    }
  } else {
    currentStep = 0;
    updateScore();
    showPreview();
  }
};

// events

playBtn?.addEventListener("click", showPreview);
resetBtn?.addEventListener("click", resetGame);
selectElement?.addEventListener("change", onSelectChange);
boardBoxes.forEach((box) => {
  box.addEventListener("click", onBoxClick);
});
