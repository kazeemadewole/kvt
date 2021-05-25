const signInBtn = document.querySelector("#signin-btn");
const signInForm = document.querySelector("#signInForm");
const signUpBtn = document.querySelector("#signup-btn");
const signUpForm = document.querySelector("#signUpForm");
const signInTab = document.querySelector("#pills-signin-tab");
const signInOutLink = document.querySelector(".signin-out-link");
let hostedUrl = "https://kvt-api.herokuapp.com";

localStorage.clear("adminToken");
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = signInForm.querySelector("#signin-email").value;
  const password = signInForm.querySelector("#signin-password").value;

  fetch(`${hostedUrl}/admin/login/`, {
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
      if (data.status === "fail" || data.data.role === "user") {
        alert("Email or password incorrect, Please try again");
      } else {
        const adminToken = data.token;
        localStorage.setItem("adminToken", adminToken);
        window.location.href = "admin-dashboard.html";
      }
    });
});

// signUpBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const email = signUpForm.querySelector("#signup-email").value;
//   const firstName = signUpForm.querySelector("#firstname").value;
//   const lastName = signUpForm.querySelector("#lastname").value;
//   const phone = signUpForm.querySelector("#phonenumber").value;
//   const location = signUpForm.querySelector("#location").value;
//   const password = signUpForm.querySelector("#signup-password").value;

//   fetch("${hostedUrl}/signup", {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
//       firstName,
//       lastName,
//       phone,
//       location,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       console.log(data, "login message");
//       if (data.status === "error") {
//         alert(data.message);
//       } else {
//         alert("Account Successfully Created. Kindly Login");
//         signInTab.click();
//       }
//     });
// });
