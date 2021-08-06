const adsDisplayDiv = document.querySelector(".result-display-div");
const allCategory = document.querySelector(".all-category");
const automobiles = document.querySelector(".automobiles");
const sports = document.querySelector(".sports");
const electronics = document.querySelector(".electronics");
const fashion = document.querySelector(".fashion");
const realEstate = document.querySelector(".real-estate");
const searchBtnLoggedIn = document.querySelector(".search-btn-logged-in");
const searchBtnGeneral = document.querySelector(".search-btn-general");
const searchHeader = document.querySelector(
  ".landing-page-content-header-div .search-header"
);
const sortPriceAscending = document.querySelector(".sort-price-asc");
const sortPriceDescending = document.querySelector(".sort-price-desc");
const sortProductRating = document.querySelector(".sort-product-rating");

let apiUrl = "https://kvt-api.herokuapp.com/";

const createCard = (postData) => {
  const productImage = postData.productImage[0];
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
            <p class="category">${postData.category.category}</p>
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
      localStorage.setItem("productId", myId);
      window.location.href = "product-details.html";
    });
  }
};

const filterResult = (data) => {
  let automobilesArray = [];
  let sportsArray = [];
  let electronicsArray = [];
  let fashionArray = [];
  let realEstateArray = [];

  data.map((element) => {
    switch (element.category.category) {
      case "automobiles":
        automobilesArray.push(element);
        break;
      case "sports":
        sportsArray.push(element);
        break;
      case "electronics":
        electronicsArray.push(element);
        break;
      case "fashion":
        fashionArray.push(element);
        break;
      case "real estate":
        realEstateArray.push(element);
        break;

      default:
        break;
    }
  });

  sortPriceDescending.addEventListener("click", () => {
    const searchHeaderTitle = searchHeader.textContent.toLowerCase();
    switch (searchHeaderTitle) {
      case "all ads":
        data.sort((a, b) => a.price - b.price);
        createAllAds(data);
        break;
      case "automobiles":
        automobilesArray.sort((a, b) => a.price - b.price);
        createAllAds(automobilesArray);
        break;
      case "fashion":
        fashionArray.sort((a, b) => a.price - b.price);
        createAllAds(fashionArray);
        break;
      case "electronics":
        electronicsArray.sort((a, b) => a.price - b.price);
        createAllAds(electronicsArray);
        break;
      case "sports":
        sportsArray.sort((a, b) => a.price - b.price);
        createAllAds(sportsArray);
        break;
      case "real estate":
        realEstateArray.sort((a, b) => a.price - b.price);
        createAllAds(realEstateArray);
        break;
      default:
        break;
    }
  });

  sortPriceAscending.addEventListener("click", () => {
    const searchHeaderTitle = searchHeader.textContent.toLowerCase();
    switch (searchHeaderTitle) {
      case "all ads":
        data.sort((a, b) => b.price - a.price);
        createAllAds(data);
        break;
      case "automobiles":
        automobilesArray.sort((a, b) => b.price - a.price);
        createAllAds(automobilesArray);
        break;
      case "fashion":
        fashionArray.sort((a, b) => b.price - a.price);
        createAllAds(fashionArray);
        break;
      case "electronics":
        electronicsArray.sort((a, b) => b.price - a.price);
        createAllAds(electronicsArray);
        break;
      case "sports":
        sportsArray.sort((a, b) => b.price - a.price);
        createAllAds(sportsArray);
        break;
      case "real estate":
        realEstateArray.sort((a, b) => b.price - a.price);
        createAllAds(realEstateArray);
        break;
      default:
        break;
    }
  });

  searchBtnGeneral.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInputFieldGeneral = document.querySelector(
      ".searchInputFieldGeneral"
    );
    let searchQuery = searchInputFieldGeneral.value;

    let matchedSearch = data.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    createAllAds(matchedSearch);
  });
  searchBtnLoggedIn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInputFieldLoggedIn = document.querySelector(
      ".searchInputFieldLoggedIn"
    );
    let searchQuery = searchInputFieldLoggedIn.value;

    let matchedSearch = data.filter((element) => {
      return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    createAllAds(matchedSearch);
  });

  allCategory.addEventListener("click", () => {
    searchHeader.innerText = "ALL ADS";
    createAllAds(data);
  });
  automobiles.addEventListener("click", () => {
    searchHeader.innerText = "AUTOMOBILES";
    createAllAds(automobilesArray);
  });
  electronics.addEventListener("click", () => {
    searchHeader.innerText = "ELECTRONICS";
    createAllAds(electronicsArray);
  });
  sports.addEventListener("click", () => {
    searchHeader.innerText = "SPORTS";
    createAllAds(sportsArray);
  });
  fashion.addEventListener("click", () => {
    searchHeader.innerText = "FASHION";
    createAllAds(fashionArray);
  });
  realEstate.addEventListener("click", () => {
    searchHeader.innerText = "REAL ESTATE";
    createAllAds(realEstateArray);
  });
};

const url = apiUrl;
fetch(url)
  .then((resp) => resp.json())
  .then((data) => {
    if (!data) {
      console.log("server unavailable");
    } else {
      console.log(data);
      createAllAds(data.data);
      filterResult(data.data);
    }
  });

$(document).ready(function () {
  $(".dropdown").each(function (key, dropdown) {
    var $dropdown = $(dropdown);
    $dropdown.find(".dropdown-menu a").on("click", function () {
      $dropdown
        .find("button")
        .text($(this).text())
        .append(' <span class="caret"></span>');
    });
  });
});
