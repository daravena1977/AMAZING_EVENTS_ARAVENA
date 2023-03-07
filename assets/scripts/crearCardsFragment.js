function crearCardsFragment(card, template, fragmentContenedor) {
  const { image, name, price, description } = card;
  template.querySelector("div").setAttribute("class", "card");
  template.querySelector("div").setAttribute("style", "width: 18rem");
  template.querySelector("img").setAttribute("src", image);
  template.querySelector("img").setAttribute("class", "card-img-top");
  template.querySelector("img").setAttribute("alt", "...");
  template.querySelector(".card div").setAttribute("class", "card-body");
  template.querySelector(".card-body h5").setAttribute("class", "card-title");
  template.querySelector(".card-title").textContent = name;
  template.querySelector(".card-body section p").textContent = description;
  template.querySelector(".card-body div").setAttribute("class", "price-section");
  template.querySelector(".price-section section").setAttribute("class", "price");
  template.querySelector(".price p").textContent = price;
  template.querySelector(".price-section a").setAttribute("href", "./details.html");
  template.querySelector(".price-section a").setAttribute("class", "btn btn-primary");
  template.querySelector(".price-section a").textContent = "Details";

  let cloneCard = template.cloneNode(true);
  fragmentContenedor.appendChild(cloneCard);
}
