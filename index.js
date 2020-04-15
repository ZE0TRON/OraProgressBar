const ora = require("ora");

function OraProgressBar(title, steps) {
  this.steps = steps;
  this.title = title;
  let currentText = this.title;
  let currentStep = 0;
  this.spinner = ora(currentText).start();

  const setText = () => {
    currentText = `${this.title}  ${currentStep}/${steps}`;
    this.spinner.text = currentText;
  };

  this.progress = (step = 1) => {
    currentStep += step;
    setText();
    if (currentStep >= steps) {
      this.spinner.succeed();
    }
  };
}

module.exports = OraProgressBar;
