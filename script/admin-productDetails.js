let datePosted = document.querySelector(".date-posted");
let region = document.querySelector(".region");
let detailsTitle = document.querySelector(".details-title");
let detailsPrice = document.querySelector(".details-price");
let mainInfo = document.querySelector(".main-info");
let phoneNumber = document.querySelector(".phone-number .value");
let approveBtn = document.querySelector(".approve-post");
let rejectBtn = document.querySelector(".reject-post");
let deleteBtn = document.querySelector(".delete-post");
let hostedUrl = "https://kvt-api.herokuapp.com";

const productId = localStorage.getItem("pendingProductId");

const populateProductPage = (data) => {
  const date = new Date();
  datePosted.innerText = date.toDateString(data.createdAt);
  region.innerText = data.location;
  detailsTitle.innerText = data.title;
  detailsPrice.innerText = data.price;
  mainInfo.innerText = data.description;
  phoneNumber.innerText = data.contact;
};

approveBtn.addEventListener("click", () => {
  if (confirm("Do you want to approve the Post?")) {
    const url = `${hostedUrl}/admin/${productId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({
        status: "approved",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.href = "admin-dashboard.html";
      })
      .catch((error) => console.log("error", error));
  } else {
    // do nothing
  }
});

rejectBtn.addEventListener("click", () => {
  if (confirm("Do you want to reject the Post?")) {
    const url = `${hostedUrl}/admin/${productId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({
        status: "rejected",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.href = "admin-dashboard.html";
      })
      .catch((error) => console.log("error", error));
  } else {
    // do nothing
  }
});

deleteBtn.addEventListener("click", () => {
  if (confirm("Do you want to delete the Post?")) {
    const url = `${hostedUrl}/admin/${productId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.href = "admin-dashboard.html";
      })
      .catch((error) => console.log("error", error));
  } else {
    // do nothing
  }
});

const productUrl = `${hostedUrl}/${productId}`;
fetch(productUrl)
  .then((resp) => resp.json())
  .then((data) => {
    populateProductPage(data.data);
    createCarousel(data.data);
  });
