const signOutBtn = document.querySelector(".signout-btn");
let apiNewUrl = "https://kvt-api.herokuapp.com";

signOutBtn.addEventListener("click", () => {
  localStorage.clear("token");
  window.location.href = "index.html";
});
