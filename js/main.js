let startBtn = (document.querySelector(".start-btn").onclick = function () {
  let yourName = prompt("What is your Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".user-name").innerHTML = "Unknown";
  } else {
    document.querySelector(".user-name").innerHTML = yourName;
  }
  document.querySelector(".starting").remove();
  gameTimer();
});
let duration = 1000;
let tries = document.querySelector(".tries");
let time = document.querySelector(".timer");
let timer;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(document.querySelectorAll(".memory-game-block"));
let randArray = [...Array(blocks.length).keys()];
shuffle(randArray);
mainFun();
function mainFun() {
  blocks.forEach((block, index) => {
    block.style.order = randArray[index];

    block.onclick = function () {
      flipBlock(block);
    };
  });
}

function shuffle(Array) {
  for (let i = Array.length; i > 0; ) {
    i--;
    let temp = Array[i],
      random = Math.trunc(Math.random() * i);
    Array[i] = Array[random];
    randArray[random] = temp;
  }
}
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flip");
  let countFlip = blocks.filter((block) => {
    return block.classList.contains("flip");
  });

  if (countFlip.length === 2) {
    stopClick();
    chcker(countFlip[0], countFlip[1]);
  }
}
function stopClick() {
  blocksContainer.classList.add("stop-click");
  setTimeout(function () {
    blocksContainer.classList.remove("stop-click");
  }, duration);
}
function chcker(firstEl, secoundEl) {
  if (firstEl.dataset.technology === secoundEl.dataset.technology) {
    document.getElementById("success-voice").play();
    firstEl.classList.remove("flip");
    secoundEl.classList.remove("flip");
    firstEl.classList.add("achive");
    secoundEl.classList.add("achive");
    let achiveCount = blocks.filter((block) => {
      return block.classList.contains("achive");
    });

    if (achiveCount.length === blocks.length) {
      checkSuccess();
    }
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    document.getElementById("error-voice").play();
    setTimeout(function () {
      firstEl.classList.remove("flip");
      secoundEl.classList.remove("flip");
    }, duration);
  }
}

function checkSuccess() {
  clearInterval(timer);

  let wellDoneContainer = document.createElement("div");
  let wellDone = document.createElement("p");
  let wellDoneBtn = document.createElement("button");
  wellDoneContainer.classList.add("wellDoneContainer", "page-check");
  wellDone.classList.add("wellDone", "page-check-parag");
  wellDoneBtn.classList.add("wellDoneBtn", "page-check-btn");
  wellDone.appendChild(document.createTextNode("Well Done"));
  wellDoneBtn.appendChild(document.createTextNode("Play again"));
  wellDoneContainer.appendChild(wellDone);
  wellDoneContainer.appendChild(wellDoneBtn);
  document.body.appendChild(wellDoneContainer);
}
document.addEventListener("click", function (ev) {
  if (ev.target.classList.contains("page-check-btn")) {
    reset();
  }
});

function reset() {
  blocks.forEach((block) => {
    block.classList.remove("achive");
  });
  tries.innerHTML = 0;
  let pageCheck = [...document.body.children].filter((e) => {
    return e.classList.contains("page-check");
  });
  pageCheck.forEach((e) => {
    e.remove();
  });
  shuffle(randArray);
  mainFun();
  gameTimer();
}

function gameTimer() {
  let dur = 420;

  timer = setInterval(function () {
    let minute = Math.trunc(dur / 60),
      secound = Math.trunc(dur % 60);
    minute < 10 ? (minute = `0${minute}`) : minute;
    secound < 10 ? (secound = `0${secound}`) : secound;
    time.innerHTML = `${minute}:${secound}`;
    dur--;
    if (dur < 10) {
      time.style.color = "red";
    }
    if (dur < 0) {
      clearInterval(timer);

      let gameoverContainer = document.createElement("div");
      let gameover = document.createElement("p");
      let gameoverBtn = document.createElement("button");
      gameoverContainer.classList.add("gameoverContainer", "page-check");
      gameover.classList.add("gameover", "page-check-parag");
      gameoverBtn.classList.add("gameoberBtn", "page-check-btn");
      gameover.appendChild(document.createTextNode("Game over"));
      gameoverBtn.appendChild(document.createTextNode("try again"));
      gameoverContainer.appendChild(gameover);
      gameoverContainer.appendChild(gameoverBtn);
      document.body.appendChild(gameoverContainer);
    }
  }, 1000);
}
