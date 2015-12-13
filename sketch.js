var spr1;
var SCENE_W = 1600;
var SCENE_H = 2000;
var frame;
var scaleNo = 4;
var zoomCount = 0;
var building;

var tvSliderSpr;
var tvSliderTrackSpr;
var playButton;
var m = 0;
var rows = 2;
var col = 5;

var playPos;
var tvEffect = false;

var tvObjArray = [
  [],
  [],
  [],
  [],
  []
];
var tvCtrlArray = [
  [],
  [],
  [],
  [],
  []
];

var videoFiles = [
  ["videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4"],
  ["videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4", "videos/iwaswrong.mp4"]
];

var timeArray = [
  [
    [1, 3],
    [4, 6],
    [2, 3],
    [4, 6],
    [2, 3]
  ],
  [
    [1, 2],
    [3, 4],
    [2, 3],
    [4, 6],
    [2, 3],
  ]
];

for (var i in timeArray) {
  for (var j in timeArray) {
    var p = timeArray[i][j][0];
    var q = timeArray[i][j][1];
  }
}

var puzzle = [
  ["c", "b"],
  ["b", "c"],
  ["a", "b"],
  ["a", "c"],
  ["c", "b"]
];

// to add position of puzzle value to a new array
var arrCheckA = [];

for (i = 0; i < col; i++) {
  for (j = 0; j < rows; j++) {
    if (puzzle[i][j] === "a") {
      arrCheckA.push([i, j]);
    }
  }
}
console.log(arrCheckA);

function preload() {
  //tvSliderSpr = loadImage("sprites/slider.png");
  buildingSpr = loadImage("img/building.png");
  tvSliderTrackSpr = loadImage("sprites/sliderTrack.png");
  tvSliderSpr = loadImage("sprites/slider.png");
  playButtonSpr = loadImage("sprites/playButton.png");
}

function setup() {
  //camera.off();
  createCanvas(1024, 576);
  push();
  noFill();
  spr1 = createSprite(600, 300 / 2, 1, 1);
  pop();
  MakeTvControls();
  TvControls();
  console.log("mouseX " + mouseX);
  //mouseX = mouseX + camera.position.x - width/2;
  console.log("mouseX " + mouseX);
  //mouseY = mouseY + camera.position.y - height/2;
}

function draw() {
  background(255, 100, 100);
  // camera.off();
  building = createSprite(300, height / 2);
  building.addImage(buildingSpr);
  building.scale = 7;
  building.depth = 0;
  drawSprites();

  // user input condition for camera zoom in to scene
  if (zoomCount % 7 === 0 || zoomCount % 7 == 6) {
    camera.zoom = 0.15
  } else if (zoomCount % 7 == 1 || zoomCount % 7 == 5) {
    camera.zoom = .4;
    keyBoardMoves();

  } else if (zoomCount % 7 == 2 || zoomCount % 7 == 4) {
    //camera.off();
    camera.zoom = 1;
    for (var i = 0; i < col; i++) {
      for (var j = 0; j < rows; j++) {
        tvCtrlArray[i][j].sliderTrack.mouseActive = true;
        tvCtrlArray[i][j].playButton.mouseActive = true;
        if (tvCtrlArray[i][j].sliderTrack.mouseIsOver) {
          console.log("yes");
        }
      }
    }
    //var mouseZoom = mouseX + camera.position.x - width/2;
  } else if (zoomCount % 7 == 3) {
    camera.zoom = 2;
  }

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < rows; j++) {
      image(tvObjArray[i][j].tv, tvObjArray[i][j].xpos + i * 550,
        tvObjArray[i][j].ypos + j * 500);
      //console.log(tvObjArray[i][j].tv.width);
      console.log(tvCtrlArray[3][1].playButton.position.x);
      console.log(mouseX + camera.position.x - width/2);
      if (tvCtrlArray[i][j].sliderTrack.mouseIsOver) {
        console.log("yes");
        // pause is used to make sure that when mouse goes to tune, 
        // the film stops until play is presesd
        tvObjArray[i][j].tv.pause();
        // when mouse hovers over the track, set the slider to follow mouse xpos
        tvCtrlArray[i][j].slider.position.x = mouseX;
        // the video time = position of mouse relative to start position of sprite / duration of the film
        tvObjArray[i][j].tv.time((mouseX - (tvObjArray[i][j].xpos + i * (tvObjArray[i][j].tv.width + 250))) /
          tvCtrlArray[i][j].sliderTrack.width * tvObjArray[i][j].tv.duration());
      } else {
        // otherwise the slider sprite moves according to show film time
        // this denotes the default location of the slider when mouse moved from slider track, 
        //if outside the loop it will go back to starting position
        // this feeds back to tvObjArrat[i].tv.time();
        playPos = tvObjArray[i][j].tv.time() / tvObjArray[i][j].tv.duration();
        tvCtrlArray[i][j].slider.position.x = tvObjArray[i][j].xpos + 560 * i + playPos * tvCtrlArray[i][j].sliderTrack.width;
      }
      // play film on mouse button press
      if (tvCtrlArray[i][j].playButton.mouseIsPressed) {
        //console.log("yes");
        if (tvObjArray[i][j].playing === false) {
          tvObjArray[i][j].tv.play();
          tvObjArray[i][j].playing = true;
        } else {
          tvObjArray[i][j].tv.pause();
          tvObjArray[i][j].playing = false;
        }
      }
      // adding the tv glitch effects
      // when tuned to a specific band of time, the screen has an effect
      tvObjArray[i][j].tv.loadPixels();
      if (puzzle[i][j] === "a") {
        //console.log(i + "and" + j);
        if (tvObjArray[i][j].tv.time() > p && tvObjArray[i][j].tv.time() < q) {
          for (var y = 0; y < tvObjArray[i][j].tv.height; y += 8) {
            for (var x = 0; x < tvObjArray[i][j].tv.width; x += 4) {
              var offset = ((y * tvObjArray[i][j].tv.width) + x) * 4;
              var sizeVal = tvObjArray[i][j].tv.pixels[offset] / 24;
              var sizeVal2 = tvObjArray[i][j].tv.pixels[offset + 1] / 24;
              noStroke();
              fill(random(255), 0, random(100), 90);
              rect(x + tvObjArray[i][j].xpos + i * 550,
                y + tvObjArray[i][j].ypos + j * 500, sizeVal, sizeVal2);
              tvObjArray[i][j].glitchMatch = true;
            }
          }
        } else {
          tvObjArray[i][j].glitchMatch = false;
        }
      }
      //change this depending on number of matching elements
      if (tvObjArray[arrCheckA[0][0]][arrCheckA[0][1]].glitchMatch === true && tvObjArray[arrCheckA[1][0]][arrCheckA[1][1]].glitchMatch === true
        //&& tvObjArray[arrCheckA[2][0]][arrCheckA[2][1]].glitchMatch === true
      ) {

        stroke(255, 150, 100);
        strokeWeight(10);
        // var backGround2 = createSprite(50, 200, 800, 350);
        // backGround2.depth = 0;
        line(50 + m, 50, 300 + m, 50);
        line(850, 50 + m, 850, 300 + m);
        line(850 - m, 700, 600 - m, 700);
        line(50, 700 - m, 50, 350 - m);
        m += 5;
      }
    }
  }
}

var NewTvObj = function(tvObj, playingBool, xposVal, yposVal, timeArray, matchBool) {
  this.tv = tvObj;
  this.playing = playingBool;
  this.xpos = xposVal;
  this.ypos = yposVal;
  this.secretTimecode = timeArray;
  this.glitchMatch = matchBool;
}

var MakeTvControls = function(sliderTrack, slider, playButton) {
  this.sliderTrack = sliderTrack;
  this.slider = slider;
  this.playButton = playButton;
}

function TvControls() {
  //create a new tv object for each screen that needs to appear
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < rows; j++) {
      tvObjArray[i][j] = new NewTvObj(createVideo(videoFiles[j][i]), false, -1000, 200);
      tvObjArray[i][j].tv.loop();
      tvObjArray[i][j].tv.hide();
      tvObjArray[i][j].tv.pause();

      tvCtrlArray[i][j] = new MakeTvControls(
        createSprite(tvObjArray[i][j].xpos + (i * (tvObjArray[i][j].tv.width + 250)) + (tvSliderTrackSpr.width * 0.5) / 2,
          tvObjArray[i][j].ypos + tvObjArray[i][j].tv.height * 1.7 + j * 500),
        createSprite(tvObjArray[i][j].xpos + (i * (tvObjArray[i][j].tv.width + 250)) + (tvSliderSpr.width * 0.5) / 2,
          tvObjArray[i][j].ypos + tvObjArray[i][j].tv.height * 1.7 + j * 500),
        createSprite(tvObjArray[i][j].xpos + (i * (tvObjArray[i][j].tv.width + 250)) + (tvSliderSpr.width * 0.5) / 2,
          tvObjArray[i][j].ypos + tvObjArray[i][j].tv.height * 1.85 + j * 500)
        // createSprite(-1000 * i, 900 * j),createSprite(-1000 * i, 800 * j), createSprite(-1000 * i, 820 * j)
      )

      tvCtrlArray[i][j].sliderTrack.scale = 0.5;
      tvCtrlArray[i][j].sliderTrack.addImage(tvSliderTrackSpr);
      // allows mouseOver 

      tvCtrlArray[i][j].slider.scale = 0.45;
      tvCtrlArray[i][j].slider.addImage(tvSliderSpr);

      tvCtrlArray[i][j].playButton.scale = 0.8;
      tvCtrlArray[i][j].playButton.addImage(playButtonSpr);
    }
  }

}

function keyBoardMoves() {

  if (keyIsDown(LEFT_ARROW)) {
    spr1.position.x -= 10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spr1.position.x += 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spr1.position.y += 10;
  }
  if (keyIsDown(UP_ARROW)) {
    spr1.position.y -= 10;
  }

  //set the camera position to the sprite position
  camera.position.x = spr1.position.x;
  camera.position.y = spr1.position.y;
  // console.log(mouseX);

  // setting boundaries
  if (spr1.position.x < 350) {
    spr1.position.x = 350
  }
  if (spr1.position.y < 900) {
    spr1.position.y = 900
  }
  if (spr1.position.x > SCENE_W - 650) {
    spr1.position.x = SCENE_W - 650
  }
  if (spr1.position.y > SCENE_H - 850) {
    spr1.position.y = SCENE_H - 850
  }
}

function keyPressed() {
  if (keyCode === 65) {
    zoomCount++;
    //camera.zoom = 1;
    console.log(zoomCount)
  }
}