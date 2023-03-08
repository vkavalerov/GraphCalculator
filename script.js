const sin = Math.sin;
const asin = Math.asin;
const arcsin = Math.asin;
const cos = Math.cos;
const acos = Math.acos;
const arccos = Math.acos;
const tan = Math.tan;
const tg = Math.tan;
const atan = Math.atan;
const arctan = Math.atan;
const arctg = Math.atan;
const sqrt = Math.sqrt;
const cbrt = Math.cbrt;
const ceil = Math.ceil;
const floor = Math.floor;
const cosh = Math.cosh;
const acosh = Math.acosh;
const arccosh = Math.acosh;
const sinh = Math.sinh;
const asinh = Math.asinh;
const arcsinh = Math.asinh;
const tanh = Math.tanh;
const atanh = Math.atanh;
const arctanh = Math.atanh;
const abs = Math.abs;
const exp = Math.exp;
const log = Math.log;
const sign = Math.sign;
const min = Math.min;
const max = Math.max;
const sgn = Math.sign;
/////////////////////////////////////////////////////////////////////////////////////
var ctx = c1.getContext("2d");
xmax = +xmaxid.value;
xmin = +xminid.value;
ymax = +ymaxid.value;
ymin = +yminid.value;
ymin = -ymin;
ymax = -ymax;
var X = 0;
var Y = 0;
var Yi = 0;
var Yold = 0,
  Yoldold = 0;
var H, W;
var r = 50;
var Xmax_ = 0;
var Xmin_ = 10000;
var imgD = ctx.getImageData(0, 0, c1.width, c1.height);

function drawCoordinates() {
  let cr = "rgb(150, 200, 150)";
  ctx.strokeStyle = cr;
  ctx.strokeWidth = 1;
  for (i = 1; i < Math.abs(ymin) + Math.abs(ymax); i++) {
    ctx.beginPath();
    ctx.moveTo(0, H * (Math.abs(i) / (Math.abs(ymin) + Math.abs(ymax))));
    ctx.lineTo(W, H * (Math.abs(i) / (Math.abs(ymin) + Math.abs(ymax))));
    ctx.stroke();
  }
  for (i = 1; i < Math.abs(xmin) + Math.abs(xmax); i++) {
    ctx.beginPath();
    ctx.moveTo(W * (Math.abs(i) / (Math.abs(xmin) + Math.abs(xmax))), 0);
    ctx.lineTo(W * (Math.abs(i) / (Math.abs(xmin) + Math.abs(xmax))), H);
    ctx.stroke();
  }

  cr = "rgb(0, 150,0)";
  ctx.strokeStyle = cr;
  if (ymin > 0 && ymax < 0) {
    ctx.beginPath();
    ctx.moveTo(0, H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))) - 1);
    ctx.lineTo(W, H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))) - 1);
    ctx.stroke();
    ctx.moveTo(0, H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))));
    ctx.lineTo(W, H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))));
    ctx.stroke();
    ctx.moveTo(0, 1 + H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))));
    ctx.lineTo(W, 1 + H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin))));
    ctx.stroke();
  }
  if (xmin < 0 && xmax > 0) {
    ctx.beginPath();
    ctx.moveTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))) - 1, 0);
    ctx.lineTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))) - 1, H);
    ctx.stroke();
    ctx.moveTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))), 0);
    ctx.lineTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))), H);
    ctx.stroke();
    ctx.moveTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))) + 1, 0);
    ctx.lineTo(W * (Math.abs(xmin) / (Math.abs(xmin) + Math.abs(xmax))) + 1, H);
    ctx.stroke();
  }
}

function drawGraph() {
  xmax = +xmaxid.value;
  xmin = +xminid.value;
  ymax = +ymaxid.value;
  ymin = +yminid.value;
  ymin = -ymin;
  ymax = -ymax;
  W = +Wid.value;
  H = +Hid.value;
  Xmax_ = 0;
  Xmin_ = W;
  c1.height = H;
  c1.width = W;
  drawCoordinates();
  let cr = "rgb(256,0,0)";
  ctx.fillStyle = cr;
  ctx.strokeStyle = cr;
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    ctx.fillRect(X, Y, 0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Yold);
    ctx.stroke();
    Yold = Y;
  }
  Yold = Y;
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    var h = H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin)));
    if (
      ((Yold < h && Y > h) ||
        (Yold > h && Y < h) ||
        (Y < h + 0.00005 && Y > h - 0.00005)) &&
      X != 0
    ) {
      let cr_ = "rgb(0,0,0)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, h - 3, 6, 6);
    }
    if (
      Math.abs(Yold - Y) > 10000 &&
      X != 0 &&
      ((Yold > h && Y < h) || (Yold < h && Y > h))
    ) {
      let cr_ = "rgb(256,0,0)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, h - 3, 6, 6);
    }
    Yold = Y;
    if (Y < H && Y > 0 && X > Xmax_) {
      Xmax_ = X;
    }
    if (Y < H && Y > 0 && X < Xmin_) {
      Xmin_ = X;
    }
  }
  console.log(Xmax_ + " " + Xmin_);
  ctx.font = "20px serif";
  let cr_ = "rgb(0,0,256)";
  ctx.fillStyle = cr_;
  ctx.fillText(
    "(" + Math.round(xmin) + ", " + Math.round(-ymin) + ")",
    0,
    H - 4
  );
  ctx.fillText(
    "(" + Math.round(xmax) + ", " + Math.round(-ymax) + ")",
    W - 80,
    16
  );
  X = Xmin_;
  imgD = ctx.getImageData(0, 0, c1.width, c1.height);
}

function autoDraw() {
  xmax = +xmaxid.value;
  xmin = +xminid.value;
  ymax = +ymaxid.value;
  ymin = +yminid.value;
  ymin = -ymin;
  ymax = -ymax;
  W = +Wid.value;
  H = +Hid.value;
  c1.height = H;
  c1.width = W;
  let Ymax = -999999999.0,
    Ymin = 999999999.0;
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    y = -y;
    if (y > Ymax) {
      Ymax = y;
    }
    if (y < Ymin) {
      Ymin = y;
    }
  }
  console.log(Ymax + " " + Ymin);
  if (Math.abs(Ymax) > 500 || Math.abs(Ymin) > 500) {
    Ymax = 10;
    Ymin = -10;
  }
  ymax = Math.ceil(Ymax);
  ymin = Math.floor(Ymin);
  ymin = -ymin;
  ymax = -ymax;
  W = +Wid.value;
  H = +Hid.value;
  c1.height = H;
  c1.width = W;
  drawCoordinates();
  let cr = "rgb(256,0,0)";
  ctx.fillStyle = cr;
  ctx.strokeStyle = cr;
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    ctx.fillRect(X, Y, 0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Yold);
    ctx.stroke();
    Yold = Y;
  }
  Yold = Y;
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    var h = H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin)));
    if (
      ((Yold < h && Y > h) ||
        (Yold > h && Y < h) ||
        (Y < h + 0.00005 && Y > h - 0.00005)) &&
      X != 0
    ) {
      let cr_ = "rgb(0,0,0)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, h - 3, 6, 6);
    }
    if (
      Math.abs(Yold - Y) > 10000 &&
      X != 0 &&
      ((Yold > h && Y < h) || (Yold < h && Y > h))
    ) {
      let cr_ = "rgb(256,0,0)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, h - 3, 6, 6);
    }
    if (Y < H && Y > 0 && X > Xmax_) {
      Xmax_ = X;
    }
    if (Y < H && Y > 0 && X < Xmin_) {
      Xmin_ = X;
    }
    Yold = Y;
  }
  ctx.font = "20px serif";
  let cr_ = "rgb(0,0,256)";
  ctx.fillStyle = cr_;
  ctx.fillText(
    "(" + Math.round(xmin) + ", " + Math.round(-ymin) + ")",
    0,
    H - 4
  );
  ctx.fillText(
    "(" + Math.round(xmax) + ", " + Math.round(-ymax) + ")",
    W - 80,
    16
  );
  X = Xmin_;
  imgD = ctx.getImageData(0, 0, c1.width, c1.height);
}

function d() {
  ctx.setLineDash([]);
  ctx.lineDashOffset = 0;
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.strokeStyle = "rgb(0,0,0)";
  let fund = "d(" + formula.value.replaceAll("**", "^") + ")";
  fund = Algebrite.run(fund);
  let s = fund.replaceAll("^", "**");
  console.log(s);
  for (X = 0; X < W; X += 0.1) {
    x = xmin + ((xmax - xmin) * X) / W;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    ctx.fillRect(X, Y, 0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Yold);
    ctx.stroke();
    Yold = Y;
  }
  imgD = ctx.getImageData(0, 0, c1.width, c1.height);
  X = Xmin_;
}

function d1() {
  console.log(X);
  ctx.setLineDash([5, 5]);
  ctx.lineDashOffset = 7;
  ctx.putImageData(imgD, 0, 0);
  if (X < Xmax_) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.lineWidth = 2;
    let fund = "d(" + formula.value.replaceAll("**", "^") + ")";
    fund = Algebrite.run(fund);
    x = xmin + ((xmax - xmin) * X) / W;
    s = fund.replaceAll("^", "**");
    console.log(s);
    yd = -eval(s);
    Y = (H * (yd - ymax)) / (ymin - ymax);
    s = formula.value;
    y = -eval(s);
    Yi = (H * (y - ymax)) / (ymin - ymax);
    y = -eval(fund);
    div.innerHTML =
      "A(" +
      Math.round(x * 100) / 100 +
      "," +
      Math.round(y * 100) / 100 +
      ")" +
      "            f´(" +
      Math.round(x * 100) / 100 +
      ") = " +
      Math.round(yd * 100) / 100;
    if (yd > 0) {
      ctx.strokeStyle = "rgb(256,0,0)";
      yd = Math.atan(
        yd *
          ((Math.abs(xmax) + Math.abs(xmin)) /
            (Math.abs(ymin) + Math.abs(ymax)))
      );
      ctx.fillRect(X - 3, Yi - 3, 6, 6);
      ctx.beginPath();
      ctx.moveTo(X - r * cos(yd), Yi - r * sin(yd));
      ctx.lineTo(X + r * cos(yd), Yi + r * sin(yd));
      ctx.stroke();
    } else {
      ctx.strokeStyle = "rgb(0,256,0)";
      yd = Math.atan(
        yd *
          ((Math.abs(xmax) + Math.abs(xmin)) /
            (Math.abs(ymin) + Math.abs(ymax)))
      );
      ctx.fillRect(X - 3, Yi - 3, 6, 6);
      ctx.beginPath();
      ctx.moveTo(X - r * cos(yd), Yi - r * sin(yd));
      ctx.lineTo(X + r * cos(yd), Yi + r * sin(yd));
      ctx.stroke();
    }
    X += 2;
    let timer = setTimeout(d1, 20);
  }
}

function int() {
  ctx.setLineDash([]);
  ctx.lineDashOffset = 0;
  ctx.fillStyle = "rgb(0,0,256)";
  ctx.strokeStyle = "rgb(0,0,256)";
  let fund = "integral(" + formula.value.replaceAll("**", "^") + ")";
  fund = Algebrite.run(fund);
  let s = fund.replaceAll("^", "**");
  console.log(s);
  for (X = 0; X < W; X += 0.1) {
    x = xmin + ((xmax - xmin) * X) / W;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    ctx.fillRect(X, Y, 0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Yold);
    ctx.stroke();
    Yold = Y;
  }
  imgD = ctx.getImageData(0, 0, c1.width, c1.height);
}

function exinf() {
  for (X = 0; X < W; X += 0.01) {
    x = xmin + ((xmax - xmin) * X) / W;
    let s = formula.value;
    y = -eval(s);
    Y = (H * (y - ymax)) / (ymin - ymax);
    var h = H * (Math.abs(ymax) / (Math.abs(ymax) + Math.abs(ymin)));
    if (
      Yold < Y &&
      Yold < Yoldold &&
      X > 0.02 &&
      Math.abs(Yold - Y) < 0.1 &&
      Math.abs(Yoldold - Y) < 0.1
    ) {
      let cr_ = "rgb(0,0,256)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, Yold - 3, 6, 6);
    }
    if (
      Yold > Y &&
      Yold > Yoldold &&
      X > 0.02 &&
      Math.abs(Yold - Y) < 0.1 &&
      Math.abs(Yoldold - Y) < 0.1
    ) {
      let cr_ = "rgb(0,0,256)";
      ctx.fillStyle = cr_;
      ctx.fillRect(X - 3, Yold - 3, 6, 6);
    }
    Yoldold = Yold;
    Yold = Y;
  }
}
