const fs = require('fs')

// Read data from file
var data = fs.readFileSync('layout.txt', 'utf8')
console.log(data)

// Convert the data into lines (each line a string)
var lines = data.split("\n")

// Remove trailing or empty lines
for (i = 0; i < lines.length; i++) {
  if (lines[i] === "") {
    lines.splice(i, 1)
  }
}

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
    var tcell = document.createElement('td')

    tcell.className += " tablecell"

    if (line[j] != 0) { // Normal cell
      tcell.appendChild(document.createTextNode(line[j]))
      tcell.className += " element"
    } else { // Empty space
      tcell.className += " empty"
    }

    trow.appendChild(tcell)
  }

  tbody.appendChild(trow)
  console.log(trow)
}

table.appendChild(tbody)
body.appendChild(table)
