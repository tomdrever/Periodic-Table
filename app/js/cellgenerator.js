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
  }
}
