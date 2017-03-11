const maps = require('./maps')
const util = require('util')
const fs = require('fs')
const {clipboard} = require('electron')

var blockMap = maps.getBlockMap()
var typeMap = maps.getTypeMap()
var stateMap = maps.getStateMap()

module.exports = {
  createNewElementCell: function(cell, element) {

    cell.classList.add("element")
    cell.classList.add("lightenable")
    cell.setAttribute("element-type", element.Type)
    cell.setAttribute("element-block", element.Block)
    cell.setAttribute("element-state", element.State)
    cell.setAttribute("element-electronegativity", element.Electronegativity)

    // Irritating Lanthanides and Actinides
    if (element.Period == 8) {
      element.Period = 6
      element.Group = "Lanthanide"
    }

    if (element.Period == 9) {
      element.Period = 7
      element.Group = "Actinide"
    }

    // Element-cell details layout
    var cellHeader = document.createElement("DIV")
    cellHeader.classList.add("element-cell-row")

    var atomicNumberText = document.createElement("P")
    atomicNumberText.classList.add("element-cell-text-item")
    atomicNumberText.appendChild(document.createTextNode(element.AtomicNumber))
    cellHeader.appendChild(atomicNumberText)

    var atomicMassText = document.createElement("P")
    atomicMassText.classList.add("element-cell-text-item")
    if (element.AtomicMass != null) {
      atomicMassText.appendChild(document.createTextNode(element.AtomicMass))
    }
    cellHeader.appendChild(atomicMassText)

    cell.appendChild(cellHeader)

    var cellBody = document.createElement("DIV")
    cellBody.classList.add("element-cell-row")

    var symbolText = document.createElement("H1")
    symbolText.classList.add("element-cell-text-item")
    symbolText.appendChild(document.createTextNode(element.Symbol))
    cellBody.appendChild(symbolText)

    cell.appendChild(cellBody)

    // Element info modal dialog
    cell.onclick = function() {
      var headerClassName = ""
      var headerTypeDetails = ""

      // Get type and type description
      if (cell.classList.contains(stateMap[element.State])) {
        headerClassName = stateMap[element.State]
        headerTypeDetails = element.State + " at room temperature"
      } else if (cell.classList.contains(typeMap[element.Type])) {
        headerClassName = typeMap[element.Type]
        headerTypeDetails = element.Type
      } else if (cell.classList.contains(blockMap[element.Block])) {
        headerClassName = blockMap[element.Block]
        headerTypeDetails = element.Block + "-block"
      } else if (cell.classList.contains(maps.getElectronegativityClass(element.Electronegativity))) {
        headerClassName = maps.getElectronegativityClass(element.Electronegativity)
        headerTypeDetails = element.Electronegativity != null || element.Electronegativity != undefined ? String(element.Electronegativity) : "None"
      }

      // Create modal HMTL
      var modalContainer = document.createElement("DIV")
      modalContainer.classList.add("modal")
      modalContainer.id = "modal"

      // Format HMTL with data
      modalContainer.innerHTML += util.format(fs.readFileSync("dist/res/modal_html.txt", "utf8"), headerClassName, element.Symbol, element.Name, headerTypeDetails, element.Group, element.Period, String(element.AtomicNumber), (element.AtomicMass != null) ? String(element.AtomicMass) : "Unknown",  blockMap[element.Block], element.Block, typeMap[element.Type], element.Type, stateMap[element.State], element.State, maps.getElectronegativityClass(element.Electronegativity), (element.Electronegativity != null) ? String(element.Electronegativity) : "None")

      modalContainer.getElementsByClassName("modal-close")[0].onclick = function() {
        var modalToRemove = document.getElementById("modal")
        modalToRemove.getElementsByClassName("modal-content")[0].classList.add("animate-out")

        // Remove after animation
        setTimeout(function() {
          modalToRemove.remove()
        }, 350) // Animation is 400, so the modal will defo be removed before it finishes
      }

      document.getElementsByTagName("BODY")[0].appendChild(modalContainer)

      addCopy()
    }
  }
}

function addCopy() {
  var copyButtons = document.getElementsByClassName("copy")

  for (var i = 0; i < copyButtons.length; i++) {
    // Get parent
    var button = copyButtons[i]
    var parent = button.parentElement

    // Get text (via adjacent text)
    var text = parent.getElementsByClassName("data")[0].innerHTML
    text = text.replace(": ", "")

    // Set attribute to button, so we can use it in onnlick
    button.setAttribute("data", text)

    button.onclick = function (e) {
      // Get element data and copy to clipboard
      var senderButton = e.srcElement
      var data = senderButton.getAttribute("data")
      clipboard.writeText(data)

      // Display snackbar
      var snackbar = document.getElementById("snackbar")
      snackbar.className = "show";
      snackbar.innerText = data + 'copied to clipboard';
      console.log("display")
      setTimeout(function() {
         snackbar.className = snackbar.className.replace("show", "");
         console.log("stop displaying")
       }, 3000)
    }
  }
}
