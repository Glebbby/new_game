var step_pixels = 8
var game = {}

function launch () {
  console.log('launching...')
  game = {
    images: {
      player: document.getElementById('player'),
      farmhouse: document.getElementById('farmhouse'),
      homedoor: document.getElementById('homedoor')
    }
  }
  game.images.homedoor.onclick = () => homedoor_clicked(game)
  start_moving_player(game)
}

function start_moving_player (game) {
  document.addEventListener('keydown', function (keyboard_event) {
    keydown_handler(game, keyboard_event)
  })
}

function keydown_handler (game, keyboard_event) {
  switch (keyboard_event.key) {
    case 'w':
      move_player(game, 0, -1)
      break
    case 's':
      move_player(game, 0, 1)
      break
    case 'a':
      move_player(game, -1, 0)
      break
    case 'd':
      move_player(game, 1, 0)
      break
  }
}

function move_player (game, dx, dy) {
  var farmhouse_image = game.images.farmhouse
  var player_image = game.images.player
  var x = player_image.offsetLeft
  var y = player_image.offsetTop
  x = x + dx * step_pixels
  y = y + dy * step_pixels
  if (
    overlaps(homedoor, x, y, player_image.width + x, player_image.height + y)
  ) {
    enter_farmhouse(game)
  }

  if (
    !overlaps(
      farmhouse_image,
      x,
      y,
      player_image.width + x,
      player_image.height + y
    )
  ) {
    player_image.style.left = x + 'px'
    player_image.style.top = y + 'px'
  }
}

function overlaps (image, bx, by, bx2, by2) {
  var ax = image.offsetLeft + (image.parentElement.offsetLeft || 0),
    ay = image.offsetTop + (image.parentElement.offsetTop || 0)
  //|| = or
  var ax2 = ax + image.offsetWidth,
    ay2 = ay + image.offsetHeight
  var result = bx2 > ax && bx < ax2 && by2 > ay && by < ay2
  return result
}

//&& = and
function homedoor_clicked (game) {
  game.is_homedoor_open = !game.is_homedoor_open
  game.images.homedoor.style.filter = game.is_homedoor_open
    ? 'brightness(0%)'
    : ''
}
//!=not
function enter_farmhouse (game) {
  var image = document.createElement('img')
  image.src = 'images/farmhouse-inside.png'
  game.images.farmhouse_inside = image
  document.body.appendChild(game.images.farmhouse_inside)
  exit_outside(game)
}

// ei \ vaan /

//helppo tapa saada tietoa netistä on hakea (koodikieli) (koodisana)
function exit_outside (game) {
  document.body.detachChild(game.images.farmhouse)
  document.body.detachChild(game.images.homedoor)
}

//jos samassa koodisanassa on kaksi sanaa, toinen alkaa isolla
