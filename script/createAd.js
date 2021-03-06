"use strict";

const submitBtn = document.querySelector("#create-post-submit-btn");
const productTitle = document.querySelector("#product-title");
const price = document.querySelector("#price");
const city = document.querySelector("#city");
const category = document.querySelector("#category");
const productDescription = document.querySelector("#product-description");
const pictureUpload = document.querySelector("#picture-select");
const formDiv = document.querySelector("#new-post-form");
const signout = document.querySelector(".signout-btn");
const createAdBtnDiv = document.querySelector(".createAd-btn-div");
const pendingPostsTabCount = document.querySelector(".pending-posts-tab-count");
const rejectedPostsTabCount = document.querySelector(
  ".rejected-posts-tab-count"
);
const approvedPostsTabCount = document.querySelector(
  ".approved-posts-tab-count"
);
const favoritePostsTabCount = document.querySelector(
  ".favorite-posts-tab-count"
);

let spinner = document.createElement("p");
spinner.innerText = "... uploading post, please wait ...";

const token = localStorage.getItem("token");
let hostedUrl = "https://kvt-api.herokuapp.com";

if (!token) {
  window.location.href = "index.html";
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

formDiv.addEventListener("submit", (e) => {
  createAdBtnDiv.appendChild(spinner);
  e.preventDefault();
  let categoryValue = "";
  if (category.value === "automobiles") {
    categoryValue += "60a4216f33b1ef6860a5b3c8";
  } else if (category.value === "fashion") {
    categoryValue += "60a420df33b1ef6860a5b3c5";
  } else if (category.value === "electronics") {
    categoryValue += "60a419f927b236666077f9a6";
  } else if (category.value === "real estate") {
    categoryValue += "60a419e727b236666077f9a5";
  } else if (category.value === "sports") {
    categoryValue += "60a389756dc4ab4e8efdc166";
  }

  const files = pictureUpload.files;
  const formData = new FormData();
  for (let x = 0; x < files.length; x++) {
    let file = files[x];
    console.log(file);
    formData.append("productImage", file);
  }
  formData.append("title", productTitle.value);
  formData.append("description", productDescription.value);
  formData.append("location", city.value);
  formData.append("category", categoryValue);
  formData.append("price", price.value);
  formData.append("contact", localStorage.getItem("phoneNumber"));

  console.log(formData);
  const postUrl = `${hostedUrl}/user/me/product`;
  fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("hello", data);

      if (data.status === "success") {
        alert("Ad successfully created");
        window.location.reload();
      } else if (data.status === "error") {
        spinner.style.display = "none";
        alert("Ad creation unsuccessful, Please try again");
      }
    })
    .catch((error) => console.log(error));
});

signout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear("token");
  window.location.href = "index.html";
});

const url = `${hostedUrl}/user/me/product/favorite`;
fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === "error") {
      window.location.href = "index.html";
    } else {
      favoritePostsTabCount.innerText = data.length;
    }
  });

const tabCountUrl = `${hostedUrl}/user/me/product`;
fetch(tabCountUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === "error") {
      window.location.href = "index.html";
    } else {
      pendingPostsTabCount.innerText = data.Pending.length;
      approvedPostsTabCount.innerText = data.Approved.length;
      rejectedPostsTabCount.innerText = data.Rejected.length;
    }
  });
