
async function fetchMarvelCharacters() {
  const publicKey = 'a7ff722b725cf086c834f0742da8ebda';
  const privateKey = '79c416f77d4fb77ee117a225d815d095038682e2';
  const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';

  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp+privateKey+publicKey).toString();
  console.log("hash", hash);

  const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (data.code !== 200) {
      throw new Error("Marvel API error: " + data.status);
    }

    displayCharacters(data.data.results);
  } catch (err) {
    document.getElementById("characters").innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}

function displayCharacters(characters) {
  const container = document.getElementById("characters");

  characters.forEach(char => {
    const card = document.createElement("div");
    card.classList.add("card");
    console.log("char", char)
    card.innerHTML = `
      <img src = "${char.thumbnail.path}.${char.thumbnail.extension}" alt="${char.name}">
      <h3>${char.name}</h3>
    `;
    container.appendChild(card);
  });
}

fetchMarvelCharacters();
