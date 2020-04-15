# Ora Progress Bar

A progress bar based on ora library.

## Usage

### Create a ProgressBar(title,numberOfSteps)

```javascript
const ProgressBar = require("ora-progress-bar");

const progressBar = new ProgressBar("Current Progress", 100);
```

### Increase the progress using progressBar.progress(progress=1)

```javascript
progressBar.progress();

progressBar.progress(5);
```

When the progressBar reaches its goal, it stops and succeeds.
