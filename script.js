const url = "https://rickandmortyapi.com/api/character";
const cardContainer = document.getElementById("cardContainer");
const passBtn = document.getElementById("passBtn");
const likeBtn = document.getElementById("likeBtn");
const showFavoritesBtn = document.getElementById("showFavorites");
const clearFavorites = document.getElementById("clearFavorites");

fetch(url)
  .then((res) => res.json())
  .then((list) => {
    currentCharacterList = shuffle(list.results);
    currentIndex = 0;
    showRandomCharacter();
  })
  .catch((err) => console.log(err));

let currentCharacterList = null;
let currentIndex = 0;
let listenerCount = 0;

let likeCharacters = JSON.parse(localStorage.getItem("likeCharacters")) || [];

passBtn.addEventListener("click", () => {
  showNextCharacter();
});

likeBtn.addEventListener("click", () => {
  saveLikeCharacter();
  likesCount();
});

showFavoritesBtn.addEventListener("click", () => showLikeCharacters());

clearFavorites.addEventListener("click", () => removeAllLikeCharacters());

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
  listenerCount++;

  likeCharacters.push(compare);
  updateLikes();

  showNextCharacter();
}

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
      <button class="remove-btn" data-id="${characterLike.id}">❌</button>
    `;
      favoritesContainer.appendChild(card);
    });
    removeLikeCharacter();
  } else {
    favoritesContainer.classList.add("hidden");
  }
}

function removeLikeCharacter() {
  const removeLikeCharacterBtn = document.querySelectorAll(".remove-btn");

  removeLikeCharacterBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idCharacterToRemove = btn.getAttribute("data-id");

      const characterToRemove = likeCharacters.find(
        (c) => String(c.id) === String(idCharacterToRemove)
      );

      if (characterToRemove) {
        likeCharacters = likeCharacters.filter(
          (c) => String(c.id) !== String(characterToRemove.id)
        );

        updateLikes();
        btn.closest(".favorite-card").remove();
      }
    });
  });
}

function removeAllLikeCharacters() {
  const cardFavorite = document.querySelectorAll(".favorite-card");

  localStorage.clear();

  cardFavorite.forEach((card) => {
    card.remove();
  });

  window.location.reload();
}

function likesCount() {
  const count = document.getElementById("likesCount");
  count.textContent = `Curtidos: ${listenerCount}`;
}
