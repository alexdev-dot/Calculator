const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let expression = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value) {
      expression += value;
      display.value = expression;
      calculateLive();
    }
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  expression = "";
  display.value = "";
});

// Equals button
equalsBtn.addEventListener("click", () => {
  try {
    expression = eval(expression).toString();
    display.value = expression;
  } catch {
    display.value = "Error";
    expression = "";
  }
});

// Live calculation while typing
function calculateLive() {
  try {
    if (/[0-9)]$/.test(expression)) {
      display.value = eval(expression);
    }
  } catch {
    display.value = expression;
  }
}

// Keyboard support
document.addEventListener("keydown", (event) => {
  if ((/[0-9+\-*/.]/).test(event.key)) {
    expression += event.key;
    display.value = expression;
    calculateLive();
  } else if (event.key === "Enter") {
    try {
      expression = eval(expression).toString();
      display.value = expression;
    } catch {
      display.value = "Error";
      expression = "";
    }
  } else if (event.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (event.key.toLowerCase() === "c") {
    expression = "";
    display.value = "";
  }
});
