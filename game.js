const sprites = new Image()
sprites.src = "./sprites.png"

const soundHit = new Audio()
soundHit.src = "./effects/hit.wav"
soundHit.volume = "0.2"
const soundJump = new Audio()
soundJump.src = "./effects/jump.wav"
soundJump.volume = "0.2"

const canvas = document.querySelector("canvas")
const contexto = canvas.getContext("2d")

function createFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 34,
    height: 25,
    x: 10,
    y: 50,
    speed: 0,
    gravity: 0.3,
    jumpSpeed: -8,
    moves: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
    ],
    activeFrame: 0,
    draw() {
      this.updateFrame()
      const { spriteX, spriteY } = global.flappyBird.moves[this.activeFrame]
      contexto.drawImage(
        sprites,
        spriteX,
        spriteY,
        global.flappyBird.width,
        global.flappyBird.height,
        global.flappyBird.x,
        global.flappyBird.y,
        global.flappyBird.width,
        global.flappyBird.height
      )
    },
    update() {
      if (!colision(global.flappyBird, global.ground)) {
        global.flappyBird.speed =
          global.flappyBird.speed + global.flappyBird.gravity
        global.flappyBird.y = global.flappyBird.y + global.flappyBird.speed
        return
      } else {
        soundHit.play()
        setTimeout(() => changeScreen(screen.initial), 500)
        return
      }
    },
    updateFrame() {
      global.frames = global.frames + 1
      const frameInterval = 10
      if (global.frames % frameInterval === 0) {
        global.flappyBird.activeFrame =
          global.flappyBird.activeFrame >= global.flappyBird.moves.length - 1
            ? 0
            : global.flappyBird.activeFrame + 1
      }
    },
    jump() {
      global.flappyBird.speed = global.flappyBird.jumpSpeed
      soundJump.play()
    },
  }
  return flappyBird
}
function createGround() {
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
        global.ground.spriteX,
        global.ground.spriteY,
        global.ground.width,
        global.ground.height,
        global.ground.x,
        global.ground.y,
        global.ground.width,
        global.ground.height
      )
      contexto.drawImage(
        sprites,
        global.ground.spriteX,
        global.ground.spriteY,
        global.ground.width,
        global.ground.height,
        global.ground.x + global.ground.width,
        global.ground.y,
        global.ground.width,
        global.ground.height
      )
    },
    update() {
      global.ground.x = infiniteScreenRoll(
        global.ground.x,
        global.ground.width,
        global.speedGround
      )
    },
  }
  return ground
}

function createBackground() {
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
        global.background.spriteX,
        global.background.spriteY,
        global.background.width,
        global.background.height,
        global.background.x,
        global.background.y,
        global.background.width,
        global.background.height
      )
      contexto.drawImage(
        sprites,
        global.background.spriteX,
        global.background.spriteY,
        global.background.width,
        global.background.height,
        global.background.x + global.background.width,
        global.background.y,
        global.background.width,
        global.background.height
      )
    },
    update() {
      // global.background.x = infiniteScreenRoll(
      //   global.background.x,
      //   global.background.width,
      //   global.speedBackground
      // )
    },
  }
  return background
}
function createGetReady() {
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
        global.getReady.spriteX,
        global.getReady.spriteY,
        global.getReady.width,
        global.getReady.height,
        global.getReady.x,
        global.getReady.y,
        global.getReady.width,
        global.getReady.height
      )
    },
  }
  return getReady
}

const global = { speedGround: 2, speedBackground: 1, frames: 0 }
global.flappyBird = createFlappyBird()
global.ground = createGround()
global.background = createBackground()
global.getReady = createGetReady()

const screen = {
  initial: {
    draw() {
      global.background.draw()
      global.ground.draw()
      global.getReady.draw()
      global.flappyBird.draw()
    },
    update() {
      global.background.update()
      global.ground.update()
    },
    click() {
      changeScreen(screen.game)
      global.flappyBird = createFlappyBird()
    },
  },
  game: {
    draw() {
      global.ground.update()
      global.background.draw()
      global.ground.draw()
      global.flappyBird.draw()
    },
    update() {
      global.flappyBird.update()
      global.background.update()
      global.ground.update()
    },
    click() {
      global.flappyBird.jump()
    },
  },
  active: {},
}

function changeScreen(newScreen) {
  screen.active = newScreen
}

function colision(spriteOne, spriteTwo) {
  if (spriteOne.y + spriteOne.height - spriteTwo.y > 0) return true
  return false
}

function infiniteScreenRoll(x, width) {
  return (x - global.speedGround) % (width / 2)
  console.log({
    move: (x - global.speedGround) % (width / 2),
  })
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
