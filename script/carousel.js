let createCarousel = (data) => {
  let rightArrow = document.querySelector(".right-arrow");
  let leftArrow = document.querySelector(".left-arrow");
  let imageContainer = document.querySelector(".image-container");
  var currentIndex = 0;

  let imagesArray = data.productImage;

  imagesArray.map((element) => {
    let carouselImage = document.createElement("img");
    carouselImage.src = element.replace(
      "http://localhost:5005/dist/public/images",
      "https://kvt-api.herokuapp.com"
    );
    imageContainer.insertAdjacentElement("afterbegin", carouselImage);
  });

  //create dots/circle
  for (let i = 0; i < imagesArray.length; i++) {
    let newDot = document.createElement("li");
    newDot.className = "fa fa-circle";
    // newDot.setAttribute("onclick", "dotClick(this.id)");
    newDot.setAttribute("id", parseInt(i));
    newDot.addEventListener("click", () => {
      dotClick(i);
    });

    let dotContainer = document.querySelector(".dotList");
    dotContainer.appendChild(newDot);
  }

  let carouselImages = document.querySelectorAll(".image-container img");
  let displayImage = () => {
    for (let j = 0; j < imagesArray.length; j++) {
      [...carouselImages][j].style.display = "none";
    }
    [...carouselImages][currentIndex].style.display = "block";
  };

  let dotNode = document.querySelectorAll(".fa-circle");
  let displayDot = () => {
    for (let j = 0; j < dotNode.length; j++) {
      [...dotNode][j].style.color = "grey";
    }
    [...dotNode][currentIndex].style.color = "blue";
  };

  leftArrow.addEventListener("click", () => {
    if (currentIndex == 0) {
      currentIndex = imagesArray.length - 1;
    } else {
      currentIndex--;
    }
    displayImage();
    displayDot();
  });

  rightArrow.addEventListener("click", () => {
    if (currentIndex == imagesArray.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    displayImage();
    displayDot();
  });

  let dotClick = (c) => {
    currentIndex = c;
    displayImage();
    displayDot();
  };

  displayImage();
  displayDot();
};
