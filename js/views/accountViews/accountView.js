import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function accountView() {}

export const displayLogin = function (section) {
  section.classList = "main-section";

  section.insertAdjacentHTML(
    "afterbegin",
    `

    <div class="form">
      <form action="php/includes/signup.inc.php" method="post">
        <h1 class="login-title">Signup</h1>
        <input class="login-input" type="text" name="username" placeholder="Username">
        <input class="login-input" type="email" name="email" placeholder="E-Mail">
        <input class="login-input" type="password" name="password" placeholder="Password">
        <input class="login-button"type="submit" name="submit" value="Register">
        <p class="link"><a href="">Click to Login</a></p>
      </form>
    </div>
        
        `
  );
};
