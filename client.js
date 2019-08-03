const { ipcRenderer } = require('electron')
const datas = require('./datas')
function setWindowHeight(pixels) {
  ipcRenderer.send('height', pixels)
}

const input = document.getElementById('input')
input.addEventListener('keyup', e => {
  // let height = 60 + Math.floor(Math.random() * 100)
  // console.log('hi', height)
  search()
  if (!e.key.includes('Arrow')) {
    moveFocus(0)
  }
})

document.addEventListener('keydown', e => {
  if (e.key == 'ArrowUp') {
    moveFocus(focus - 1)
    e.preventDefault()
  } else if (e.key == 'ArrowDown') {
    moveFocus(focus + 1)
    e.preventDefault()
  }
  if (e.key == 'Enter') {
    act(rowIds[focus])
    moveFocus(0)
    input.value = ''
  }
})

// setInterval(input.focus, 100);

let focus = 0
function moveFocus(f) {
  rows[focus].classList.remove('selected')
  focus = f
  if (focus < 0) focus = renderedRows - 1
  if (focus >= renderedRows) focus = 0
  rows[focus].classList.add('selected')
}

const rows = document.getElementsByClassName('row')
let rowIds = []
let renderedRows = 9
function search() {
  let query = input.value;
  let rowSlot = 0
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].name.includes(query)) {
      rows[rowSlot].innerHTML = `<span>${datas[i].name}</span>`
      rowIds[rowSlot] = i
      rowSlot++
    }
    if (rowSlot > 8) {
      break
    }
  }
  renderedRows = rowSlot
  setWindowHeight(60 + 30 * (rowSlot))
}
search()

