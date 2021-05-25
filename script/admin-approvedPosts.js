const adsDisplayDiv = document.querySelector(".admin-approved-posts-div");
const approvedPostsCount = document.querySelector(".approved-posts-count");
let newPostsTabCount = document.querySelector(".admin-new-posts-tab-count");
let approvedPostsTabCount = document.querySelector(
  ".admin-approved-posts-tab-count"
);
const signOutBtn = document.querySelector(".signout-btn");
let hostedUrl = "https://kvt-api.herokuapp.com";

signOutBtn.addEventListener("click", () => {
  localStorage.clear("adminToken");
  window.location.href = "admin-login.html";
});

const adminToken = localStorage.getItem("adminToken");

if (!adminToken) {
  window.location.href = "admin-login.html";
}

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
  adsDisplayDiv.innerText = "";
  for (let x = 0; x < data.length; x++) {
    let postData = data[x];
    let card = createCard(postData);
    adsDisplayDiv.insertAdjacentHTML("afterbegin", card);
    const product = document.querySelector(".product-card");
    product.addEventListener("click", () => {
      let myId = postData._id;
      localStorage.setItem("pendingProductId", myId);
      window.location.href = "admin-product-detail.html";
    });
  }
};

const url = `${hostedUrl}/admin/approved/`;
fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === "error") {
      console.log("error here");
      //   window.location.href = "index.html";
    } else {
      createAllAds(data.data);
      approvedPostsCount.innerText = data.data.length;
      approvedPostsTabCount.innerText = data.data.length;
    }
  });

const pendingUrl = `${hostedUrl}/admin/pending/`;
fetch(pendingUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
})
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === "error") {
      console.log("error here");
      //   window.location.href = "index.html";
    } else {
      newPostsTabCount.innerText = data.data.length;
    }
  });
