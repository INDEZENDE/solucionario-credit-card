/*
Credit card numbers
4063983441680371
*/

let form = document.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();
  let cardValidReport = validateCardDetails(form);
  paintValidOrInvalidClasses(cardValidReport);
});

function validateCardDetails(element) {
  //escribe tu código aqui
  let elementArray = Array.from(element);

  let cardNumberElement = elementArray.find(item => item.id == "cn");
  let isValidCreditCardNumber = luhnAlgorithm(cardNumberElement.value);

  let cvvElement = elementArray.find(item => item.id === "cvv");
  let isValidCVVNumber = cvvValidator(cvvElement.value);

  let dateElement = elementArray.find(item => item.id === "exp");
  let isValidDate = dateValidator(dateElement.value);

  return {
    cn: isValidCreditCardNumber,
    cvv: isValidCVVNumber,
    exp: isValidDate
  };
}

function dateValidator(string) {
  let dateArray = string.split("/");
  let month = parseInt(dateArray[0]);
  let year = parseInt(dateArray[1]);

  return Date.now() < Date.UTC(2000 + year, month) ? true : false;
}

function luhnAlgorithm(cardNumbers) {
  if (cardNumbers == "") {
    return false;
  }
  let cardNumbersToArrayReversed = cardNumbers
    .split("")
    .map(Number)
    .reverse();

  let multiplyEvensByTwo = cardNumbersToArrayReversed.map((number, index) => {
    if (index % 2 != 0) {
      return number * 2;
    } else {
      return number;
    }
  });

  let addNumbersIfMoreThan10 = multiplyEvensByTwo.map(number => {
    if (number => 10) {
      return addDigitsInNumber(number);
    } else {
      return number;
    }
  });

  const sumOfNumbers = addDigitsInArray(addNumbersIfMoreThan10);

  // this is a ternary operator
  return sumOfNumbers % 10 === 0 ? true : false;
}

function cvvValidator(number) {
  if (number == "") {
    return false;
  }
  let numberParse = parseInt(number);
  if (numberParse >= 100 && numberParse <= 999) {
    return true;
  } else {
    return false;
  }
}

function addDigitsInNumber(number) {
  return number
    .toString()
    .split("")
    .map(Number)
    .reduce(function(a, b) {
      return a + b;
    }, 0);
}

function addDigitsInArray(array) {
  return array.reduce((a, b) => {
    return a + b;
  }, 0);
}

function paintValidOrInvalidClasses(object) {
  for (key in object) {
    document.getElementById(key).className = object[key] ? "success" : "error";
  }
}
