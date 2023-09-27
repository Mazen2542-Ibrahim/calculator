document.addEventListener("DOMContentLoaded", (e) => {
  const input = document.querySelector(".input");
  const numbersBtns = document.querySelectorAll(".number");
  const clearBtn = document.querySelector(".clear");
  const dotBtn = document.querySelector(".dot");
  const operators = document.querySelectorAll(".op");

  let firstNum = "";
  let currentOperator = "";
  let secondNum = "";

  /*  -----EventListeners-----  */
  numbersBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      getNumberBtnValue(btn);
    });
  });

  clearBtn.addEventListener("click", (e) => {
    input.textContent = "0";
  });

  dotBtn.addEventListener("click", (e) => {
    setDot();
  });

  operators.forEach((op) => {
    op.addEventListener("click", (e) => {
      const operator = op.textContent;
      evaluate(operator);
    });
  });

  /*  -----Functions-----  */
  function getNumberBtnValue(numberBtn) {
    let btnNum = numberBtn.textContent;
    let subEq = input.textContent;
    if (input.textContent.length === 1 && subEq === "0") {
      subEq = "";
    }
    input.textContent = subEq + btnNum;
  }

  function setDot() {
    let value = input.textContent;
    if (value.includes(".")) {
      return;
    } else {
      value += ".";
      input.textContent = value;
    }
  }

  function evaluate(operator) {
    let value = input.textContent;
    if (operator === "+/-") {
      input.textContent = Number(value) * -1;
      return;
    } else if (operator === "%") {
      input.textContent = Number(value) / 100;
      return;
    } else if (
      operator === "+" ||
      operator === "-" ||
      operator === "x" ||
      operator === "÷"
    ) {
      firstNum = input.textContent;
      currentOperator = operator;
      input.textContent = "0";
      return;
    }

    if (operator === "=") {
      let result = 0;
      secondNum = input.textContent;
      if (currentOperator === "") {
        input.textContent = secondNum;
        return;
      } else if (currentOperator === "+") {
        result = Number(firstNum) + Number(secondNum);
      } else if (currentOperator === "-") {
        result = Number(firstNum) - Number(secondNum);
      } else if (currentOperator === "x") {
        result = Number(firstNum) * Number(secondNum);
      } else if (currentOperator === "÷") {
        if (secondNum === "0") {
          input.textContent = "0";
          return;
        } else {
          result = Number(firstNum) / Number(secondNum);
        }
      }

      if (containDecimal(result)) {
        input.textContent = result.toFixed(6);
      } else {
        input.textContent = result;
      }
      currentOperator = "";
      result = 0;
      return;
    }
  }

  function containDecimal(n) {
    let result = n - Math.floor(n) !== 0;

    if (result) return true;
    else return false;
  }
});
