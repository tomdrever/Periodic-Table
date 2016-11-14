const fs = require('fs')

const maps = require('./js/maps')

const cellGenerator = require('./js/cellgenerator')

var typeMap = maps.getTypeMap()
var blockMap = maps.getBlockMap()
var stateMap = maps.getStateMap()

// Get elements data
var elements = JSON.parse(fs.readFileSync('elements.json', 'utf8'))

// Read lines from layout file
var lines = JSON.parse(fs.readFileSync('layout.json', 'utf8'))

// Create table and load element data and create element
var body = document.getElementsByTagName('body')[0]
var table = document.createElement('table')
table.classList.add("table")

var tbody = document.createElement('tbody')
tbody.id = "tbody"

for (var i = 0; i < lines.length; i++) {

  // Create row
  var trow = document.createElement('tr')
  // Split line(string) into array of ints
  var line = lines[i].split(',')

  for (var j = 0; j < line.length; j++) {

    // Create cell
    var tcell = newCell(parseInt(line[j]))

    trow.appendChild(tcell)
  }

  tbody.appendChild(trow)
}

table.appendChild(tbody)
body.appendChild(table)

// Initial colouring
onColourByStateClicked()

// Event listener for escape key for element modal
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
        document.getElementById("modal").remove()
    }
});

function newCell(index) {

  var tcell = document.createElement('td')

  tcell.classList.add("cell")

  if (index != 0) { // Normal cell
    var element = elements[index-1]
    cellGenerator.createNewElementCell(tcell, element)
  } else { // Empty space
    tcell.classList.add("empty")
  }
  return tcell;
}

function onOptionsClicked() {
  document.getElementById("options-dropdown").classList.toggle("show");
}

function hideDropdowns() {
  var dropdowns = document.getElementsByClassName("dropdown")

  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i]
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show')
    }
  }
}

window.onclick = function(event) {
  if (!event.target.matches('#options-btn') && !event.target.matches('#options-dropdown')) {

    hideDropdowns()
  }
}

function onColourByBlockClicked() {
   toggleColourClass("block")

   document.getElementById("colour-by-block-done").classList.add("icon-visible")
   document.getElementById("colour-by-type-done").classList.remove("icon-visible")
   document.getElementById("colour-by-state-done").classList.remove("icon-visible")
 }

function onColourByTypeClicked() {
  toggleColourClass("type")

  document.getElementById("colour-by-type-done").classList.add("icon-visible")
  document.getElementById("colour-by-state-done").classList.remove("icon-visible")
  document.getElementById("colour-by-block-done").classList.remove("icon-visible")
}

function onColourByStateClicked() {
  toggleColourClass("state")

  document.getElementById("colour-by-state-done").classList.add("icon-visible")
  document.getElementById("colour-by-type-done").classList.remove("icon-visible")
  document.getElementById("colour-by-block-done").classList.remove("icon-visible")
}

function toggleColourClass(classType) {

  var tbody = document.getElementById("tbody")

  for (i = 0; i < tbody.childNodes.length; i++) {
    var row = tbody.childNodes[i]

    for (j = 0; j < row.childNodes.length; j ++) {
      var cell = row.childNodes[j]

      if (!cell.classList.contains("empty")) {
        var elementType = cell.getAttribute("element-type")
        var elementBlock = cell.getAttribute("element-block")
        var elementState = cell.getAttribute("element-state")

        var toRemoveArray, toAdd

        if (classType === "type") {
          toRemoveArray = [blockMap[elementBlock], stateMap[elementState]]
          toAdd = typeMap[elementType]
        } else if (classType === "state") {
          toRemoveArray = [blockMap[elementBlock], typeMap[elementType]]
          toAdd = stateMap[elementState]
        } else {
          toRemoveArray = [typeMap[elementType], stateMap[elementState]]
          toAdd = blockMap[elementBlock]
        }

        for (var k = 0; k < toRemoveArray.length; k++) {
          if (cell.classList.contains(toRemoveArray[k])) {
            cell.classList.remove(toRemoveArray[k])
          }
        }

        if (!cell.classList.contains(toAdd)) {
          cell.classList.add(toAdd)
        }
      }
    }
  }
}
