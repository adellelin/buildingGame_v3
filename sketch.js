var spr1;
var SCENE_W = 1500;
var SCENE_H = 800;
var frame;
var scaleNo = 4;
var zoomCount = 0;
var building;
var playTest1 = 1;
var playTest2 = 1;
var playTest3 = 1;
var matchScore = 0;

var tvSliderSpr;
var tvSliderTrackSpr;
var playButton;
var buildingGr;
var rows = 3;
var col = 5;

var playPos;
var tvEffect = false;
var direction = 0;
var clouds;
var cloud1, cloud2, cloud3, cloud4, cloud5;
var cloudGr1, cloudGr2, cloudGr3, cloudGr4, cloudGr5;
var sliderTrackXpos = 0;
var sliderXpos = 0;
var playButtonXpos = 0;
var sliderTrackYpos = 0;
var sliderYpos = 0;
var playButtonYpos = 0;

var videoOffsetX = 265;
var videoOffsetY = 240;

var cloudArr = [cloud1, cloud2, cloud3, cloud4, cloud5];
var cloudGrArr = [];
var cloudScale = 0.2;

var move1, move2, move3, move4, move5;
var cloudMove = [move1, move2, move3, move4, move5];
var sunSpr;
var playSpr;
var playInstructions;

var brickStartX = 0;
var brickStartY = 22;
var brickWidth = 40;
var brickHeight = 15;

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

var p = [
  [],
  [],
  [],
  [],
  []
];
var q = [
  [],
  [],
  [],
  [],
  []
];

var videoFiles = [
  ["videos/kittie1.mp4", "videos/TrumpB1.mp4", "videos/Trump1.mp4", "videos/Trump2.mp4", "videos/TrumpC1.mp4"],
  ["videos/noise1.mp4", "videos/TrumpC2.mp4", "videos/TrumpB2.mp4", "videos/kittie2.mp4", "videos/noise3.mp4"],
  ["videos/Trump3.mp4", "videos/kittie3.mp4", "videos/noise2.mp4", "videos/TrumpC3.mp4", "videos/TrumpB3.mp4"]
];

var timeArray = [
  [
    [1, 3],[10, 12],[8, 11],[4, 7],[12, 15]
  ],
  [
    [1, 2],[4, 7],[10, 13],[4, 6],[2, 3]
  ],
  [
    [4, 7],[3, 4],[2, 3],[7, 10],[2, 17]
  ]
];

for (var i in timeArray) {
  for (var j in timeArray[i]) {
    p[j][i] = timeArray[i][j][0];
    q[j][i] = timeArray[i][j][1];
  }
}

var puzzle = [
  ["e", "d", "a"],
  ["b", "c", "e"],
  ["a", "b", "d"],
  ["a", "e", "c"],
  ["c", "d", "b"]
];

// to add position of puzzle value to a new array
var arrCheckA = [];
var arrCheckB = [];
var arrCheckC = [];

for (i = 0; i < col; i++) {
  for (j = 0; j < rows; j++) {
    if (puzzle[i][j] === "a") {
      arrCheckA.push([i, j]);
    }
    if (puzzle[i][j] === "b") {
      arrCheckB.push([i, j]);
    }
    if (puzzle[i][j] === "c") {
      arrCheckC.push([i, j]);
    }
  }
}
//console.log(arrCheckC);

function preload() {
  //tvSliderSpr = loadImage("sprites/slider.png");
  buildingSpr = loadImage("sprites/building2.png");
  tvSliderTrackSpr = loadImage("sprites/sliderTrack.png");
  tvSliderSpr = loadImage("sprites/slider.png");
  playButtonSpr = loadImage("sprites/playButton.png");
  sunSpr = loadImage("sprites/sun.png");
  startSpr = loadImage("sprites/instr.png");
  playSpr = loadImage("sprites/playInst.png");
  insFont = loadFont("fonts/OstrichSansDashed-Medium.otf");
  cloudSprArr = [
    cloudSpr1 = loadImage("sprites/sky_0004_cloudSmall1.png"),
    cloudSpr2 = loadImage("sprites/sky_0003_cloudSmall2.png"),
    cloudSpr3 = loadImage("sprites/sky_0002_cloudSmall3.png"),
    cloudSpr4 = loadImage("sprites/sky_0001_cloudMed.png"),
    cloudSpr5 = loadImage("sprites/sky_0000_cloudMed2.png"),
    cloudSpr6 = loadImage("sprites/sky_0005_cloudLarge.png")
  ];
  glitchSound = loadSound("sounds/dash.wav");
}

function setup() {
  //camera.off();
  createCanvas(screen.width, screen.height);
  console.log(p);
  push();
  noFill();
  spr1 = createSprite(600, 300 / 2, 1, 1);
  //spr2 = createSprite(700, 180, 160, 90);
  pop();

  cloudGr1 = new Group();
  cloudGr2 = new Group();
  cloudGr3 = new Group();
  cloudGr4 = new Group();
  cloudGr5 = new Group();
  cloudGrArr = [cloudGr1, cloudGr2, cloudGr3, cloudGr4, cloudGr5];

  //mouseX = mouseX + camera.position.x - width/2;
  building = createSprite(width / 2, height / 3 - 200);
  building.addImage(buildingSpr);
  building.scale = 1.1 * 0.55;
  building.depth = 0;
  building.setCollider("rectangle", 0, 0, 3000, 5000);

  start = createSprite(width / 2, height / 3 - 400);
  start.addImage(startSpr);
  start.scale = 2;
  //start.depth = 1;
  start.life = 90;

  playInstructions = createSprite(screen.width / 2, screen.height * 2 / 6);
  playInstructions.scale = .4;
  playInstructions.addImage(playSpr);
  //playInstructions.life = 20;

  buildingGr = new Group();
  buildingGr.add(building);
  buildingGr.add(start);
  buildingGr.add(playInstructions);
  MakeTvControls();
  TvControls();

  // group1 will have 5 cloud1, 3 cloud2, 4 cloud4, 2 cloud6
  // group2 will have 3 cloud1, 5 cloud3, 3 cloud4, 1 cloud6
  // group3 will have 2 cloud1, 5 cloud2, 2 cloud3, 1 cloud5
  // group4 will have 5 cloud2, 5 cloud3, 3 cloud4, 4 cloud5
  // group5 will have 4 cloud2, 5 cloud3, 2 cloud5, 2 cloud6

  var cloudMtxL = [
    [5, 3, 0, 4, 1, 2],
    [3, 0, 5, 3, 0, 3],
    [8, 5, 2, 0, 3, 0],
    [0, 5, 5, 3, 4, 0],
    [0, 3, 5, 5, 2, 2]
  ];
  var cloudMtxR = [
    [5, 3, 10, 4, 1, 2],
    [3, 0, 5, 3, 0, 3],
    [8, 5, 2, 10, 3, 0],
    [0, 5, 5, 3, 4, 0],
    [10, 3, 5, 5, 2, 2]
  ];

  for (var x in cloudMtxL) {
    for (var y in cloudMtxL[x]) {
      for (i = 0; i < cloudMtxL[x][y]; i++) {
        cloudArr[i] = createSprite(random(-800, -300 + i * 200), random(1000) + random(-250) * i);
        //console.log(i + "cloud" + cloudArr[i].position.x);
        cloudArr[i].addImage(cloudSprArr[y]);
        cloudArr[i].setCollider("circle", 0, 0, 700);
        cloudGrArr[x].add(cloudArr[i]);
        //cloudArr[i].depth = 2;
      }
    }
  }

  for (var x in cloudMtxR) {
    for (var y in cloudMtxR[x]) {
      for (i = 0; i < cloudMtxR[x][y]; i++) {
        cloudArr[i] = createSprite(random(1300, 1600 + i * 200), random(1000) + random(-350) * i);
        //flip direction of clouds;
        cloudArr[i].mirrorX(-1);
        cloudArr[i].addImage(cloudSprArr[y]);
        cloudArr[i].setCollider("circle", 0, 0, 700);
        //cloudArr[i].scale = 0.1;
        cloudGrArr[x].add(cloudArr[i]);
        // cloudGrArr[i].collide(cloudGrArr[i]);
      }
    }
  }
}

function draw() {
  background(255, 100, 100);
  drawSprites(buildingGr);

  // camera.off();
  //building.debug = mouseIsPressed;
  cloudSpriteMotion();

  // user input condition for camera zoom in to scene
  if (zoomCount % 2 === 0) {
    camera.zoom = 0.4
  } else if (zoomCount % 2 == 1) {
    camera.zoom = 1;

    //keyBoardMoves();
    for (var i = 0; i < col; i++) {
      for (var j = 0; j < rows; j++) {
        // allows mouseOver
        tvCtrlArray[i][j].sliderTrack.mouseActive = true;
        tvCtrlArray[i][j].playButton.mouseActive = true;
      }
    }
  }

  for (var i = 0; i < col; i++) {
    for (var j = 0; j < rows; j++) {
      image(tvObjArray[i][j].tv, tvObjArray[i][j].xpos + i * videoOffsetX,
        tvObjArray[i][j].ypos + j * videoOffsetY);
      //console.log(tvObjArray[i][j].tv.width);
      //console.log(tvCtrlArray[3][1].playButton.position.x);
      //console.log(mouseX + camera.position.x - width / 2);
      if (tvCtrlArray[i][j].sliderTrack.mouseIsOver) {

        //console.log("yes");
        // pause is used to make sure that when mouse goes to tune, 
        // the film stops until play is presesd
        tvObjArray[i][j].tv.pause();
        // when mouse hovers over the track, set the slider to follow mouse xpos
        tvCtrlArray[i][j].slider.position.x = mouseX;
        // the video time = position of mouse relative to start position of sprite / duration of the film
        tvObjArray[i][j].tv.time((mouseX - (tvObjArray[i][j].xpos + i * videoOffsetX)) /
          tvCtrlArray[i][j].sliderTrack.width * tvObjArray[i][j].tv.duration());
      } else {
        // otherwise the slider sprite moves according to show film time
        // this denotes the default location of the slider when mouse moved from slider track, 
        //if outside the loop it will go back to starting position
        // this feeds back to tvObjArrat[i].tv.time();
        playPos = tvObjArray[i][j].tv.time() / tvObjArray[i][j].tv.duration();
        tvCtrlArray[i][j].slider.position.x = tvObjArray[i][j].xpos + i * (videoOffsetX) + 15 + playPos * tvCtrlArray[i][j].sliderTrack.width;
        //tvCtrlArray[i][j].slider.position.x = tvObjArray[i][j].xpos + i * (tvObjArray[i][j].tv.width)
      }
      // console.log("slider" + tvObjArray[i][j].tv.width);
      // console.log("play" + playPos);
      // play film on mouse button press
      if (tvCtrlArray[i][j].playButton.mouseIsPressed) {
        playInstructions.remove();
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
        if (tvObjArray[i][j].tv.time() > p[i][j] && tvObjArray[i][j].tv.time() < q[i][j]) {
          for (var y = 0; y < tvObjArray[i][j].tv.height; y += 8) {
            for (var x = 0; x < tvObjArray[i][j].tv.width; x += 4) {
              var offset = ((y * tvObjArray[i][j].tv.width) + x) * 4;
              var sizeVal = tvObjArray[i][j].tv.pixels[offset] / 20;
              var sizeVal2 = tvObjArray[i][j].tv.pixels[offset + 1] / 20;
              noStroke();
              fill(random(255), 0, random(0), 90);
              rect(x + tvObjArray[i][j].xpos + i * videoOffsetX - 5,
                y + tvObjArray[i][j].ypos + j * videoOffsetY - 5, sizeVal, sizeVal2);
              tvObjArray[i][j].glitchMatch = true;
            }
          }
        } else {
          tvObjArray[i][j].glitchMatch = false;
        }
      }

      //change this depending on number of matching elements
      if (tvObjArray[arrCheckA[0][0]][arrCheckA[0][1]].glitchMatch === true && tvObjArray[arrCheckA[1][0]][arrCheckA[1][1]].glitchMatch === true && tvObjArray[arrCheckA[2][0]][arrCheckA[2][1]].glitchMatch === true) {

        stroke(255, 150, 100);
        strokeWeight(1);
        fill(255, 100, 100);
        clouds1.remove();
        if (glitchSound.isPlaying() === false && playTest1 === 1) {
          glitchSound.play();
          playTest1 -= 1;
        }
        /*
        for (var k = 0; k < 14; k++) {
          ellipse(60 + k * 100, 60, 20, 20);
        }*/
        //ellipse(60 + k * 100, 60, 20, 20);
        makeBricks(0);
        matchScore += 1;
      }
      //ellipse(60 + k * 100, 60, 20, 20);

    if (puzzle[i][j] === "b") {
      //console.log(i + "and" + j);
      if (tvObjArray[i][j].tv.time() > p[i][j] && tvObjArray[i][j].tv.time() < q[i][j]) {
        for (var y = 0; y < tvObjArray[i][j].tv.height; y += 8) {
          for (var x = 0; x < tvObjArray[i][j].tv.width; x += 3) {
            var offset = ((y * tvObjArray[i][j].tv.width) + x) * 1;
            var sizeVal = tvObjArray[i][j].tv.pixels[offset] / 12;
            var sizeVal2 = tvObjArray[i][j].tv.pixels[offset + 1] / 12;
            noStroke();
            fill(255, 255, random(0), 100);
            ellipse(x + tvObjArray[i][j].xpos + i * videoOffsetX,
              y + tvObjArray[i][j].ypos + j * videoOffsetY, sizeVal, sizeVal2);
            tvObjArray[i][j].glitchMatch = true;
          }
        }
      } else {
        tvObjArray[i][j].glitchMatch = false;
      }
    }
    if (tvObjArray[arrCheckB[0][0]][arrCheckB[0][1]].glitchMatch === true && tvObjArray[arrCheckB[1][0]][arrCheckB[1][1]].glitchMatch === true && tvObjArray[arrCheckB[2][0]][arrCheckB[2][1]].glitchMatch === true) {

      clouds2.remove();
      clouds3.remove();
      fill(100, 250, 150);
      //ellipse(100, 100, 200, 200);
      if (glitchSound.isPlaying() === false && playTest2 === 1) {
        glitchSound.play();
        playTest2 -= 1;
      }
      playInstructions.remove();
      /*
      for (var k = 0; k < 14; k++) {
        noStroke();
        ellipse(70 + k * 100, 300, 20, 20);
      }*/
      makeBricks(240);
      matchScore += 1;
    }

    if (puzzle[i][j] === "c") {
      //console.log(i + "and" + j);
      if (tvObjArray[i][j].tv.time() > p[i][j] && tvObjArray[i][j].tv.time() < q[i][j]) {
        for (var y = 0; y < tvObjArray[i][j].tv.height; y += 8) {
          for (var x = 0; x < tvObjArray[i][j].tv.width; x += 4) {
            var offset = ((y * tvObjArray[i][j].tv.width) + x) * 2;
            var sizeVal = tvObjArray[i][j].tv.pixels[offset] / 8;
            var sizeVal2 = tvObjArray[i][j].tv.pixels[offset + 1] / 8;
            noStroke();
            fill(random(255), 255, random(255), 100);
            ellipse(x + tvObjArray[i][j].xpos + i * videoOffsetX,
              y + tvObjArray[i][j].ypos + j * videoOffsetY, sizeVal, sizeVal2);
            tvObjArray[i][j].glitchMatch = true;
          }
        }
      } else {
        tvObjArray[i][j].glitchMatch = false;
      }
    }
    if (tvObjArray[arrCheckC[0][0]][arrCheckC[0][1]].glitchMatch === true && tvObjArray[arrCheckC[1][0]][arrCheckC[1][1]].glitchMatch === true && tvObjArray[arrCheckC[2][0]][arrCheckC[2][1]].glitchMatch === true) {

      clouds4.remove();
      clouds5.remove();
      fill(250, 100, 255);
      //ellipse(100, 100, 200, 200);

      if (glitchSound.isPlaying() === false && playTest3 === 1) {
        glitchSound.play();
        playTest3 -= 1;
      }
      /*
      for (var k = 0; k < 14; k++) {
        noStroke();
        ellipse(70 + k * 100, 540, 20, 20);
      }*/
      makeBricks(480);
      matchScore += 1;
    }
    if (matchScore == 3) {
      sun = createSprite(-400, -200);
      sun.addImage(sunSpr);
      sun.scale = 2
      sun.depth = 0;
      buildingGr.add(sun);
    }
    drawSprites(cloudGr1);
    drawSprites(cloudGr2);
    drawSprites(cloudGr3);
    drawSprites(cloudGr4);
    drawSprites(cloudGr5);
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
      // position the tv screens
      // for larger screens
      tvObjArray[i][j] = new NewTvObj(createVideo(videoFiles[j][i]), false, screen.width * 3 / 16, screen.height * 1 / 6);
      // for smaller screens
      tvObjArray[i][j] = new NewTvObj(createVideo(videoFiles[j][i]), false, building.width * 1.2, building.height * 1.2);
      tvObjArray[i][j].tv.loop();
      tvObjArray[i][j].tv.hide();
      tvObjArray[i][j].tv.pause();

      sliderTrackXpos = tvObjArray[i][j].xpos + (i * videoOffsetX) + (tvSliderTrackSpr.width * 0.5);
      sliderXpos = tvObjArray[i][j].xpos + (i * videoOffsetX) + (tvSliderSpr.width * 0.5);
      playButtonXpos = tvObjArray[i][j].xpos + (i * videoOffsetX) + (tvSliderSpr.width * 0.5) - 40;
      sliderTrackYpos = tvObjArray[i][j].ypos + 100 + j * 240;
      sliderYpos = tvObjArray[i][j].ypos + 100 + j * 240;
      playButtonYpos = tvObjArray[i][j].ypos + 100 + j * 240;

      // create sprite vars so they can be added to the building group
      var ST, S, P;
      tvCtrlArray[i][j] = new MakeTvControls(
        ST = createSprite(sliderTrackXpos, sliderTrackYpos),
        S = createSprite(sliderXpos, sliderYpos),
        P = createSprite(playButtonXpos, playButtonYpos)
      )
      tvCtrlArray[i][j].sliderTrack.scale = 1;
      tvCtrlArray[i][j].sliderTrack.addImage(tvSliderTrackSpr);
      tvCtrlArray[i][j].slider.scale = 1;
      tvCtrlArray[i][j].slider.addImage(tvSliderSpr);
      tvCtrlArray[i][j].playButton.scale = 1;
      tvCtrlArray[i][j].playButton.addImage(playButtonSpr);
      buildingGr.add(ST);
      buildingGr.add(S);
      buildingGr.add(P);
    }
  }
}

//zoom
function keyPressed() {
  if (keyCode === 65) {
    zoomCount++;
    //camera.zoom = 1;
    //console.log(zoomCount)
  }
}

function cloudSpriteMotion() {
  for (var i = 0; i < cloudGr1.length; i++) {
    clouds1 = cloudGr1[i];
    clouds1.scale = cloudScale * 0.7;
    clouds1.attractionPoint(0.001 * i * (-1, 1), random(1800, 2100), random(300, 500));
    //clouds1.collide(building);
    //console.log(screen.height);
  }

  for (var i = 0; i < cloudGr2.length; i++) {
    clouds2 = cloudGr2[i];
    clouds2.scale = cloudScale;
    clouds2.attractionPoint(0.001 * i * (-1, 1), random(-1600, 2600), random(-300, 500));
    clouds2.collide(building);
    //console.log(screen.height);
  }
  for (var i = 0; i < cloudGr3.length; i++) {
    clouds3 = cloudGr3[i];
    clouds3.scale = cloudScale;
    clouds3.attractionPoint(0.001 * i * (-1, 1), random(-2000, 2400), random(100, 300));
    clouds3.collide(building);
    //console.log(screen.height);
  }
  for (var i = 0; i < cloudGr4.length; i++) {
    clouds4 = cloudGr4[i];
    clouds4.scale = cloudScale;
    clouds4.attractionPoint(0.001 * i * (-1, 1), random(-2000, 2400), random(400, 600));
    clouds4.collide(building);
    //console.log(screen.height);
  }
  for (var i = 0; i < cloudGr5.length; i++) {
    clouds5 = cloudGr5[i];
    clouds5.scale = cloudScale * 0.7;
    clouds5.attractionPoint(0.001 * i * (-1, 1), random(-1000, 2200), random(600, 800));
    //clouds5.collide(building);
    //console.log(screen.height);
  }
}

function makeBricks(windowHeight){
  for (var k = 0; k < 32; k += Math.floor(Math.random() * 10)) {
    fill(255, 255, random(100));
    stroke(random(6));
    rect(brickStartX + k * 45, brickStartY + windowHeight, brickWidth, brickHeight);
    rect(brickStartX + brickWidth / 2 + k * 45, brickStartY + brickHeight + 5 + windowHeight, brickWidth, brickHeight);
    rect(brickStartX + k * 45, brickStartY + (brickHeight + 5) * 2 + windowHeight, brickWidth, brickHeight);
    rect(brickStartX + brickWidth / 2 + k * 45, brickStartY + (brickHeight + 5) * 3 + windowHeight, brickWidth, brickHeight);
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
  if (spr1.position.x > width - 650) {
    spr1.position.x = width - 650
  }
  if (spr1.position.y > height - 850) {
    spr1.position.y = height - 850
  }
}