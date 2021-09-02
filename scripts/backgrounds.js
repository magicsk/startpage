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
      document.getElementById('gggif').src = data.data.url;
  });