const maps = require('./js/maps')

var blockMap = maps.getBlockMap()
var typeMap = maps.getTypeMap()
var stateMap = maps.getStateMap()

var colourClasses = ["type", "block", "state", "electronegativity"]

// Initial colouring
onColourByClicked("type")

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

// Handle click elsewhere to dismiss dropdown
window.onclick = function (event) {
    if (!event.target.matches('#options-btn') && !event.target.matches('#options-dropdown')) {
        hideDropdowns()
    }
}

function toggleColourClass(colourClass) {
    // For every non-empty cell...
    var tbody = document.getElementById("tbody")

    for (i = 0; i < tbody.childNodes.length; i++) {
        var row = tbody.childNodes[i]

        for (j = 0; j < row.childNodes.length; j++) {
            var cell = row.childNodes[j]

            if (!cell.classList.contains("empty")) {
                // Get data
                var elementType = cell.getAttribute("element-type")
                var elementBlock = cell.getAttribute("element-block")
                var elementState = cell.getAttribute("element-state")
                var elementElectronegativity = cell.getAttribute("element-electronegativity")

                var classesToRemove, classToAdd

                // Define classes to add and remove based on the option clicked
                if (colourClass === "type") {
                    classesToRemove = [blockMap[elementBlock], stateMap[elementState], maps.getElectronegativityClass(elementElectronegativity)]
                    classToAdd = typeMap[elementType]
                } else if (colourClass === "state") {
                    classesToRemove = [blockMap[elementBlock], typeMap[elementType], maps.getElectronegativityClass(elementElectronegativity)]
                    classToAdd = stateMap[elementState]
                } else if (colourClass === "block") {
                    classesToRemove = [typeMap[elementType], stateMap[elementState], maps.getElectronegativityClass(elementElectronegativity)]
                    classToAdd = blockMap[elementBlock]
                } else if (colourClass === "electronegativity") {
                    classesToRemove = [typeMap[elementType], stateMap[elementState], blockMap[elementBlock]]
                    classToAdd = maps.getElectronegativityClass(elementElectronegativity)
                }

                console.log(elementElectronegativity)

                // Remove classes that colour
                for (var k = 0; k < classesToRemove.length; k++) {
                    if (cell.classList.contains(classesToRemove[k])) {
                        cell.classList.remove(classesToRemove[k])
                    }
                }

                // Add desired class for colour
                if (!cell.classList.contains(classToAdd)) {
                    cell.classList.add(classToAdd)
                }
            }
        }
    }
}

function onColourByClicked(colourClass) {
    toggleColourClass(colourClass)

    // Add the "visible" class to the icon of the option currently selected
    document.getElementById("colour-by-" + colourClass + "-done").classList.add("icon-visible")

    // Get a copy of the list of colour classes and remove the class we do want
    var undesiredColourClasses = colourClasses.slice()
    undesiredColourClasses.splice(undesiredColourClasses.indexOf(colourClass), 1)

    // For each class we don't want, remove the "visible" class from the button's icon
    for (var i = 0; i < undesiredColourClasses.length; i++) {
        var undesiredColourClass = undesiredColourClasses[i]
        document.getElementById("colour-by-" + undesiredColourClass + "-done").classList.remove("icon-visible")
    }
}
