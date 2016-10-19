const fs = require('fs')

// Create map of types and classnames for colouring based off of types
var typeMap = new Map()
typeMap["Nonmetal"] = "nonmetal"
typeMap["Metalloid"] = "metalloid"
typeMap["Other metal"] = "other-metal"
typeMap["Transition metal"] = "transition-metal"
typeMap["Unknown"] = "unknown"
typeMap["Alkali metal"] = "alkali-metal"
typeMap["Alkaline earth metal"] = "alkaline-earth-metal"
typeMap["Lanthanoid"] = "lanthanoid"
typeMap["Actinoid"] = "actinoid"
typeMap["Noble gas"] = "noble-gas"
typeMap["Halogen"] = "halogen"

// Get elements data
var elements = JSON.parse(fs.readFileSync('elements.json', 'utf8'))

// Read lines from layout file
var lines = JSON.parse(fs.readFileSync('layout.json', 'utf8'))

// Create table and load element data and create element
var body = document.getElementsByTagName('body')[0]
var table = document.createElement('table')
table.className += " table"

var tbody = document.createElement('tbody')

for (var i = 0; i < lines.length; i++) {

  // Creat row
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

function newCell(index) {

  var tcell = document.createElement('td')

  tcell.className += " cell"

  if (index != 0) { // Normal cell
    var element = elements[index-1]
    tcell.appendChild(document.createTextNode(element.Symbol))
    tcell.className += " element " + typeMap[element.Type]
  } else { // Empty space
    tcell.className += " empty"
  }

  return tcell;
}
