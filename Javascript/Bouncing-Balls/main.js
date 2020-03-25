// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//让画布的宽高等同于浏览器的宽高
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
//随机选取一个颜色
function randomColor() {
  return 'rgb(' +
    random(0, 255) + ', ' +
    random(0, 255) + ', ' +
    random(0, 255) + ')';
}
//小球的模型，x和y是起始的坐标，vel是速度

function Shape(x, y, exist, velX, velY) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exist = exist;
}

function Ball(x, y, exist, velX, velY, color, size) {
  Shape.call(this, x, y, exist, velX, velY);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x, y, exist, velX, velY, color, size) {
  Shape.call(this, x, y, exist, 20, 20);
  this.color = 'white';
  this.size = 10;
  this.setControls();
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}



EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}

EvilCircle.prototype.setControls = function () {
  window.onkeydown = e => {
    if (e.key === 'a') {
      this.x -= this.velX;
    } else if (e.key === 'd') {
      this.x += this.velX;
    } else if (e.key === 'w') {
      this.y -= this.velY;
    } else if (e.key === 's') {
      this.y += this.velY;
    }
  };
}

EvilCircle.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exist) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exist = false;
      }
    }
  }
}

//beginPath是开始，arc是画了一个圆弧
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}
//存储小球的数据
const balls = [];
/*将整个画布的颜色设置成半透明的黑色。然后使用  fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形。这是在下一个视图画出来时用来遮住之前的视图的。如果不这样做得话，你就会在屏幕上看到一条蛇的形状而不是小球的运动了。用来填充的颜色设置成半透明的rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的轨迹。如果你将 0.25 设置成 1 时，你就完全看不到了。试着改变其中的值查看造成的影响。 
 */
const evilBall = new EvilCircle(
  random(0, width),
  random(0, height),
  true
);
evilBall.setControls();

loop();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    const ball = new Ball(
      random(0, width),
      random(0, height),
      true,
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      random(10, 20)
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exist) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}