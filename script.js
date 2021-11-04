



const radius = 240;
const autoRotate = true;
const rotateSpeed = -60;
const imgWidth = 120; 
const imgHeight = 170;

setTimeout(init, 100);

let orbit = document.getElementById('drag-container');
let spin = document.getElementById('spin-container');
let img = spin.getElementsByTagName('img');
let element = [...img];


spin.style.width = imgWidth + "px";
spin.style.height = imgHeight + "px";


const ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (let i = 0; i < element.length; i++) {
    element[i].style.transform = "rotateY(" + (i * (360 / element.length)) + "deg) translateZ(" + radius + "px)";
    element[i].style.transition = "transform 1s";
    element[i].style.transitionDelay = delayTime || (element.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {

  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  spin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;


if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  spin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}




document.onpointerdown = function (e) {
  clearInterval(orbit.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(orbit);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    orbit.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(orbit);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(orbit.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};


