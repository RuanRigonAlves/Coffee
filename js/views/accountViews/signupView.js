import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function signupView() {}

const mainSection = document.querySelector(".main-section");

export const displaySignup = function (section) {
  section.classList = "main-section ";

  section.insertAdjacentHTML(
    "afterbegin",
    `
    
    <div class="form animated-element-opacity">
    <form id="signup-form">
        <div id="form-messages"></div>
        <h1 class="login-title">Signup</h1>
        <input class="login-input" type="text" id="username" name="username" placeholder="Username">
        <input class="login-input" type="email" id="email" name="email" placeholder="E-Mail">
        <input class="login-input" type="password" id="password" name="password" placeholder="Password">
        <input class="login-button" type="button" id="submit-button" value="Register">
        <p id="link" class="link">Already registered?</p>

    </form>
</div>

        
        `
  );
};

export const displayLogin = function (section) {
  section.classList = "main-section ";

  section.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="form animated-element-opacity">
    <form id="login-form">
        <div id="form-messages"></div>
        <h1 class="login-title">Login</h1>
        <input class="login-input" type="email" id="email" name="email" placeholder="E-Mail">
        <input class="login-input" type="password" id="password" name="password" placeholder="Password">
        <input class="login-button" type="button" id="submit-button" value="Login">
        <p id="link" class="link">Register now</p>
    </form>
</div>
    `
  );
};

export const validateLogin = function () {
  const form = document.getElementById("login-form");
  const submitButton = document.getElementById("submit-button");
  const registerAccountLink = document.getElementById("link");

  submitButton.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare form data for sending to the server
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Send an AJAX request to the server
    fetch("./php/includes/login.inc.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("Success")) {
          location.reload();
        }
        // Display the response from the server on the page
        document.getElementById("form-messages").innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  registerAccountLink.addEventListener("click", function () {
    globalFunctions.clearHTML(mainSection);

    displaySignup(mainSection);

    validateSignup();
  });
};

export const validateSignup = function () {
  const form = document.getElementById("signup-form");
  const submitButton = document.getElementById("submit-button");
  const loginLink = document.getElementById("link");

  submitButton.addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare form data for sending to the server
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // Send an AJAX request to the server
    fetch("./php/includes/signup.inc.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("Success")) {
          location.reload();
        }
        // Display the response from the server on the page
        document.getElementById("form-messages").innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  loginLink.addEventListener("click", function () {
    globalFunctions.clearHTML(mainSection);

    displayLogin(mainSection);

    validateLogin();
  });
};
