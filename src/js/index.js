const fs = require('fs')
const cellGenerator = require('./js/cellgenerator')

// Get elements data
var elements = JSON.parse(fs.readFileSync('dist/res/elements.json', 'utf8'))

// Read lines from layout file
var lines = JSON.parse(fs.readFileSync('dist/res/layout.json', 'utf8'))

// Create table and load element data and create element
var body = document.getElementsByTagName('body')[0]
var table = document.createElement('table')
table.classList.add("table")

var tbody = document.createElement('tbody')
tbody.id = "tbody"

var periodCounter = 1;

for (var i = 0; i < lines.length; i++) {

  var groupCounter = 1;

  // Create row
  var trow = document.createElement('tr')
  // Split line(string) into array of ints
  var line = lines[i].split(',')

  for (var j = 0; j < line.length; j++) {

    // Create cell
    var tcell = newCell(parseInt(line[j]), groupCounter, periodCounter)

    trow.appendChild(tcell)

    groupCounter++
  }

  // If the row wasn't empty, increase the period counter
  if (lines[i].indexOf(1) != -1) { periodCounter++ }


  tbody.appendChild(trow)
}

table.appendChild(tbody)
body.appendChild(table)

// Event listener for escape key for element modal
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
        var modalToRemove = document.getElementById("modal")
        modalToRemove.getElementsByClassName("modal-content")[0].classList.add("animate-out")

        // Remove after animation
        setTimeout(function() {
          modalToRemove.remove()
        }, 350) // Animation is 400, so the modal will defo be removed before it finishes
    }
});

function newCell(index) {

  var tcell = document.createElement('td')

  tcell.classList.add("cell")

  if (index != 0) { // Normal cell
    var element = elements[index-1]
    element["Group"] = groupCounter;
    element["Period"] = periodCounter;
    cellGenerator.createNewElementCell(tcell, element)
  } else { // Empty space
    tcell.classList.add("empty")
  }
  return tcell;
}
