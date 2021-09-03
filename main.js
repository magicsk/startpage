fetch('https://api.giphy.com/v1/gifs/random?api_key=1e37df9386bd4014b9b0cd305632e41c&rating=r&tag=pattern')
    .then(response => response.json())
    .then(data => {
        let url = `url(${data.data.image_url})`;
        document.getElementById('leftImg').style.backgroundImage = url;
        document.getElementById('fggif').src = data.data.url;
    });

fetch('https://api.giphy.com/v1/gifs/random?api_key=1e37df9386bd4014b9b0cd305632e41c&rating=r&tag=javascript')
    .then(response => response.json())
    .then(data => {
        let url = `url(${data.data.image_url})`;
        document.getElementsByTagName('body')[0].style.backgroundImage = url;
        document.getElementById('bggif').src = data.data.url;
    });


document.addEventListener('DOMContentLoaded', function () {
    if (!window.AnimationEvent) {
        return;
    }

    var anchors = document.getElementsByTagName('a');

    for (var idx = 0; idx < anchors.length; idx += 1) {
        if (anchors[idx].hostname !== window.location.hostname || anchors[idx].pathname === window.location.pathname) {
            continue;
        }

        anchors[idx].addEventListener('click', function (event) {
            var fader = document.getElementById('fader'), anchor = event.currentTarget;
            var listener = function () {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }

    var fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});

let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.querySelector('#light-mode-toggle');

const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightMode', null);
}

if (lightMode === 'enabled') {
    enableLightMode();
}

lightModeToggle.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    if (lightMode !== 'enabled') {
        enableLightMode();
        console.log(lightMode);
    } else {
        disableLightMode();
        console.log(lightMode);
    }
});

function doDate() {
    var str = "";
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var clock = new Date();
    var now = new Date();

    str += months[clock.getMonth()] + " " + now.getDate() + ", " + clock.getFullYear() + " | " + ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    document.getElementById("date").innerHTML = str;
}
setInterval(doDate, 1000);
doDate();

function fadeInPage() {
    if (!window.AnimationEvent) {
        return;
    }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}
fadeInPage();