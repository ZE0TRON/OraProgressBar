const ora = require("ora");

let isActive = false;

/**
 * Creates a progress bar for cli.
 * @constructor
 * @param {string} title - The text for the progress bar.
 * @param {string} goal - The number of steps required to finish.
 * @param {object} options - Additional options for the ora spinner.(see ora-js doc)
 */
function OraProgressBar(title, goal, options) {
  if (isActive) throw new Error("Only one spinner can be active at a time");
  if (goal < 0 || isNaN(goal)) throw new Error("Invalid goal");
  let isStopped = false;
  this.goal = goal;
  let text = title;
  let currentText = text;
  let currentStep = 0;
  let spinner = {};

  if (options) {
    options.text = currentText;
    spinner = ora(options).start();
  } else {
    spinner = ora(currentText).start();
  }

  isActive = true;

  const updateText = () => {
    currentText = `${text}  ${currentStep}/${this.goal}`;
    spinner.text = currentText;
  };

  updateText();

  /**
   * Increments the current progress of the progress bar.
   * @param {number} step - Increment amount
   */
  this.progress = (step = 1) => {
    if (isStopped) throw new Error("This progress bar already stopped");
    currentStep += step;
    updateText();
    if (currentStep >= this.goal) {
      this.succeed();
    }
  };

  /**
   * Fails the progress bar.
   * @param {string} text - Text to replace current text of progress bar.
   */
  this.fail = (text = "") => {
    if (isStopped) throw new Error("This progress bar already stopped");
    spinner.fail(text);
    isStopped = true;
    isActive = false;
  };

  /**
   * Succeeds the progress bar.
   * @param {string} text - Text to replace current text of progress bar.
   */
  this.succeed = (text = "") => {
    if (isStopped) throw new Error("This progress bar already stopped");
    spinner.succeed(text);
    isStopped = true;
    isActive = false;
  };

  /**
   * Changes the current progress of the bar.
   * @param {number} newProgress - New progress value for the progress bar.
   */
  this.updateProgress = (newProgress) => {
    if (isStopped) throw new Error("This progress bar already stopped");
    if (newProgress > this.goal)
      throw new Error("Invalid progress, progress cannot be bigger than goal");
    else if (newProgress === this.goal) {
      currentStep = newProgress;
      updateText();
      this.succeed();
    }

    currentStep = newProgress;
    updateText();
  };

  /**
   * Changes the current goal of the bar.
   * @param {number} newGoal - New goal value for the progress bar.
   */
  this.updateGoal = (newGoal) => {
    if (isStopped) throw new Error("This progress bar already stopped");
    if (newGoal < currentStep)
      throw new Error(
        "Invalid goal, goal cannot be smaller than current progress"
      );

    this.goal = newGoal;
    updateText();

    if (this.goal === currentStep) {
      this.succeed();
    }
  };
}

module.exports = OraProgressBar;
