let datePosted = document.querySelector(".date-posted");
let region = document.querySelector(".region");
let detailsTitle = document.querySelector(".details-title");
let detailsPrice = document.querySelector(".details-price");
let mainInfo = document.querySelector(".main-info");
let phoneNumber = document.querySelector(".phone-number .value");
let favoriteBtn = document.querySelector(".favorite-btn");
let signInOutBtn = document.querySelector(".signin-out-link");
let signOut = document.querySelector(".signout-btn");
let myProfile = document.querySelector(".my-profile");
let favoritesLink = document.querySelector(".favorites-link");
let hostedUrl = "https://kvt-api.herokuapp.com";

const productId = localStorage.getItem("productId");
const userId = localStorage.getItem("userId");

if (localStorage.getItem("token")) {
  signInOutBtn.classList.add("hide");
} else {
  signOut.classList.add("hide");
  myProfile.classList.add("hide");
  favoritesLink.classList.add("hide");
}

signOut.addEventListener("click", () => {
  localStorage.clear("token");
  window.location.href = "index.html";
});

const populateProductPage = (data) => {
  const date = new Date();
  datePosted.innerText = date.toDateString(data.createdAt);
  region.innerText = data.location;
  detailsTitle.innerText = data.title;
  detailsPrice.innerText = `N ${data.price}`;
  mainInfo.innerText = data.description;
  phoneNumber.innerText = data.contact;

  // if (data.favorite) {
  //   favoriteBtn.classList.add("favorite-selected");
  // }
};

favoriteBtn.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    console.log(userId);
    if (favoriteBtn.classList.contains("favorite-selected")) {
      favoriteBtn.classList.remove("favorite-selected");
      favoriteBtn.classList.add("favorite-deselected");

      const favoriteUrl = `${hostedUrl}/user/me/product/favorite/${productId}`;
      fetch(favoriteUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          id: userId,
        },
      })
        .then((resp) => resp.text())
        .then((data) => {
          console.log(data);
        });
    } else {
      favoriteBtn.classList.add("favorite-selected");
      favoriteBtn.classList.remove("favorite-deselected");

      const favoriteUrl = `${hostedUrl}/user/${productId}`;
      fetch(favoriteUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          favorite: "true",
        },
      })
        .then((resp) => resp.text())
        .then((data) => {
          console.log(data);
        });
    }
  } else {
    alert(
      "Only registered or signed-in users can perform this action. Kindly register or signin"
    );
  }
});

const productUrl = `${hostedUrl}/${productId}`;
fetch(productUrl)
  .then((resp) => resp.json())
  .then((data) => {
    populateProductPage(data.data);
    createCarousel(data.data);
  });
