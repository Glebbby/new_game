var step_pixels = 8
var game = {}

function launch () {
  console.log('launching...')
  game = {
    images: {
      player: document.getElementById('player'),
      farmhouse: document.getElementById('farmhouse')
    }
  }

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
    !overlaps(
      farmhouse_image,
      x,
      y,
      player_image.width + x,
      player_image.height + y
    )
  ) {
    player_image.style.left = x
    player_image.style.top = y
  }
}

function overlaps (image, x, y, x2, y2) {
  return (
    (image.offsetLeft < x &&
      x < image.offsetLeft + image.offsetWidth &&
      image.offsetTop < y &&
      y < image.offsetTop + image.offsetHeight) ||
    (image.offsetLeft < x2 &&
      x2 < image.offsetLeft + image.offsetWidth &&
      image.offsetTop < y2 &&
      y2 < image.offsetTop + image.offsetHeight)
  )
}
