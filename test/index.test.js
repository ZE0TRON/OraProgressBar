const ProgressBar = require("../index");

describe("Create progress bar", () => {
  it("Should create a progress bar without options", () => {
    const progressBar = new ProgressBar("My progress", 10);
    progressBar.succeed();
    expect(() => new ProgressBar("My Progress", -2)).toThrow();
    expect(() => new ProgressBar("My Progress", "asdasd")).toThrow();
  });

  it("Should create a progress bar with options", () => {
    const options = { prefixText: "Current", spinner: "dots7", color: "red" };
    const progressBar = new ProgressBar("My progress", 10, options);
    progressBar.succeed();
  });
});

describe("Increment progress", () => {
  it("should increment the progress by one", () => {
    const progressBar = new ProgressBar("My progress", 10);
    for (let i = 0; i < 10; i++) {
      progressBar.progress();
    }
    expect(() => progressBar.progress()).toThrow();
  });

  it("should increment the progress by given amount", () => {
    const progressBar = new ProgressBar("My progress", 10);
    progressBar.progress(10);
    expect(() => progressBar.progress()).toThrow();

    const progressBar2 = new ProgressBar("My progress", 10);
    progressBar2.progress(5);
    progressBar2.progress(10);
    expect(() => progressBar2.progress()).toThrow();
  });
});

describe("Stop the progress bar", () => {
  it("should succeed the progress bar", () => {
    //TODO: implement the test
  });
  it("should fail the progress bar", () => {
    //TODO: implement the test
  });
});

describe("Update the progress bar", () => {
  it("should update the goal", () => {
    //TODO: implement the test
  });
  it("should update the progress", () => {
    //TODO: implement the test
  });
});
