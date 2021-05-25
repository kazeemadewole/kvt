const signInBtn = document.querySelector("#signin-btn");
const signInForm = document.querySelector("#signInForm");
const signUpBtn = document.querySelector("#signup-btn");
const signUpForm = document.querySelector("#signUpForm");
const signInTab = document.querySelector("#pills-signin-tab");
const sellProduct = document.querySelector(".sell-product");
const generalNav = document.querySelector(".general");
const logggedInNav = document.querySelector(".loggedin");
const signInOutLink = document.querySelector(".signin-out-link");
let password = document.querySelector("#signup-password");
let confirm_password = document.querySelector("#confirm_password");

let signInRegistrationModal = document.querySelector(
  "#sign-in-registration-modal"
);
const signOutBtn = document.querySelector(".signout-btn");
let apiNewUrl = "https://kvt-api.herokuapp.com";

signOutBtn.addEventListener("click", () => {
  localStorage.clear("token");
  window.location.href = "index.html";
});

if (localStorage.getItem("token")) {
  generalNav.classList.add("hide");
  logggedInNav.classList.remove("hide");
  logggedInNav.classList.add("show");
}

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = signInForm.querySelector("#signin-email").value;
  const password = signInForm.querySelector("#signin-password").value;

  fetch(`${apiNewUrl}/login/`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.status === "fail") {
        alert("Email or password incorrect, Please try again");
      } else {
        const loginToken = data.token;
        const userId = data.data._id;
        const phoneNumber = data.data.phone;
        localStorage.setItem("token", loginToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("phoneNumber", phoneNumber);

        !signInRegistrationModal.click();

        generalNav.classList.add("hide");
        logggedInNav.classList.remove("hide");
        logggedInNav.classList.add("show");
        window.location.href = window.location.href;
      }
    });
});

let validatePassword = () => {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
};
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = signUpForm.querySelector("#signup-email").value;
  const firstName = signUpForm.querySelector("#firstname").value;
  const lastName = signUpForm.querySelector("#lastname").value;
  const phone = signUpForm.querySelector("#phonenumber").value;
  const location = signUpForm.querySelector("#location").value;
  const password = signUpForm.querySelector("#signup-password").value;

  fetch(`${apiNewUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      phone,
      location,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data, "login message");
      if (data.status === "error") {
        alert(data.message);
      } else {
        alert("Account Successfully Created. Kindly Login");
        signInTab.click();
      }
    });
});

sellProduct.addEventListener("click", (e) => {
  e.preventDefault();
  signInOutLink.click();

  signInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = signInForm.querySelector("#signin-email").value;
    const password = signInForm.querySelector("#signin-password").value;

    fetch(`${apiNewUrl}/login/`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, "login message");
        if (data.status === "fail") {
          alert("Email or password incorrect, Please try again");
        } else {
          const loginToken = data.token;
          localStorage.setItem("token", loginToken);
          window.location.href = "create-ad.html";
          generalNav.classList.add("hide");
          logggedInNav.classList.remove("hide");
          logggedInNav.classList.add("show");
        }
      });
  });
});
