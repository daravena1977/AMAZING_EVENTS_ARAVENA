function crearCardsFragment(card, template, fragmentContenedor) {
  const { image, name, price, description } = card;
  template.querySelector("img").setAttribute("src", image);
  template.querySelector(".card-title").textContent = name;
  template.querySelector(".card-body section p").textContent = description;
  template.querySelector(".price p").textContent = `$${price}`;

  let cloneCard = template.cloneNode(true);

  fragmentContenedor.appendChild(cloneCard);
}
