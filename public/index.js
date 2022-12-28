let videoTrack;

const showLocalVideo = async (pic) => {
  
  videoTrack = await Twilio.Video.createLocalVideoTrack({
    width: 640,
    height: 480,
    frameRate: 24
  });
  document.getElementById('video').appendChild(videoTrack.attach());

  // replace background with an image
  let img = new Image();
  img.src = "img/" + pic + ".jpg";
  img.onload = async () => {
    let bg = new Twilio.VideoProcessors.VirtualBackgroundProcessor({
      assetsPath: '/',
      backgroundImage: img,
      maskBlurRadius: 5,
    });
    await bg.loadModel();

    videoTrack.addProcessor(bg);
  }

}

let pic = 1;
showLocalVideo(pic);

const button1 = document.getElementById('btn1');
button1.addEventListener('click', function handleClick() {
  console.log('element clicked');
  if (pic > 1) {
    pic -= 1;
  }
  else {
    pic = 6;
  }
  const list = document.getElementById("video");
  list.removeChild(list.firstElementChild);

  showLocalVideo(pic);
  console.log(pic);
});

const button2 = document.getElementById('btn2');
button2.addEventListener('click', function handleClick() {
  console.log('element clicked');
  if (pic == 6) {
    pic = 1;
  }
  else {
    pic += 1;
  }

  const list = document.getElementById("video");
  list.removeChild(list.firstElementChild);
  
  showLocalVideo(pic);
  console.log(pic);
});

const capture = document.getElementById('capture');
capture.addEventListener('click', function handleClick() {
  html2canvas(document.querySelector("#video")).then(canvas => {
    document.body.appendChild(canvas);
  });
});