export default function initGlobalFunction() {}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const clearHTML = function (elementHTML) {
  elementHTML.innerHTML = "";
};

export const extractNum = function (string) {
  string = +string.match(/\d+/g).join("");

  return string;
};
