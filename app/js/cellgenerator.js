module.exports = {
  createNewElementCell: function(cell, element) {

    cell.classList.add("element")
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
      // Add basic modal HMTL
      var modal = document.createElement("DIV")
      modal.classList.add("modal")
      modal.id = "modal"

      var modalContent = document.createElement("DIV")
      modalContent.classList.add("modal-content")

      var modalContentText = document.createElement("P")
      modalContentText.appendChild(document.createTextNode("Element: " + element.Name))

      var modalContentClose = document.createElement("SPAN")
      modalContentClose.classList.add("modal-close")
      modalContentClose.appendChild(document.createTextNode("x"))
      modalContentClose.onclick = function() {
        var modalToRemove = document.getElementById("modal")
        modalToRemove.remove()
      }

      // Compile modal DOM elements and add to document
      modalContent.appendChild(modalContentClose)
      modalContent.appendChild(modalContentText)
      modal.appendChild(modalContent)
      document.getElementsByTagName('body')[0].appendChild(modal)
    }
  }
}
