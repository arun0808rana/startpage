const api = "https://api.jikan.moe/v4/anime";
let lastHitTime = new Date(2023, 4, 1);
const TWELVE_HOURS_IN_MILLI_SECONDS = 12 * 60 * 60 * 1000;

const animeScheduleTemplate = document.querySelector(
  ".anime_schedule_template"
);
const renderedSchedule = document.querySelector(".rendered_schedule");

const watchlist = [
  {
    id: 52211,
    name: "Mashle: Magic and Muscles",
  },
  {
    id: 41380,
    name: "I'm standing on 1,000,000 lives",
  },
  {
    id: 46569,
    name: "Hell's paradise",
  },
  {
    id: 51706,
    name: "The Legendary Hero Is Dead!",
  },
  {
    id: 52034,
    name: "My Star",
  },
  {
    id: 35507,
    name: "Classroom of the Elite",
  },
  {
    id: 39196,
    name: "Welcome to Demon School! Iruma-kun"
  }
];

let animeData = [];

async function getAnimeSchedule() {
  lastHitTime = new Date(localStorage.getItem("lastHitTime")) || lastHitTime;

  if (new Date() - lastHitTime > TWELVE_HOURS_IN_MILLI_SECONDS) {
    console.log("Fetching new data...");
    for (let anime of watchlist) {
      try {
        const response = await fetch(`${api}/${anime.id}`);

        const result = await response.json();
        animeData.push(result);
      } catch (error) {
        console.error("Error:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log(animeData, "data");

    localStorage.setItem("lastHitTime", new Date().toISOString());
    localStorage.setItem("animeData", JSON.stringify(animeData));
  } else {
    console.log("Using cached data...");
    animeData = JSON.parse(localStorage.getItem("animeData"));
  }
}

getAnimeSchedule();

renderTable();

async function renderTable() {
  const fragment = document.createDocumentFragment();

  for (let anime of animeData) {
    console.log(anime, "anime");
    console.log(new Date(anime.data.aired.to).toDateString());
    const animeRowClone = animeScheduleTemplate.content
      .querySelector("tr")
      .cloneNode(true);
    animeRowClone.querySelector(".anime_name").textContent =
      anime.data.titles.find((title) => title.type === "English").title;
    animeRowClone.querySelector(".anime_schedules").textContent = new Date(
      anime.data.aired.to
    ).toDateString();
    fragment.appendChild(animeRowClone);
  }
  const renderedScheduleBody = renderedSchedule.querySelector("tbody");
  renderedScheduleBody.appendChild(fragment);
}
