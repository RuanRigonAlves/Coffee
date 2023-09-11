import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function accountView() {}

export const displayAccount = function (section) {
  section.classList = "main-section";

  section.insertAdjacentHTML(
    "afterbegin",
    `
  <p>adsadada</p>
  `
  );
};
