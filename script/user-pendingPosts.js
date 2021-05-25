const resultDisplayDiv = document.querySelector(".pending-posts-div");
const pendingPostsCount = document.querySelector(".pending-posts-count");
const pendingPostsTabCount = document.querySelector(".pending-posts-tab-count");
const rejectedPostsTabCount = document.querySelector(
  ".rejected-posts-tab-count"
);
const approvedPostsTabCount = document.querySelector(
  ".approved-posts-tab-count"
);

const signout = document.querySelector(".signout-btn");

let hostedUrl = "https://kvt-api.herokuapp.com";

const createCard = (postData) => {
  const productImage = postData.productImage[0];
  let card = ` <div class="col product-card">
            <div class="card h-100 flex-col">
            <img src="${productImage}" class="card-img-top" alt="product_image">
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
        window.location.href = "user-productDetail.html";
      });
    }
  } else {
    let message = document.createElement("p");
    message.classList = "text-center";
    message.innerText = "You Currently Have No Pending Post";
    resultDisplayDiv.appendChild(message);
  }
};

const url = `${hostedUrl}/user/me/product`;
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
      createAllAds(data.Pending);
      pendingPostsCount.innerText = data.Pending.length;
      pendingPostsTabCount.innerText = data.Pending.length;
      approvedPostsTabCount.innerText = data.Approved.length;
      rejectedPostsTabCount.innerText = data.Rejected.length;
    }
  });

signout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear("token");
  window.location.href = "index.html";
});
