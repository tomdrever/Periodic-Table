const maps = require('./maps')
const util = require('util')
const fs = require('fs')

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
      } else {
        headerClassName = blockMap[element.Block]
        headerTypeDetails = element.Block + "-block"
      }

      // Create modal HMTL
      var modalContainer = document.createElement("DIV")
      modalContainer.classList.add("modal")
      modalContainer.id = "modal"

      modalContainer.innerHTML += util.format(fs.readFileSync("app/res/modal_html.txt", "utf8"), headerClassName, element.Symbol, element.Name, headerTypeDetails)

      modalContainer.getElementsByClassName("modal-close")[0].onclick = function() {
        var modalToRemove = document.getElementById("modal")
        modalToRemove.remove()
      }

      document.getElementsByTagName("BODY")[0].appendChild(modalContainer)
    }
  }
}
