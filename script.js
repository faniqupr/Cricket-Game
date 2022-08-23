"use strict";
let batOrBowl;
let currentScore = 0;
let target = 0;
let compInput = 0;
let userInput = 0;
let secondInnings = false;

document
  .querySelector(".proceed-to-toss")
  .addEventListener("click", function () {
    document.querySelector(".rules").classList.add("hidden");
    document.querySelector(".toss").classList.remove("hidden");
  });

document.querySelector(".heads").addEventListener("click", function () {
  document.querySelector(".pre-toss").classList.add("hidden");
  const toss = Math.trunc(Math.random() * 2);
  if (toss === 0) {
    document.querySelector(".toss-win").classList.remove("hidden");
  } else {
    document.querySelector(".toss-loss").classList.remove("hidden");
    batOrBowl = Math.trunc(Math.random() * 2);
    document.querySelector(".batting-or-bowling").textContent =
      batOrBowl === 0 ? "Batting 🏏" : "Bowling ⚾";
  }
});

document.querySelector(".tails").addEventListener("click", function () {
  document.querySelector(".pre-toss").classList.add("hidden");
  const toss = Math.trunc(Math.random() * 2);
  if (toss === 1) {
    document.querySelector(".toss-win").classList.remove("hidden");
  } else {
    document.querySelector(".toss-loss").classList.remove("hidden");
    batOrBowl = Math.trunc(Math.random() * 2);
    document.querySelector(".batting-or-bowling").textContent =
      batOrBowl === 0 ? "Batting 🏏" : "Bowling ⚾";
  }
});

document.querySelector(".bat").addEventListener("click", function () {
  batOrBowl = 0;
  document.querySelector(".toss").classList.add("hidden");
  document.querySelector(".game").classList.remove("hidden");
  document.querySelector(".status").textContent = "Batting 🏏";
  document.querySelector(".user-current").classList.remove("hidden");
  document.querySelector(".user-current-score").textContent = 0;
});

document.querySelector(".bowl").addEventListener("click", function () {
  batOrBowl = 1;
  document.querySelector(".toss").classList.add("hidden");
  document.querySelector(".game").classList.remove("hidden");
  document.querySelector(".status").textContent = "Bowling ⚾";
  document.querySelector(".comp-current").classList.remove("hidden");
  document.querySelector(".comp-current-score").textContent = 0;
});

document.querySelector(".start-game").addEventListener("click", function () {
  document.querySelector(".toss").classList.add("hidden");
  document.querySelector(".game").classList.remove("hidden");
  document.querySelector(".status").textContent = document.querySelector(
    ".batting-or-bowling"
  ).textContent;
  if (batOrBowl === 0) {
    document.querySelector(".user-current").classList.remove("hidden");
    document.querySelector(".user-current-score").textContent = 0;
  } else {
    document.querySelector(".comp-current").classList.remove("hidden");
    document.querySelector(".comp-current-score").textContent = 0;
  }
});

document.querySelector(".restart").addEventListener("click", function () {
  document.querySelector(".game").classList.add("hidden");
  document.querySelector(".toss").classList.remove("hidden");
  document.querySelector(".toss-win").classList.add("hidden");
  document.querySelector(".toss-loss").classList.add("hidden");
  document.querySelector(".pre-toss").classList.remove("hidden");
  document.querySelector(".enter").classList.remove("hidden");
  document.querySelector(".user-current-score").textContent = "";
  document.querySelector(".comp-current-score").textContent = "";
  document.querySelector(".user-current").classList.add("hidden");
  document.querySelector(".user-target").classList.add("hidden");
  document.querySelector(".comp-current").classList.add("hidden");
  document.querySelector(".comp-target").classList.add("hidden");
  document.querySelector(".message").textContent = "";
  currentScore = 0;
  target = 0;
  compInput = 0;
  userInput = 0;
  secondInnings = false;
});

const checkInput = function (input) {
  if (typeof input === "number" && input <= 6 && input >= 1) {
    return true;
  } else {
    document.querySelector(".message").textContent =
      "Invalid Input, Enter Again";
    return false;
  }
};

document.querySelector(".enter").addEventListener("click", function () {
  document.querySelector(".message").textContent = "";
  userInput = Number(document.querySelector(".user-input").value);
  compInput = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(".comp-input").textContent = compInput;
  if (checkInput(userInput)) {
    if (batOrBowl === 0 && userInput !== compInput) {
      currentScore += userInput;
      document.querySelector(".user-current-score").textContent = currentScore;
      if (currentScore >= target && secondInnings) {
        document.querySelector(".message").textContent = "You Won 🎉";
        document.querySelector(".enter").classList.add("hidden");
      }
    } else if (batOrBowl === 1 && userInput != compInput) {
      currentScore += compInput;
      document.querySelector(".comp-current-score").textContent = currentScore;
      if (currentScore >= target && secondInnings) {
        document.querySelector(".message").textContent = "You Lost 😭";
        document.querySelector(".enter").classList.add("hidden");
      }
    } else if (batOrBowl === 0 && userInput === compInput) {
      if (secondInnings) {
        if (currentScore < target) {
          document.querySelector(".message").textContent = "You Lost 😭";
          document.querySelector(".enter").classList.add("hidden");
        } else if (currentScore === target) {
          document.querySelector(".message").textContent = "Draw 🤝";
          document.querySelector(".enter").classList.add("hidden");
        }
      } else {
        target = currentScore;
        currentScore = 0;
        document.querySelector(".message").textContent = "You Are Out ☹️";
        document.querySelector(".user-current").classList.add("hidden");
        document.querySelector(".comp-target").classList.remove("hidden");
        document.querySelector(".comp-target-score").textContent = target;
        document.querySelector(".comp-current").classList.remove("hidden");
        document.querySelector(".comp-current-score").textContent =
          currentScore;
        document.querySelector(".status").textContent = "Bowling ⚾";
        batOrBowl = 1;
        secondInnings = true;
      }
    } else if (batOrBowl === 1 && userInput === compInput) {
      if (secondInnings) {
        if (currentScore < target) {
          document.querySelector(".message").textContent = "You Won 🎉";
          document.querySelector(".enter").classList.add("hidden");
        } else if (currentScore === target) {
          document.querySelector(".message").textContent = "Draw 🤝";
          document.querySelector(".enter").classList.add("hidden");
        }
      } else {
        target = currentScore;
        currentScore = 0;
        document.querySelector(".message").textContent = "Computer Is Out 😊";
        document.querySelector(".comp-current").classList.add("hidden");
        document.querySelector(".user-target").classList.remove("hidden");
        document.querySelector(".user-target-score").textContent = target;
        document.querySelector(".user-current").classList.remove("hidden");
        document.querySelector(".user-current-score").textContent =
          currentScore;
        document.querySelector(".status").textContent = "Batting 🏏";
        batOrBowl = 0;
        secondInnings = true;
      }
    }
  }
});
