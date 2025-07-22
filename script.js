const url = "https://rickandmortyapi.com/api/character";
const cardContainer = document.getElementById("cardContainer");

let currentCharacterList = null;
let currentIndex = 0;

let likeCharacters = JSON.parse(localStorage.getItem("likeCharacters")) || [];

function updateLikes() {
  localStorage.setItem("likeCharacters", JSON.stringify(likeCharacters));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch(url)
  .then((res) => res.json())
  .then((list) => {
    currentCharacterList = shuffle(list.results);
    currentIndex = 0;
    showRandomCharacter();
  })
  .catch((err) => console.log(err));

function showNextCharacter() {
  currentIndex++;
  if (currentIndex >= currentCharacterList.length) {
    currentIndex = 0;
  }
  showRandomCharacter();
}

function showRandomCharacter() {
  const character = currentCharacterList[currentIndex];

  cardContainer.innerHTML = ` 
        <div class="idToSave" id="${character.id}">
            <img src="${character.image}" alt="${character.name}"/>
            <h2>${character.name}</h2>
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Espécie:</strong> ${character.species}</p>
        </div>
    `;
}

const passBtn = document.getElementById("passBtn");
passBtn.addEventListener("click", () => {
  showNextCharacter();
});

const likeBtn = document.getElementById("likeBtn");
likeBtn.addEventListener("click", () => {
  saveLikeCharacter();
});

function saveLikeCharacter() {
  if (!currentCharacterList) {
    console.error("Lista de personagens não disponível.");
    return;
  }

  const characters = currentCharacterList;
  const idToSave = document.querySelector(".idToSave").id;
  const compare = characters.find((c) => String(c.id) === String(idToSave));

  const alreadyLiked = likeCharacters.some(
    (c) => String(c.id) === String(compare.id)
  );

  if (alreadyLiked) {
    alert("Você já deu like nesse personagem!");
    showNextCharacter();
    return;
  }

  likeCharacters.push(compare);
  updateLikes();

  showNextCharacter();
}

const showFavoritesBtn = document.getElementById("showFavorites");
showFavoritesBtn.addEventListener("click", () => showLikeCharacters());

function showLikeCharacters() {
  const favoritesContainer = document.getElementById("favoritesContainer");

  if (favoritesContainer.classList.contains("hidden")) {
    favoritesContainer.classList.remove("hidden");
    favoritesContainer.innerHTML = "";

    likeCharacters.forEach((characterLike) => {
      const card = document.createElement("div");
      card.classList.add("favorite-card");
      card.innerHTML = `
      <img src="${characterLike.image}" alt="${characterLike.name}" />
      <div class="info">
        <h3>${characterLike.name}</h3>
        <p><strong>Status:</strong> ${characterLike.status}</p>
        <p><strong>Espécie:</strong> ${characterLike.species}</p>
      </div>
    `;
      favoritesContainer.appendChild(card);
    });
  } else {
    favoritesContainer.classList.add("hidden");
  }
}
