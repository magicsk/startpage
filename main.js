let links_container = [
    'Hosted',
    'Home',
    'https://home.magicsk.eu/',
    'Jellyfin',
    'https://media.magicsk.eu/',
    'Bitwarden',
    'https://bitwarden.magicsk.eu/',
    '',
    '',
    'Development',
    'API',
    'https://api.magicsk.eu/',
    'localhost',
    'http://localhost:3000/',
    'VSCode',
    'https://code.magicsk.eu/',
    '',
    '',
    'Social',
    'Instagram',
    'https://www.instagram.com/rastislavbrna/',
    'GitHub',
    'https://github.com/magicsk/',
    'Gists',
    'https://gist.github.com/magicsk/',
    'Reddit',
    'https://www.reddit.com/user/magic_sk/',
    'Projects',
    'Lost Henn',
    'https://magicsk.github.io/lost-henn/',
    'MHD Virtual Table',
    'https://github.com/magicsk/mhd_virtual_table/',
    'Max Miedinger',
    'https://maxmiedinger.magicsk.eu/',
    '',
    ''
];
const urlLines = [2, 4, 6, 8, 11, 13, 15, 17, 20, 22, 24, 26, 29, 31, 33, 35];
let maxWidthSlider = document.getElementById('maxWidthRange');

fetch('https://api.giphy.com/v1/gifs/random?api_key=1e37df9386bd4014b9b0cd305632e41c&rating=r&tag=pattern')
    .then(response => response.json())
    .then(data => {
        let url = `url(${data.data.images.original.url})`;
        document.getElementById('leftImg').style.backgroundImage = url;
        document.getElementById('fggif').href = data.data.url;
    });

fetch('https://api.giphy.com/v1/gifs/random?api_key=1e37df9386bd4014b9b0cd305632e41c&rating=r&tag=javascript')
    .then(response => response.json())
    .then(data => {
        let url = `url(${data.data.images.original.url})`;
        document.getElementsByTagName('body')[0].style.backgroundImage = url;
        document.getElementById('bggif').href = data.data.url;
    });


document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) {
        return;
    }

    var anchors = document.getElementsByTagName('a');

    for (var idx = 0; idx < anchors.length; idx += 1) {
        if (anchors[idx].hostname !== window.location.hostname || anchors[idx].pathname === window.location.pathname) {
            continue;
        }

        anchors[idx].addEventListener('click', function(event) {
            var fader = document.getElementById('fader'), anchor = event.currentTarget;
            var listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            event.preventDefault();
            fader.classList.add('fade-in');
        });
    }
});

window.addEventListener('pageshow', function(event) {
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
};

const disableLightMode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightMode', null);
};

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
    var str = '';
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var clock = new Date();
    var now = new Date();

    str += months[clock.getMonth()] + ' ' + now.getDate() + ', ' + clock.getFullYear() + ' | ' + ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
    document.getElementById('date').innerHTML = str;
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

function loadLocalStorage() {
    let empty = localStorage.getItem('isEmpty');
    if (empty != 'false') {
        localStorage.setItem('isEmpty', false);
        localStorage.setItem('title', 'magic_sk');
        localStorage.setItem('links_container', JSON.stringify(links_container));
        localStorage.setItem('max-width', 1200);
        alert('Customize everything by clicking on Options in top left corner.');
        loadLocalStorage();
    } else {
        let title = localStorage.getItem('title');
        document.getElementById('pageTitle').innerText = title;
        document.getElementById('titleTextInput').value = title;
        
        links_container = JSON.parse(localStorage.getItem('links_container'));
        let inputs = document.getElementById('editModalForms').getElementsByTagName('input');
        
        for (let i = 2; i < inputs.length; i++) {
            inputs[i].value = links_container[i - 2];
        }
        
        let linksContainers = document.getElementById('links_container').getElementsByTagName('a');
        let linksContainersHref = document.getElementById('links_container').getElementsByTagName('li');
        let j = 0, k = 0;
        
        for (let i = 0; i < links_container.length; i++) {
            if (urlLines.includes(i)) {
                linksContainersHref[j++].lastChild.href = links_container[i];
            } else {
                linksContainers[k++].innerText = links_container[i];
            }
        }

        let maxWidth = localStorage.getItem('max-width');
        maxWidth = parseInt(maxWidth);
        let maxWidthText = document.getElementById('maxWidthRangeValue');
        let mainWindow = document.getElementById('main_window');
        maxWidthSlider.value = maxWidth;
        maxWidthText.innerText = maxWidth;
        mainWindow.style.maxWidth = `${maxWidth}px`;
    }
}

loadLocalStorage();
fadeInPage();

//Options open/close
document.getElementById('editButton').addEventListener('click', () => {
    let modal = document.getElementById('editModal');
    modal.style.visibility = 'visible';
});

document.getElementById('editModal').addEventListener('click', () => {
    let modal = document.getElementById('editModal');
    modal.style.visibility = 'hidden';
});

document.getElementById('editModalBody').addEventListener('click', (e) => {
    e.stopPropagation();
});

//Options submit button
document.getElementById('editModalSubmitBtn').addEventListener('click', () => {
    let inputs = document.getElementById('editModalForms').getElementsByTagName('input');
    let title = inputs[0].value;
    localStorage.setItem('title', title);

    for (let i = 2; i < inputs.length; i++) {
        links_container[i - 2] = inputs[i].value;
    }

    localStorage.setItem('links_container', JSON.stringify(links_container));
    localStorage.setItem('max-width', maxWidthSlider.value);

    loadLocalStorage();

    let modal = document.getElementById('editModal');
    modal.style.visibility = 'hidden';
});

maxWidthSlider.oninput = () => {
    document.getElementById('maxWidthRangeValue').innerText = maxWidthSlider.value;
};
