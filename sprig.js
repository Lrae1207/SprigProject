/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const enemy = "e"

setLegend(
  [ player, bitmap`
................
................
......666.......
.....66F6.......
.....6FFF.......
.....6FFF.......
.......F........
......555.......
.....55555......
.....55555......
.....F555F......
......555.......
......777.......
......7.7.......
......7.7.......
......7.7.......` ],
  [ enemy, bitmap`
................
.......000......
.......101......
.......000......
0000000000000000
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......0.0......
.......0.0......
.......0.0......
.......0.0......` ]
)

setSolids([])

let level = 1
const levels = [
  map`
.`,
  map`
............e
.............
.............
.............
.............
.............
.............
.............
.............
p............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

function isTouching(obj1,obj2) {
  return (obj1.x == obj2.x && obj1.y == obj2.y)
}

function moveEnemy(enemy) {
  /* Random movement rn */
  let direction = Math.floor(Math.random() * 4)
  if (direction == 0) {
    enemy.x += 1
  } else if (direction == 1) {
    enemy.x -= 1
  } else if (direction == 2) {
    enemy.y += 1
  } else {
    enemy.y -= 1
  }
}

let hasMoved = false;
onInput("w", () => {
  getFirst(player).y -= 1
  hasMoved = true;
})

onInput("s", () => {
  getFirst(player).y += 1
  hasMoved = true;
})

onInput("a", () => {
  getFirst(player).x -= 1
  hasMoved = true;
})

onInput("d", () => {
  getFirst(player).x += 1
  hasMoved = true;
})

afterInput(() => {
  if (hasMoved) {
    moveEnemy(getFirst(enemy));
    hasMoved = false;
  }
  if (isTouching(getFirst(player),getFirst(enemy))) {
    setMap(levels[0]) // Game Over
    addText("Game Over!",{
      x: 5,
      y: 5,
      color: color`3`
    })
  }
})
