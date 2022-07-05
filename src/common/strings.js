export function moneyFormat(number_) {
  var number = number_.toString(),
    dollars = number.split(".")[0],
    cents = (number.split(".")[1] || "") + "00";
  dollars = dollars
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3}(?!$))/g, "$1.")
    .split("")
    .reverse()
    .join("");
  return dollars;
}

export function toCapitalLetter(str) {
  str = str.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}
