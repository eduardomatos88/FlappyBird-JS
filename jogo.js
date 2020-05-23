console.log("Flappy Bird")

const sprites = new Image()
sprites.src = "./sprites.png"

const canvas = document.querySelector("canvas")
const contexto = canvas.getContext("2d")

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 34,
  height: 25,
  x: 10,
  y: 50,
  speed: 0,
  gravity: 0.75,
  draw() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,
      flappyBird.spriteY,
      flappyBird.width,
      flappyBird.height,
      flappyBird.x,
      flappyBird.y,
      flappyBird.width,
      flappyBird.height
    )
  },
  update() {
    flappyBird.speed = flappyBird.speed + flappyBird.gravity
    flappyBird.y = flappyBird.y + flappyBird.speed
  },
}

const ground = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,
  draw() {
    contexto.drawImage(
      sprites,
      ground.spriteX,
      ground.spriteY,
      ground.width,
      ground.height,
      ground.x,
      ground.y,
      ground.width,
      ground.height
    )
    contexto.drawImage(
      sprites,
      ground.spriteX,
      ground.spriteY,
      ground.width,
      ground.height,
      ground.x + ground.width,
      ground.y,
      ground.width,
      ground.height
    )
  },
}

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 276,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  draw() {
    contexto.fillStyle = "#70c5ce"
    contexto.fillRect(0, 0, canvas.width, canvas.height)
    contexto.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.x,
      background.y,
      background.width,
      background.height
    )
    contexto.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.x + background.width,
      background.y,
      background.width,
      background.height
    )
  },
}

const getReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  draw() {
    contexto.drawImage(
      sprites,
      getReady.spriteX,
      getReady.spriteY,
      getReady.width,
      getReady.height,
      getReady.x,
      getReady.y,
      getReady.width,
      getReady.height
    )
  },
}

const screen = {
  initial: {
    draw() {
      background.draw()
      ground.draw()
      getReady.draw()
      flappyBird.draw()
    },
    update() {},
    click() {
      changeScreen(screen.game)
    },
  },
  game: {
    draw() {
      background.draw()
      ground.draw()
      flappyBird.draw()
    },
    update() {
      flappyBird.update()
    },
    click() {},
  },
  active: {},
}

function changeScreen(newScreen) {
  screen.active = newScreen
}

function loop() {
  screen.active.update()
  screen.active.draw()
  requestAnimationFrame(loop)
}

window.addEventListener("click", () => {
  if (screen.active.click) screen.active.click()
})

changeScreen(screen.initial)
loop()
