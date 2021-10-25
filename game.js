var step_pixels = 8

function launch () {
  console.log('launching...')
  var player_image = document.getElementById('player')
  start_moving_player(player_image)
}

function start_moving_player (player_image) {
  document.addEventListener('keydown', function (keyboard_event) {
    keydown_handler(player_image, keyboard_event)
  })
}

function keydown_handler (player_image, keyboard_event) {
  switch (keyboard_event.key) {
    case 'w':
      move_player(player_image, 0, -1)
      break
    case 's':
      move_player(player_image, 0, 1)
      break
    case 'a':
      move_player(player_image, -1, 0)
      break
    case 'd':
      move_player(player_image, 1, 0)
      break
  }
}
function move_player (player_image, dx, dy) {
  var x = player_image.offsetLeft
  var y = player_image.offsetTop
  x = x + dx * step_pixels
  y = y + dy * step_pixels
  player_image.style.left = x
  player_image.style.top = y
}
