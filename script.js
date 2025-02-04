let container = document.getElementById("pokemon_card_container");
let searchInput = document.getElementById("search");

function createPokemonCard(pokemon) {
  let card = document.createElement("div");
  card.classList.add("pokemon_card");

  card.innerHTML = `
    <div class='card_inner'>
        <div class='card_front p-4'>
            <div class='text-lg font-bold'>#${pokemon.id}</div>
            <img src='${pokemon.sprites.front_default}' class='w-20 h-20'>
            <div class='text-xl font-semibold mt-2'>${pokemon.name.toUpperCase()}</div>
            <div class='bg-gray-200 px-2 py-1 mt-2 rounded'>${pokemon.types[0].type.name.toUpperCase()}</div>
        </div>
        <div class='card_back p-4 text-white'>
            <img src='${pokemon.sprites.back_default}' class='w-20 h-20'>
            <div class='text-xl font-semibold mt-2'>${pokemon.name.toUpperCase()}</div>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
        </div>
    </div>`;

  // Flip animation
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  return card;
}

searchInput.addEventListener("keyup", () => {
  let searchValue = searchInput.value.toLowerCase();
  let allCards = document.querySelectorAll(".pokemon_card");

  allCards.forEach((pokemon) => {
    let pokemonName = pokemon
      .querySelector(".card_front div:nth-child(3)")
      .innerText.toLowerCase();
    pokemon.style.display = pokemonName.includes(searchValue)
      ? "block"
      : "none";
  });
});

async function fetchPokemonData(i) {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  let result = await data.json();
  return result;
}

async function fetchPokemon() {
  for (let i = 1; i <= 100; i++) {
    let pokemon = await fetchPokemonData(i);
    let pokemonCard = createPokemonCard(pokemon);
    container.appendChild(pokemonCard);
  }
}

fetchPokemon();
