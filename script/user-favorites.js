const resultDisplayDiv = document.querySelector(".favorites-posts-div");
const favoritesPostsCount = document.querySelector(".favorites-posts-count");
const favoritePostsTabCount = document.querySelector(
  ".favorite-posts-tab-count"
);
const pendingPostsTabCount = document.querySelector(".pending-posts-tab-count");
const rejectedPostsTabCount = document.querySelector(
  ".rejected-posts-tab-count"
);
const approvedPostsTabCount = document.querySelector(
  ".approved-posts-tab-count"
);
let hostedUrl = "https://kvt-api.herokuapp.com";

const createCard = (postData) => {
  const productImage = postData.productImage[0].replace(
    "dist/public/images/",
    ""
  );
  let card = ` <div class="col product-card">
            <div class="card h-100 flex-col">
            <div class="card-image-div">
          <img src="${productImage}" class="card-img-top" alt="product_image">
          </div>
            <div class="card-body">
              <h6 class="card-title">${postData.title}</h6>
              <p class="product-description">${postData.description
                .split(" ")
                .splice(0, 10)
                .join(" ")}</p>
              <h5 class="price">${postData.price}</h5>
              <p class="region">${postData.location}</p>
              <p>${postData.category.category}</p>
            </div>
          </div>
      </div> `;
  return card;
};

const createAllAds = (data) => {
  resultDisplayDiv.innerText = "";
  if (data.length > 0) {
    for (let x = 0; x < data.length; x++) {
      let postData = data[x];
      let card = createCard(postData);
      resultDisplayDiv.insertAdjacentHTML("afterbegin", card);
      const product = document.querySelector(".product-card");
      product.addEventListener("click", () => {
        let myId = postData._id;
        localStorage.setItem("productId", myId);
        window.location.href = "product-details.html";
      });
    }
  } else {
    let message = document.createElement("p");
    message.classList = "text-center";
    message.innerText = "You Have No Favorite Product Selected";
    resultDisplayDiv.appendChild(message);
  }
};

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
      console.log(data);
      createAllAds(data.data);
      favoritesPostsCount.innerText = data.length;
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
      createAllAds(data.Pending);
      pendingPostsTabCount.innerText = data.Pending.length;
      approvedPostsTabCount.innerText = data.Approved.length;
      rejectedPostsTabCount.innerText = data.Rejected.length;
    }
  });
