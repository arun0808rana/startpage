document.onkeyup = e => {
    const searchBar = document.querySelector('.search-bar');
    searchBar.focus();
}

let lastKey = '';
document.onkeydown = e => {
    const activeEl = document.activeElement;
    if (activeEl.tagName === 'INPUT') {
        return;
    }

    if (e.key === ' ') {
        activeEl.click();
    }

    let keyformation = lastKey + e.key.toLowerCase();
    switch (keyformation) {
        case 'yt':
            window.open('https://www.youtube.com/', "_self")
            break;
        case 'sp':
            window.open('https://open.spotify.com/', "_self")
            break;
        case 'an':
            window.open('https://9anime.vc/', "_self")
            break;
        case 'me':
            window.open('https://medium.com/', "_self")
            break;
        case 'mr':
            window.open('https://mangareader.to/', "_self")
            break;
        case 'gi':
            window.open('https://github.com/', "_self")
            break;
        case 'do':
            window.open('https://dev.to/', "_self")
            break;
        case 'ha':
            window.open('https://hashnode.com/', "_self")
            break;
        case 'no':
            window.open('https://www.notion.so/', "_self")
            break;
        case 'dr':
            window.open('https://dribbble.com/', "_self")
            break;
        case 'be':
            window.open('https://www.behance.net/', "_self")
            break;
        case 'ti':
            window.open('https://tablericons.com/', "_self")
            break;
        case 'fo':
            window.open('https://fontawesome.com/icons', "_self")
            break;
        case 'gi':
            window.open('https://fonts.google.com/', "_self")
            break;
        case 'li':
            window.open('https://www.linkedin.com/', "_self")
            break;
        case 'tw':
            window.open('https://twitter.com/home', "_self")
            break;
        case 'we':
            window.open('https://web.whatsapp.com/', "_self")
            break;
        case '0':
            window.open('https://www.reddit.com/r/startpages/', "_self")
            break;
        case '1':
            window.open('https://www.reddit.com/r/unixporn/', "_self")
            break;
        case '2':
            window.open('https://www.reddit.com/r/meme/', "_self")
            break;
        case '3':
            window.open('https://www.reddit.com/r/WhatsWrongWithYourDog/', "_self")
            break;
        case '4':
            window.open('https://www.reddit.com/r/UnexpectedlyWholesome/', "_self")
            break;
        case '5':
            window.open('https://www.reddit.com/r/goodanimemes/', "_self")
            break;
        case '6':
            window.open('https://www.reddit.com/r/dankmemes/', "_self")
            break;
        case '7':
            window.open('https://www.reddit.com/r/animenews/', "_self")
            break;

        default:
            break;
    }
    lastKey = e.key.toLowerCase();
}

function handleWeatherForecast() {
    const days = Array.from(document.querySelectorAll('.day'));
    const DAYS_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // geting todays day in form of number from 0 to 7
    let dayIndex = new Date().getDay();

    days.forEach(day => {
        day.innerText = DAYS_NAME[dayIndex % days.length];
        ++dayIndex;
    })

}

handleWeatherForecast();

// 791d1fbf813e3930e1d592e30bafcab7
// api.openweathermap.org/data/2.5/forecast/daily?lat=28.41&lon=77.04&appid=791d1fbf813e3930e1d592e30bafcab7