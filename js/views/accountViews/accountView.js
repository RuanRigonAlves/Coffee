import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function accountView() {}

export const displayAccount = function (section) {
  section.classList = "main-section";

  section.insertAdjacentHTML(
    "afterbegin",
    `
    <section class="account-section animated-element-opacity">
      <div class="account-info">
        <h1>account info</h1>
        <a class="logout-button" href="./php/includes/logout.inc.php">Logout</a>
    </section>
  `
  );
};
