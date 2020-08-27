let selection = document.querySelectorAll("[data-selection]");
let numbers = document.querySelectorAll("[data-number]");
let batBowl = document.querySelectorAll("[data-choose]");
let toss = ["odd", "even"];
let tossSelection;
let optionsB = ["bat", "bowl"];
let optionsA = ["1", "2", "3", "4", "5", "6"];
let optionsPlay = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let odd = document.getElementById("odd");
let even = document.getElementById("even");
let bat = document.getElementById("bat");
let bowl = document.getElementById("bowl");
let firstBattingNumber = document.querySelectorAll("[data-battingnumber]");
let finalColumn = document.querySelector("[data-final-column]");
let firstBowlingNumber = document.querySelectorAll("[data-bowlingnumber]");
let finalColumn1 = document.querySelector("[data-final-column-1]");
let userScore = document.getElementById("total-user-score");
let compScore = document.getElementById("total-comp-score");
let target = document.getElementById("target");
let target1 = document.getElementById("target-1");
let winMessage = document.getElementById("win-msg");
let restart=document.getElementById('restart')
let status;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  batBowl.forEach(e=>{
    e.disabled=true
  });
  restart.disabled=true
  firstBattingNumber.forEach((e) => {
    e.disabled = true;
  });
  firstBowlingNumber.forEach((e) => {
    e.disabled = true;
  });
});
selection.forEach((selected) => {
  selected.addEventListener("click", (e) => {
    let name = selected.dataset.selection;
    selection.forEach((e) => {
      e.disabled = true;
    });
    makeSelection(name);
  });
});

firstBattingNumber.forEach((element) => {
  element.addEventListener("click", (e) => {
    let number = element.dataset.battingnumber;
    firstBatting(number);
  });
});

firstBowlingNumber.forEach((element) => {
  element.addEventListener("click", (e) => {
    let number = element.dataset.bowlingnumber;
    firstBowling(number);
  });
});

function makeSelection(name) {
  numbers.forEach((selected) => {
    selected.addEventListener("click", (e) => {
      let number = selected.dataset.number;
      let computerNumber = randomSelection(optionsA);
      let result;
      let temp = parseInt(number) + parseInt(computerNumber);
      document.getElementById(
        "comp"
      ).innerHTML = `computer chose: ${computerNumber}`;
      document.getElementById("total-toss").innerHTML = `total: ${temp}`;
      if (temp % 2 == 1) {
        result = "odd";
      } else if (temp % 2 === 0) {
        result = "even";
      }
      if (result === name) {
        bat.disabled = false;
        bowl.disabled = false;
        batBowl.forEach((element) => {
          element.addEventListener("click", (e) => {
            let name = element.dataset.choose;
            if (name === "bat") {
              message(`You have won the toss and chosen to <b>BAT</b> first`);
              firstBattingNumber.forEach((e) => {
                e.disabled = false;
              });
              target1.innerHTML = `target: --`;
              status = 0;
            } else if (name === "bowl") {
              message(`You have won the toss and chosen to <b>BOWL</b> first`);
              firstBowlingNumber.forEach((e) => {
                e.disabled = false;
              });
              target.innerHTML = `target: --`;
              status = 1;
            }
            batBowl.forEach((element) => {
              element.disabled = true;
            });
          });
        });
      } else {
        let optionB = randomSelection(optionsB);
        if (optionB === "bat") {
          //window.location.href = "#comp-batting";
          message(`Computer has won the toss and elected to <b>BAT</b> first`);
          firstBowlingNumber.forEach((e) => {
            e.disabled = false;
          });
          target.innerHTML = `target: --`;
          status = 1;
        } else if (optionB === "bowl") {
          //window.location.href = "#comp-bowling";
          firstBattingNumber.forEach((e) => {
            e.disabled = false;
          });
          status = 0;
          message(`Computer has won the toss and elected to <b>BOWL</b> first`);
          target1.innerHTML = `target: --`;
        }
        //console.log(`computer has won the toss and has elected to ${optionB}`);
      }
      numbers.forEach((e) => {
        e.disabled = true;
      });
      return;
    });
  });
  document.getElementById("toss").disabled = true;
}

function randomSelection(selection) {
  let random = Math.floor(Math.random() * selection.length);
  return selection[random];
}

function addSelected(Selected) {
  var div = document.createElement("div");
  div.innerText = Selected;
  div.className = "result-selection";
  finalColumn.after(div);
}

function addSelected1(Selected) {
  var div = document.createElement("div");
  div.innerText = Selected;
  div.className = "result-selection";
  finalColumn1.after(div);
}

function message(message) {
  document.getElementById("msg").innerHTML = `${message}`;
  document.getElementById("msg").className = `alert alert-primary`;
}

let battingAdder = 0,
  count = 0;

function firstBatting(number) {
  let compBowlingNumber = randomSelection(optionsPlay);
  count++;
  addSelected(number);
  addSelected(compBowlingNumber);
  if (number === compBowlingNumber) {
    firstBattingNumber.forEach((e) => {
      e.disabled = true;
    });
    document.getElementById(
      "out-msg"
    ).innerHTML = `<h2 class="text-center"><b>OUT</b></h2>`;
    document.getElementById("out-msg").className = "alert alert-danger";
    setTimeout(() => {
      document.getElementById("out-msg").innerHTML = ``;
      document.getElementById("out-msg").className = "";
    }, 3000);
    if (status == 0) {
      firstBowlingNumber.forEach((e) => {
        e.disabled = false;
      });
    }
    if (status == 1) {
      if (battingAdder >= battingAdder1 + 1) {
        winMessage.innerHTML = "<b class='font-italic'>You Have Won</b>";
        winMessage.className = "alert alert-success text-center";
        firstBattingNumber.forEach((e) => {
          e.disabled = true;
        });
        restart.disabled=false;
      } else if (battingAdder <= battingAdder1 + 1) {
        winMessage.innerHTML = "<b class='font-italic'>Computer Has Won</b>";
        winMessage.className = "alert alert-danger text-center";
        firstBattingNumber.forEach((e) => {
          e.disabled = true;
        });
        restart.disabled=false;
      }
    }
    //console.log("out");
    return;
  }
  if (count === 6) {
    let over = [];
    for (let i = 0; i < count * 2; i++) {
      if (i % 2 == 1) {
        over.push(finalColumn.nextElementSibling.innerText);
      }
      finalColumn.nextElementSibling.remove();
    }
    let div = document.getElementById("over");
    div.innerText = `|${over.reverse().toString()}|`;
    count = 0;
  }
  battingAdder = battingAdder + parseInt(number);
  if (status == 1) {
    userScore.innerHTML = `total(user): ${battingAdder}`;
    target.innerHTML = `target: ${battingAdder1 + 1}`;
    if (battingAdder >= battingAdder1 + 1) {
      winMessage.innerHTML = "<b class='font-italic'>You Have Won</b>";
      winMessage.className = "alert alert-success text-center";
      firstBattingNumber.forEach((e) => {
        e.disabled = true;
      });
      restart.disabled=false;
    }
  } else if (status == 0) {
    userScore.innerHTML = `total(user): ${battingAdder}`;
    target1.innerHTML=`target: ${battingAdder+1}`;
  }
}

let battingAdder1 = 0,
  count1 = 0;

function firstBowling(number) {
  let compBattingNumber = randomSelection(optionsPlay);
  count1++;
  addSelected1(compBattingNumber);
  addSelected1(number);
  if (number === compBattingNumber) {
    firstBowlingNumber.forEach((e) => {
      e.disabled = true;
    });
    if (status == 1) {
      firstBattingNumber.forEach((e) => {
        e.disabled = false;
      });
    }
    if (status == 0) {
      if (battingAdder1 >= battingAdder + 1) {
        winMessage.innerHTML = "<b class='font-italic'>Computer Has Won</b>";
        winMessage.className = "alert alert-danger text-center";
        firstBowlingNumber.forEach((e) => {
          e.disabled = true;
        });
        restart.disabled=false;
      } else if (battingAdder1 <= battingAdder + 1) {
        winMessage.innerHTML = "<b class='font-italic'>You Have Won</b>";
        winMessage.className = "alert alert-success text-center";
        firstBowlingNumber.forEach((e) => {
          e.disabled = true;
        });
        restart.disabled=false;
      }
    }

    document.getElementById(
      "out-msg-1"
    ).innerHTML = `<h2 class="text-center"><b>OUT</b></h2>`;
    document.getElementById("out-msg-1").className = "alert alert-danger";
    setTimeout(() => {
      document.getElementById("out-msg-1").innerHTML = ``;
      document.getElementById("out-msg-1").className = "";
    }, 3000);
    //console.log("out");
    return;
  }
  if (count1 === 6) {
    let over = [];
    for (let i = 0; i < count1 * 2; i++) {
      if (i % 2 == 1) {
        over.push(finalColumn1.nextElementSibling.innerText);
      }
      finalColumn1.nextElementSibling.remove();
    }
    let div = document.getElementById("over-1");
    div.innerText = `|${over.reverse().toString()}|`;
    count1 = 0;
  }
  battingAdder1 = battingAdder1 + parseInt(compBattingNumber);
  if (status == 0) {
    compScore.innerHTML = `total(comp): ${battingAdder1}`;
    target1.innerHTML = `target: ${battingAdder + 1}`;
    if (battingAdder1 >= battingAdder + 1) {
      winMessage.innerHTML = "<b class='font-italic'>Computer Has Won</b>";
      winMessage.className = "alert alert-danger text-center";
      firstBowlingNumber.forEach((e) => {
        e.disabled = true;
      });
      restart.disabled=false;
    }
  } else if (status == 1) {
    compScore.innerHTML = `total(comp): ${battingAdder1}`;
    target.innerHTML=`target: ${battingAdder1+1}`;
    
  }
}

restart.addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.reload();
})