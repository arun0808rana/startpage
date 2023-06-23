let lastKey = "";

const searchBar = document.querySelector(".search-bar");
const suggestions = document.querySelector(".suggestions");

let hintCounter = 0;

// typing effect for search bar's placeholder
(async () => {
  const hints = [
    "Press / to search",
    ":git awesome startpage",
    ":yt primeagen",
    ":duck top 10 ott platforms",
  ];

  while (true) {
    searchBar.placeholder = "";
    const index = ++hintCounter % hints.length;
    let letterCounter = 0;
    // add typing effect for placeholder
    while (letterCounter < hints[index].length) {
      searchBar.placeholder =
        searchBar.placeholder + hints[index][letterCounter];
      ++letterCounter;
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    // wait before erasing placeholder
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // erase placeholder to make way for the new hint
    while (letterCounter >= 0) {
      searchBar.placeholder = searchBar.placeholder.slice(0, letterCounter);
      --letterCounter;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
})();

searchBar.onkeyup = (event) => {
  if (searchBar.value === "") {
    suggestions.style.display = "none";
    searchBar.classList.add("border-bottom");
    return;
  }

  if (searchBar.value[0] == ":") {
    suggestions.style.display = "block";
    searchBar.classList.remove("border-bottom");
  }

  if (event.key === "ArrowDown") {
    const hotkeys = [":git", ":yt", ":ytp", ":duck", ":font"];
    const activeSuggestionItem = suggestions.querySelector(
      ".suggestion_item.active"
    );
    const activeSuggestionItemDataID =
      activeSuggestionItem.getAttribute("data-id");
    const activeHotkeyIndex = hotkeys.findIndex(
      (hotkey) => hotkey === activeSuggestionItemDataID
    );
    const nextActiveHotkeyIndex = activeHotkeyIndex + 1;
    searchBar.value = hotkeys[nextActiveHotkeyIndex % hotkeys.length];

    activeSuggestionItem.classList.remove("active");
    const newActiveSuggestionItem =
      suggestions.children[nextActiveHotkeyIndex % hotkeys.length];
    newActiveSuggestionItem.classList.add("active");
  }

  if (event.key === "ArrowUp") {
    const hotkeys = [":git", ":yt", ":ytp", ":duck", ":font"];

    const activeSuggestionItem = suggestions.querySelector(
      ".suggestion_item.active"
    );
    const activeSuggestionItemDataID =
      activeSuggestionItem.getAttribute("data-id");
    const activeHotkeyIndex = hotkeys.findIndex(
      (hotkey) => hotkey === activeSuggestionItemDataID
    );
    let nextActiveHotkeyIndex = activeHotkeyIndex - 1;
    if (nextActiveHotkeyIndex < 0) {
      nextActiveHotkeyIndex = hotkeys.length - 1;
    }
    searchBar.value = hotkeys[nextActiveHotkeyIndex % hotkeys.length];

    activeSuggestionItem.classList.remove("active");
    const newActiveSuggestionItem =
      suggestions.children[nextActiveHotkeyIndex % hotkeys.length];
    newActiveSuggestionItem.classList.add("active");
  }
};

document.onkeydown = (e) => {
  const activeEl = document.activeElement;
  if (activeEl.tagName === "INPUT") {
    return;
  }

  if (e.key === " ") {
    activeEl.click();
  }

  if (e.key === "/") {
    searchBar.focus();
    e.preventDefault();
    return;
  }

  if (e.key === ":") {
    searchBar.focus();
    return;
  }

  let keyformation = lastKey + e.key.toLowerCase();

  switch (keyformation) {
    case "yt":
      window.open("https://www.youtube.com/", "_self");
      break;
    case "sp":
      window.open("https://open.spotify.com/", "_self");
      break;
    case "an":
      window.open("https://zoro.to/home", "_self");
      break;
    case "me":
      window.open("https://medium.com/", "_self");
      break;
    case "mr":
      window.open("https://mangareader.to/home", "_self");
      break;
    case "ua":
      window.open("/anime_news/anime_news.html", "_self");
      break;
    case "gi":
      window.open("https://github.com/", "_self");
      break;
    case "dt":
      window.open("https://dev.to/", "_self");
      break;
    case "hn":
      window.open("https://hashnode.com/", "_self");
      break;
    case "no":
      window.open("https://www.notion.so/", "_self");
      break;
    case "dr":
      window.open("https://dribbble.com/", "_self");
      break;
    case "be":
      window.open("https://www.behance.net/", "_self");
      break;
    case "ti":
      window.open("https://tablericons.com/", "_self");
      break;
    case "fo":
      window.open("https://fontawesome.com/icons", "_self");
      break;
    case "gf":
      window.open("https://fonts.google.com/", "_self");
      break;
    case "fi":
      window.open("https://figma.com/", "_self");
      break;
    case "li":
      window.open("https://www.linkedin.com/", "_self");
      break;
    case "tw":
      window.open("https://twitter.com/home", "_self");
      break;
    case "we":
      window.open("https://web.whatsapp.com/", "_self");
      break;
    case "0":
      window.open("https://www.reddit.com/r/startpages/", "_self");
      break;
    case "1":
      window.open("https://www.reddit.com/r/unixporn/", "_self");
      break;
    case "2":
      window.open("https://www.reddit.com/r/meme/", "_self");
      break;
    case "3":
      window.open("https://www.reddit.com/r/WhatsWrongWithYourDog/", "_self");
      break;
    case "4":
      window.open("https://www.reddit.com/r/UnexpectedlyWholesome/", "_self");
      break;
    case "5":
      window.open("https://www.reddit.com/r/goodanimemes/", "_self");
      break;
    case "6":
      window.open("https://www.reddit.com/r/dankmemes/", "_self");
      break;
    case "7":
      window.open("https://www.reddit.com/r/animenews/", "_self");
      break;

    default:
      break;
  }
  lastKey = e.key.toLowerCase();
};

function handleSumbit(event) {
  event.preventDefault();
  const query = searchBar.value;
  const [prefix] = query.split(" ");

  if (prefix[0] === ":") {
    let searchQuery = query.split(" ").slice(1).join(" ");
    searchQuery = encodeURIComponent(searchQuery);
    switch (prefix) {
      case ":git":
        window.open(
          `https://github.com/search?q=${searchQuery}&type=repositories&s=stars&o=desc`,
          "_self"
        );
        break;
      case ":yt":
        window.open(
          `https://www.youtube.com/results?search_query=${searchQuery}`,
          "_self"
        );
        break;
      case ":ytp":
        window.open(
          `https://www.youtube.com/results?search_query=${searchQuery}&sp=EgIQAw%253D%253D`,
          "_self"
        );
        break;
      case ":duck":
        window.open(`https://duckduckgo.com/?q=${searchQuery}`, "_self");
        break;
      case ":font":
        window.open(`https://fonts.google.com/?query=${searchQuery}`, "_self");
        break;

      default:
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_self");
        break;
    }
  } else {
    let searchQuery = encodeURIComponent(query);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_self");
  }
}
