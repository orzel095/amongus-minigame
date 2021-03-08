/**
 * @param  {number} gridSize size of board grid
 * @returns {HTMLElement[]} array of box elements
 */
export const getGeneratedBoxes = (gridSize: number) => {
  const boxes = [];
  const square = gridSize * gridSize;

  for (let i = 0; i < square; i++) {
    const element: HTMLElement = document.createElement("div");
    element.className = "box";
    element.dataset.index = `${i}`;

    boxes.push(element);
  }
  return boxes;
};

/**
 * @param  {number} level number of levels
 * @returns {HTMLElement[]} array of box elements
 */
export const getGeneratedScores = (level: number) => {
  const scores = [];
  for (let i = 0; i < level; i++) {
    const element: HTMLElement = document.createElement("div");
    element.className = "score-box";

    scores.push(element);
  }
  return scores;
};

/**
 * @param  {number} gridSize
 * @param  {number} maxSteps
 * @returns {number[]} generated computer combination
 */
export const getComputerCombination = (gridSize: number, maxSteps: number) => {
  const combination = [];
  const square = gridSize * gridSize;
  for (let i = 0; i < maxSteps; i++) {
    combination.push(Math.floor(Math.random() * (square - 0)) + 0);
  }
  return combination;
};

/**
 * start light animation box
 * @param  {HTMLElement} element
 */
export const boxAnimation = (element: HTMLElement) => {
  element.classList.add("anim");
  setTimeout(function () {
    element.classList.remove("anim");
  }, 450);
};

/**
 * toggle user interaction with boxes
 * @param  {NodeListOf<HTMLElement>} boxes
 * @param  {boolean} isEnable
 */
export const setPlayerBoxes = (
  boxes: NodeListOf<HTMLElement>,
  isEnable: boolean
) => {
  boxes.forEach((box) => {
    if (!isEnable) {
      box.classList.add("disable");
    } else {
      box.classList.remove("disable");
    }
  });
};
