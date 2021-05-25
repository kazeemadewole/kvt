let datePosted = document.querySelector(".date-posted");
let region = document.querySelector(".region");
let detailsTitle = document.querySelector(".details-title");
let detailsPrice = document.querySelector(".details-price");
let mainInfo = document.querySelector(".main-info");
let phoneNumber = document.querySelector(".phone-number .value");
let deletePostBtn = document.querySelector(".delete-post-btn");
let signOut = document.querySelector(".signout-btn");

let hostedUrl = "https://kvt-api.herokuapp.com";

const productId = localStorage.getItem("productId");

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

// favoriteBtn.addEventListener("click", () => {
//   if (favoriteBtn.classList.contains("favorite-selected")) {
//     favoriteBtn.classList.remove("favorite-selected");
//     favoriteBtn.classList.add("favorite-deselected");

//     const favoriteUrl = `${hostedUrl}/user/${productId}`;
//     fetch(favoriteUrl, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: {
//         favorite: "false",
//       },
//     })
//       .then((resp) => resp.text())
//       .then((data) => {
//         console.log(data);
//       });
//   } else {
//     favoriteBtn.classList.add("favorite-selected");
//     favoriteBtn.classList.remove("favorite-deselected");

//     const favoriteUrl = `${hostedUrl}/user/${productId}`;
//     fetch(favoriteUrl, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: {
//         favorite: "true",
//       },
//     })
//       .then((resp) => resp.text())
//       .then((data) => {
//         console.log(data);
//       });
//   }
// });

deletePostBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete the post?")) {
    const productUrl = `${hostedUrl}/user/me/product/${productId}`;
    fetch(productUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        window.location.href = "user-dashboard.html";
      });
  }
});

const productUrl = `${hostedUrl}/${productId}`;
fetch(productUrl)
  .then((resp) => resp.json())
  .then((data) => {
    populateProductPage(data.data);
    createCarousel(data.data);
  });
