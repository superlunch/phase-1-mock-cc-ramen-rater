fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramens) => {
    ramens.forEach((ramen) => {
      addRamen(ramen);
    });

    displayRamenDetails(ramens[0]);

    const form = document.getElementById("new-ramen");
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const newName = document.getElementById("new-name").value;
      const newRest = document.getElementById("new-restaurant").value;
      const newImage = document.getElementById("new-image").value;
      const newRating = document.getElementById("new-rating").value;
      const newComment = document.getElementById("new-comment").value;

      const newRamenObj = {
        name: newName,
        restaurant: newRest,
        image: newImage,
        rating: newRating,
        comment: newComment,
      };

      addRamen(newRamenObj);

      fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: newName,
          restaurant: newRest,
          image: newImage,
          rating: newRating,
          comment: newComment,
        }),
      });

      form.reset();
    });
  });

function addRamen(ramen) {
  const ramenMenu = document.getElementById("ramen-menu");
  const ramenImage = document.createElement("img");

  ramenImage.src = ramen.image;
  ramenImage.addEventListener("click", () => {
    displayRamenDetails(ramen);
  });

  ramenMenu.append(ramenImage);
}

function displayRamenDetails(ramen) {
  const image = document.querySelector(".detail-image");
  image.src = ramen.image;

  const ramenName = document.querySelector(".name");
  ramenName.textContent = ramen.name;

  const restName = document.querySelector(".restaurant");
  restName.textContent = ramen.restaurant;

  const ramenRating = document.getElementById("rating-display");
  ramenRating.textContent = ramen.rating;

  const ramenComment = document.getElementById("comment-display");
  ramenComment.textContent = ramen.comment;
}