'use strict';

var Wallpaper = function (options) {
  this.id = options.id || 'wallpaper';
  this.canvas = document.getElementById(this.id);
  this.ctx = this.canvas.getContext('2d');
  this.xPos = 0;
  this.yPos = 0;
  this.width = options.width || 450;
  this.height = options.height || 450;

  this.ctx.clearRect(0, 0, this.width, this.height);

  var self = this;

  var randRGB = function () {
    return Math.floor(Math.random() * 255);
  };

  var randOpacity = function () {
    return Math.round(Math.random() * 0.6 * 10) / 10;
  };

  var randSize = function () {
    return Math.floor(Math.random() * 25 + 10);
  };

  var currR = randRGB();
  var currG = randRGB();

  this.randomizeShape = function () {
    this.ctx.fillStyle = 'rgba(' + currR + ', ' + currG + ', ' +
                         randRGB() + ', ' + randOpacity() + ')';

    this.ctx.fillRect(this.xPos, this.yPos, this.xPos + randSize(),
                      this.yPos + randSize());

    if (this.xPos > this.width) {
      if (this.yPos > this.height) {
        currR = randRGB();
        currG = randRGB();
      }
      this.xPos = 0;
    } else {
      this.xPos += Math.sin(Math.floor(this.height / 25)) +
                   Math.floor(this.height / 25);
    }

    if (this.yPos > this.height) {
      this.yPos = 10;
    } else {
      this.yPos += Math.sin(Math.floor(this.width / 25)) +
                   Math.floor(this.width / 25);
    }
  };

  this.generate = function () {
    setInterval(function () {
      requestAnimationFrame(self.randomizeShape.bind(self));
    }, 1);
  };
};
