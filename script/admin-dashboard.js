const adsDisplayDiv = document.querySelector(".admin-pending-posts-div");
const signOutBtn = document.querySelector(".signout-btn");
let newPostsTabCount = document.querySelector(".admin-new-posts-tab-count");
let approvedPostsTabCount = document.querySelector(
  ".admin-approved-posts-tab-count"
);

let hostedUrl = "https://kvt-api.herokuapp.com";
// let hostedUrl = "http://127.0.0.1:5005";

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
  if (data.length > 0) {
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
  } else {
    let message = document.createElement("p");
    message.classList = "text-center";
    message.innerText = "There are no new posts to be approved";
    adsDisplayDiv.appendChild(message);
  }
};

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
      console.log(data.data);
      createAllAds(data.data);
      newPostsTabCount.innerText = data.data.length;
      approvedPostsTabCount;
    }
  });

const approvedUrl = `${hostedUrl}/admin/approved/`;
fetch(approvedUrl, {
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
      approvedPostsTabCount.innerText = data.data.length;
    }
  });
