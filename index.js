const ora = require("ora");

let isActive = false;

function OraProgressBar(title, goal, options) {
  if (isActive) throw new Error("Only one spinner can be active at a time");
  if (goal < 0 || !goal) throw new Error("Invalid goal");

  this.goal = goal;
  this.title = title;
  let currentText = this.title;
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
    currentText = `${this.title}  ${currentStep}/${this.goal}`;
    spinner.text = currentText;
  };

  updateText();

  this.progress = (step = 1) => {
    currentStep += step;
    updateText();
    if (currentStep >= this.goal) {
      this.succeed();
    }
  };

  this.fail = (text = "") => {
    spinner.fail(text);
    isActive = false;
  };

  this.succeed = (text = "") => {
    spinner.succeed(text);
    isActive = false;
  };

  this.updateProgress = (newProgress) => {
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

  this.updateGoal = (newGoal) => {
    if (newGoal < currentStep)
      throw new Error(
        "Invalid goal, goal cannot be smaller than current progress"
      );

    this.goal = newGoal;
    updateText();
  };
}

module.exports = OraProgressBar;
