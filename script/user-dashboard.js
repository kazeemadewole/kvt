const userProfileTab = document.querySelector(".user-profile-tab");
const signout = document.querySelector(".signout-btn");
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

let hostedUrl = "https://kvt-api.herokuapp.com";

const populateProfilePage = (data) => {
  const profileWrapper = document.querySelector(".profile-wrapper");
  profileWrapper.innerText = "";
  const profile = ` 
  <div class="col col-md-12 biodata-details">
      <p class="details-para"><span class="bioData-label">Name: </span><br><span class="bioData-value">${data.firstName} ${data.lastName}</span></p>
      <p class="details-para"><span class="bioData-label">Email: </span><br><span class="bioData-value">${data.email}</span></p>
      <p class="details-para"><span class="bioData-label">Address: </span><br><span class="bioData-value">${data.location}</span></p>
      <p class="details-para"><span class="bioData-label">Mobile Number: </span><br><span class="bioData-value">${data.phone}</span></p>
      
      <div class="flex-col social-media-div">
          <p>Connect with me</p>
          <div class="social-share-wrapper flex-row">
              <a href="#"><span class="iconify" data-icon="ic:baseline-alternate-email" data-inline="false"></span></a>
              <a href="#"><span class="iconify" data-icon="entypo-social:facebook-with-circle" data-inline="false"></span></a>
              <a href="#"><span class="iconify" data-icon="entypo-social:twitter-with-circle" data-inline="false"></span></a>
              <a href="#"><span class="iconify" data-icon="entypo-social:instagram-with-circle" data-inline="false"></span></a>
              <a href="#"><span class="iconify" data-icon="ri:whatsapp-fill" data-inline="false"></span></a>
              <a href="#"><span class="iconify" data-icon="cib:telegram" data-inline="false"></span></a>
          </div>
      </div>

  </div> `;
  profileWrapper.insertAdjacentHTML("afterbegin", profile);
};

const profileUrl = `${hostedUrl}/user/me/`;
fetch(profileUrl, {
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
      populateProfilePage(data.data);
    }
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
