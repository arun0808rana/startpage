const api = `https://api.jikan.moe/v4/seasons/upcoming`;
const animeBoxTemplate = document.querySelector(".anime_box_template");
const animeGrid = document.querySelector(".grid");
const TWELVE_HOURS_IN_MILLI_SECONDS = 12 * 60 * 60 * 1000;

main();

function main() {
  let shouldFetchNewData = false;

  const fetchTime = new Date(localStorage.getItem("fetchTime"));
  const cachedData = JSON.parse(localStorage.getItem("cachedData"));
//   console.log(cachedData, "---");    

  if (fetchTime && cachedData) {
    // fetch new data if cached data has been stale for 12 hours
    if (new Date() - fetchTime > TWELVE_HOURS_IN_MILLI_SECONDS) {
      shouldFetchNewData = true;
    } else {
      shouldFetchNewData = false;
    }
  } else {
    shouldFetchNewData = true;
  }

  if (shouldFetchNewData) {
    console.log("Fetching New Data");
    getUpcomingMedia();
  } else {
    console.log("Fetching from cache");
    renderGrid(cachedData);
  }
}

async function getUpcomingMedia() {
  try {
    const response = await (await fetch(api)).json();
    renderGrid(response.data);
    localStorage.setItem("cachedData", JSON.stringify(response.data));
    localStorage.setItem("fetchTime", new Date().toISOString());
  } catch (error) {
    console.error("Error:", error);
  }
}

async function renderGrid(payload) {
  const fragment = document.createDocumentFragment();

  for (let anime of payload) {
    const animeBoxClone = animeBoxTemplate.content.cloneNode(true);
    animeBoxClone.querySelector(".preview_img").src =
      anime.images.webp.image_url;
    animeBoxClone.querySelector(".title").textContent = anime.title;
    animeBoxClone.querySelector(".airing_from").textContent =
      "Airing From: " + new Date(anime.aired.from).toDateString();
    animeBoxClone.querySelector(".broadcast_time").textContent =
      "Broadcast Time: " +
      (anime.broadcast.string ? anime.broadcast.string : "");
      animeBoxClone.querySelector(".genre").textContent = anime.genres.map(genra=>genra.name).join(', ');
    fragment.appendChild(animeBoxClone);
  }

  animeGrid.appendChild(fragment);
}
