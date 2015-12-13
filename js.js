var tvSliderSpr;
var tvSliderTrackSpr;

var playPos;

var tvObjArray = [];
cols = 2;
for (var i = 0; i < cols; i++) {
  tvObjArray[i] = [];
}
//var tvCtrlArray = [[],[]];

var videoFiles = [
  ["videos/iwaswrong.mp4", "videos/iwaswrong.mp4"],
  ["videos/iwaswrong.mp4", "videos/iwaswrong.mp4"]
];

var secretTimecode = [
  [[1, 3], [2, 4]],
  [[3, 5], [4, 6]]
];

// function preload() {
//   tvSliderSpr = loadImage("sprites/slider.png");
//   tvSliderTrackSpr = loadImage("sprites/sliderTrack.png");
//   playButtonSpr = loadImage("sprites/playButton.png");
// }

function setup() {
  createCanvas(1000, 576);
  // create a new tv object for each screen that needs to appear, using constructor method 
  for (var i = 0; i < videoFiles.length; i++) {
    for (var j = 0; j < videoFiles[i].length; j++) {
      tvObjArray.push(
        new NewTvObj(createVideo(videoFiles[i][j]), false, 0, 0));
      tvObjArray[i][j].tv.loop();
      tvObjArray[i][j].tv.hide();
      tvObjArray[i][j].tv.pause();
    }
  }
}

//tv controller sprites made here
//makeTvControls();

// playButton.onMousePressed = function() {
//     // don't use the .play() in the draw loop
//     playFilm();
//   }
// }

function NewTvObj(tvObj, playingBool, xposVal, yposVal) {
  this.tv = tvObj;
  this.playing = playingBool;
  this.xpos = xposVal;
  this.ypos = yposVal;
}

function draw() {
  // console.log(tv2.duration());
  background(255, 100, 100);

  //tvSliderTrack.mouseActive = true
  // locate tvs on building
  for (var i = 0; i < videoFiles.length; i++) {
    for (var j = 0; j < videoFiles[i].length; j++) {

      image(tvObjArray[i][j].tv, tvObjArray[i][j].xpos + i * 320, tvObjArray[i][j].ypos + j * 200);
      //   if (tvSliderTrack.mouseIsOver) {
      // // pause is used to make sure that when mouse goes to tune, 
      // // the film stops until play is presesd
      // tvObjArray[i][j].tv.pause();
      // // when mouse hovers over the track, set the slider to follow mouse xpos
      // tvSlider.position.x = mouseX;
      // // the video time is proportional to mouse location
      // tvObjArray[i][j].tv.time((mouseX - tvObjArray[i][j].xpos) / tvSliderTrack.width * tvObjArray[i][j].tv.duration());
      // // when tuned to a specific band of time, the screen has an effect
      // tvObjArray[i][j].tv.loadPixels();
      //   }
    }

    //console.log(tvSlider.width);
    drawSprites();
  }
}
/*
function playFilm() {
  for(var i = 0; i < videoFiles.length; i++){
  if(tvObjArray[i].playing === false){
  tvObjArray[i].tv.play();
  tvObjArray[i].playing = true;
  } else {
    tvObjArray[i].tv.pause();
    tvObjArray[i].playing = false;
  }
}
}

function makeTvControls(){
  tvSliderTrack = createSprite(tvObjArray[0].xpos + 150, tvObjArray[0].ypos + tvObjArray[0].tv.height + 100);
  tvSliderTrack.scale = .55;
  tvSliderTrack.addImage(tvSliderTrackSpr);
  
  tvSlider = createSprite(tvObjArray[0].xpos +150, tvObjArray[0].ypos + tvObjArray[0].tv.height + 100);
  //console.log(tvSliderSpr.width);
  tvSlider.scale = .55;
  tvSlider.addImage(tvSliderSpr);
  
  playButton = createSprite(tvObjArray[0].xpos + 125 / 5, tvObjArray[0].ypos + tvObjArray[0].tv.height + 120);
  playButton.scale = .6;
  playButton.addImage(playButtonSpr);
  
  
}
*/