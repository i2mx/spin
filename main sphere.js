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

test = 0;

function animation() {
  cameraLocation = new Vector3(
    0,
    0,
    -100 / ((window.outerWidth - 10) / window.innerWidth)
  );
  updateSize();
  ctx.fillRect(0, 0, width, height);

  let n = 8;
  let m = 8;

  for (let i = 0; i < n; i++) {
    angle1 = (i * 2 * Math.PI) / n;
    angle2 = ((i + 1) * 2 * Math.PI) / n;

    for (let j = 0; j < m; j++) {
      angle3 = (j * 2 * Math.PI) / n;
      angle4 = ((j + 1) * 2 * Math.PI) / n;

      function sphereizer(angle1, angle2, scaler) {
        if (scaler == null) {
          return new Vector3(
            Math.cos(angle1) * Math.cos(angle2),
            Math.sin(angle1),
            Math.cos(angle1) * Math.sin(angle2)
          );
        }
        return new Vector3(
          scaler * Math.cos(angle1) * Math.cos(angle2),
          scaler * Math.sin(angle1),
          scaler * Math.cos(angle1) * Math.sin(angle2)
        );
      }

      let P1 = sphereizer(angle1, angle3, 10);
      let P2 = sphereizer(angle2, angle3, 10);
      let P3 = sphereizer(angle2, angle4, 10);
      let P4 = sphereizer(angle1, angle4, 10);

      function rotateX(P1, s) {
        return new Vector3(
          P1.x,
          P1.y * Math.sin(s * test) + P1.z * Math.cos(s * test),
          P1.y * Math.cos(s * test) - P1.z * Math.sin(s * test)
        );
      }

      function rotateY(P1,s) {
        return new Vector3(
			P1.x * Math.sin(s * test) + P1.z * Math.cos(s * test),
			P1.y,
			P1.x * Math.cos(s * test) - P1.z * Math.sin(s * test)
        );
      }

	  function rotateZ(P1,s) {
        return new Vector3(
			P1.x * Math.sin(s * test) + P1.y * Math.cos(s * test),
			P1.x * Math.cos(s * test) - P1.y * Math.sin(s * test),
			P1.z
        );
      }

      P1 = rotateX(P1,1);
      P2 = rotateX(P2,1);
      P3 = rotateX(P3,1);
      P4 = rotateX(P4,1);

      P1 = rotateY(P1,2);
      P2 = rotateY(P2,2);
      P3 = rotateY(P3,2);
      P4 = rotateY(P4,2);

	  P1 = rotateZ(P1,0.5);
      P2 = rotateZ(P2,0.5);
      P3 = rotateZ(P3,0.5);
      P4 = rotateZ(P4,0.5);




      let temp = Math.sqrt(14);
      lightAngle = new Vector3(-1 / temp, -3 / temp, -2 / temp);

      let AvX = (P1.y - P2.y) * (P2.z - P3.z) - (P1.z - P2.z) * (P2.y - P3.y);
      let AvY = (P1.z - P2.z) * (P2.x - P3.x) - (P1.x - P2.x) * (P2.z - P3.z);
      let AvZ = (P1.x - P2.x) * (P2.y - P3.y) - (P1.y - P2.y) * (P2.x - P3.x);

      multiple = Math.sign(
        AvX * (P1.x + P2.x + P3.x + P4.x) +
          AvY * (P1.y + P2.y + P3.y + P4.y) +
          AvZ * (P1.z + P2.z + P3.z + P4.z)
      );

      AvX *= multiple;
      AvY *= multiple;
      AvZ *= multiple;

      //   a2b3-a3b2, a3b1-a1b3, a1b2-a2b1

      DotP = AvX * lightAngle.x + AvY * lightAngle.y + AvZ * lightAngle.z;
      DotPNormal = DotP / new Vector3(AvX, AvY, AvZ).getMagnitude();

      //

	  RealAvX = (P1.x + P2.x + P3.x + P4.x)/4
	  RealAvY = (P1.y + P2.y + P3.y + P4.y)/4
	  RealAvZ = (P1.z + P2.z + P3.z + P4.z)/4

      if (
        AvX * (RealAvX - cameraLocation.x) +
          AvY * (RealAvY - cameraLocation.y) +
          AvZ * (RealAvZ - cameraLocation.z) <
        0
      ) {
        //   console.log(i/n*360);
        drawPolygon(
          `hsl(${i * (360 / n) + j * (360 / m)}, 50%, ${Math.round(
            (DotPNormal + 1) * 30
          )}%)`,
          P1,
          P2,
          P3,
          P4
        );
      }
    }
  }

  test += 0.01;
  test = test % (720 * Math.PI);
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
