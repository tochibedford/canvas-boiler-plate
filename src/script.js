const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let gravity = 0;
let friction = 0.0;

const colors = [
  '#2185C5',
  '#7ECEFD',
  '#FFF6E5',
  '#FF7F66'
]

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

function randomIntFromRange(min, max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

function randomColor(){
  return colors[Math.floor(Math.random()*colors.length)]
}

function Circle(x, y, dx, dy, radius, color){
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color  = color
  const originalRadius = radius
  
  this.draw = function(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  
  this.update = function(){
    if(this.x + this.radius +this.dx>canvas.width||this.x - this.radius + this.dx<0){
      this.dx = -(this.dx*friction)
    }
    if(this.y + this.radius + this.dy>canvas.height || this.y - this.radius + this.dy < 0){
      this.dy = -(this.dy*friction)
      this.dx = this.dx*friction
    }else{
      this.dy += gravity
    }
    this.y += this.dy
    this.x += this.dx
    this.draw()
    
  }
}

let circle1;
function init(){
  circle1 = new Circle(canvas.width/2, canvas.height/2, 0, 0, 100, 'black');
}

function animate(){
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  circle1.update();
}

init()
animate()
window.addEventListener('click', ()=>{
  // init();
})