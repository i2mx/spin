let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let height, width;

function updateSize() {
  height = canvas.height = window.innerHeight;
  width = canvas.width = window.innerWidth;
}

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  valueOf() {
    return 1;
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let cameraLocation = new Vector3(0, 0, -100 * window.devicePixelRatio);
// cameraDirection = new Vector3()

function drawPolygonOnScreen(color) {
  ctx.beginPath();
  ctx.fillStyle = color;

  ctx.moveTo(arguments[1][0], arguments[1][1]);

  for (i = 1; i < arguments.length; i++) {
    ctx.lineTo(arguments[i].x, arguments[i].y);
  }

  ctx.fill();
  ctx.closePath();
}

function pointToScreen(point) {
  z = point.z - cameraLocation.z;
  planez = 1;

  if (z <= 0) {
    return false;
  }

  return new Vector2(
    (width * planez * (point.x - cameraLocation.x)) / z + width / 2,
    (width * planez * (point.y - cameraLocation.y)) / z + height / 2
  );
}

function drawPolygon(color) {
  ctx.beginPath();
  ctx.fillStyle = color;

  loc = pointToScreen(arguments[1]);
  ctx.moveTo(loc.x, loc.y);

  for (i = 1; i < arguments.length; i++) {
    loc = pointToScreen(arguments[i]);
    if (loc) {
      ctx.lineTo(loc.x, loc.y);
    }
  }

  ctx.fill();
  ctx.closePath();
}

P1 = new Vector3(-10, -10, 10);
P2 = new Vector3(-10, 10, 10);
P3 = new Vector3(10, 10, 10);
P4 = new Vector3(10, -10, 10);
P5 = new Vector3(-10, -10, -10);
P6 = new Vector3(-10, 10, -10);
P7 = new Vector3(10, 10, -10);
P8 = new Vector3(10, -10, -10);

test = 0;

function animation() {
  cameraLocation = new Vector3(0, 0, -100 / (( window.outerWidth - 10 ) / window.innerWidth));
  updateSize();
  ctx.fillRect(0, 0, width, height);

  B1 = new Vector3(
    Math.cos(test) * P1.x + Math.sin(test) * P1.z,
    P1.y,
    Math.sin(test) * P1.x - Math.cos(test) * P1.z
  );

  B2 = new Vector3(
    Math.cos(test) * P2.x + Math.sin(test) * P2.z,
    P2.y,
    Math.sin(test) * P2.x - Math.cos(test) * P2.z
  );

  B3 = new Vector3(
    Math.cos(test) * P3.x + Math.sin(test) * P3.z,
    P3.y,
    Math.sin(test) * P3.x - Math.cos(test) * P3.z
  );

  B4 = new Vector3(
    Math.cos(test) * P4.x + Math.sin(test) * P4.z,
    P4.y,
    Math.sin(test) * P4.x - Math.cos(test) * P4.z
  );

  B5 = new Vector3(
    Math.cos(test) * P5.x + Math.sin(test) * P5.z,
    P5.y,
    Math.sin(test) * P5.x - Math.cos(test) * P5.z
  );

  B6 = new Vector3(
    Math.cos(test) * P6.x + Math.sin(test) * P6.z,
    P6.y,
    Math.sin(test) * P6.x - Math.cos(test) * P6.z
  );

  B7 = new Vector3(
    Math.cos(test) * P7.x + Math.sin(test) * P7.z,
    P7.y,
    Math.sin(test) * P7.x - Math.cos(test) * P7.z
  );

  B8 = new Vector3(
    Math.cos(test) * P8.x + Math.sin(test) * P8.z,
    P8.y,
    Math.sin(test) * P8.x - Math.cos(test) * P8.z
  );

  let n = 1 / 2;

  D1 = new Vector3(
    B1.x,
    Math.cos(test / n) * B1.y + Math.sin(test / n) * B1.z,
    Math.sin(test / n) * B1.y - Math.cos(test / n) * B1.z
  );
  D2 = new Vector3(
    B2.x,
    Math.cos(test / n) * B2.y + Math.sin(test / n) * B2.z,
    Math.sin(test / n) * B2.y - Math.cos(test / n) * B2.z
  );
  D3 = new Vector3(
    B3.x,
    Math.cos(test / n) * B3.y + Math.sin(test / n) * B3.z,
    Math.sin(test / n) * B3.y - Math.cos(test / n) * B3.z
  );
  D4 = new Vector3(
    B4.x,
    Math.cos(test / n) * B4.y + Math.sin(test / n) * B4.z,
    Math.sin(test / n) * B4.y - Math.cos(test / n) * B4.z
  );
  D5 = new Vector3(
    B5.x,
    Math.cos(test / n) * B5.y + Math.sin(test / n) * B5.z,
    Math.sin(test / n) * B5.y - Math.cos(test / n) * B5.z
  );
  D6 = new Vector3(
    B6.x,
    Math.cos(test / n) * B6.y + Math.sin(test / n) * B6.z,
    Math.sin(test / n) * B6.y - Math.cos(test / n) * B6.z
  );
  D7 = new Vector3(
    B7.x,
    Math.cos(test / n) * B7.y + Math.sin(test / n) * B7.z,
    Math.sin(test / n) * B7.y - Math.cos(test / n) * B7.z
  );
  D8 = new Vector3(
    B8.x,
    Math.cos(test / n) * B8.y + Math.sin(test / n) * B8.z,
    Math.sin(test / n) * B8.y - Math.cos(test / n) * B8.z
  );

  function averageVector() {
    x = 0;
    y = 0;
    z = 0;
    for (let j = 0; j < arguments[0].length; j++) {
      x += arguments[0][j].x;
      y += arguments[0][j].y;
      z += arguments[0][j].z;
      //   console.log(arguments[i]);
    }

    // console.log(x,y,z);

    return new Vector3(
      x / arguments[0].length,
      y / arguments[0].length,
      z / arguments[0].length
    );
  }

  function averageVector2() {
    x = 0;
    y = 0;
    z = 0;
    for (let j = 0; j < arguments.length; j++) {
      x += arguments[j].x;
      y += arguments[j].y;
      z += arguments[j].z;
      //   console.log(arguments[i]);
    }

    // console.log(x,y,z);

    return new Vector3(
      x / arguments.length,
      y / arguments.length,
      z / arguments.length
    );
  }

  function visible() {
    av = averageVector(arguments);
    // console.log(av);
    return av.x ** 2 + av.y ** 2 + av.z * (av.z + 100) < 0;
  }

  let temp = Math.sqrt(14);
  let lightAngle = new Vector3(-1 / temp, -3 / temp, -2 / temp);

  if (visible(D1, D2, D3, D4)) {
    av = averageVector2(D1, D2, D3, D4);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 25;

    drawPolygon(`hsl(${24 + light / 2}, 100%, ${light}%)`, D1, D2, D3, D4);
  }
  if (visible(D1, D5, D8, D4)) {
    av = averageVector2(D1, D5, D8, D4);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 25;

    drawPolygon(`hsl(${120 + light / 4}, 100%, ${light}%)`, D1, D5, D8, D4);
  }
  if (visible(D2, D6, D7, D3)) {
    av = averageVector2(D2, D6, D7, D3);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 25;

    drawPolygon(`hsl(${210 + light / 2}, 100%, ${light}%)`, D2, D6, D7, D3);
  }
  if (visible(D4, D8, D7, D3)) {
    av = averageVector2(D4, D8, D7, D3);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 50;

    drawPolygon(`hsl(0, 0%, ${light}%)`, D4, D8, D7, D3);
  }
  if (visible(D1, D5, D6, D2)) {
    av = averageVector2(D1, D5, D6, D2);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 25;

    drawPolygon(`hsl(${60 + light / 4}, 100%, ${light}%)`, D1, D5, D6, D2);
  }
  if (visible(D5, D6, D7, D8)) {
    av = averageVector2(D5, D6, D7, D8);
    light = av.x * lightAngle.x + av.y * lightAngle.y + av.z * lightAngle.z;
    light /= 10;
    light = (light + 1) * 20 + 10;

    drawPolygon(`hsl(${light / 4}, 100%, ${light}%)`, D5, D6, D7, D8);
  }

  test += 0.01;
  test = test % (60 * Math.PI);
  requestAnimationFrame(animation);
}

animation();

// [
// cos 0 sin
// 0   1  0
// sin 0 -cos
// ]
// x,0,z
// x=cosx+sinz
// z=sinx-cosx
