state = "";
objects = [];

function preload() {
  alarm = loadSound("alarm.mp3");
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
  console.log("CoCoSSD Initialized!");
  document.getElementById("status").innerHTML = "Staus- Detecting Baby...";
  state = true;
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function draw() {
  image(video, 0, 0, 640, 420);
  objectDetector.detect(video, gotResults);

  for (i = 0; i < objects.length; i++) {
    if (state != "" && objects[i].label == "person") {
      document.getElementById("status").innerHTML = "Status- Detected Baby.";
      r = random(255);
      g = random(255);
      b = random(255);
      fill(r, g, b);
      noFill();
      stroke(r, g, b);
      document.getElementById("state_detect").innerHTML = "Baby found!!";
      confidence = floor(objects[i].confidence * 100);
      text(
        objects[i].label + " " + confidence + "%",
        objects[i].x + 15,
        objects[i].y + 15
      );
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      document.getElementById("state_detect").innerHTML = "Baby found!!";
      alarm.stop();
    } else {
      document.getElementById("status").innerHTML = "Status- Detection done.";
      document.getElementById("state_detect").innerHTML = "Baby not found!!";
      alarm.play();
    }
  }
}