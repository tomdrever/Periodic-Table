// Create map of types and classnames for colouring based off of types
var typeMap = new Map()
typeMap["Nonmetal"] = "nonmetal"
typeMap["Metalloid"] = "metalloid"
typeMap["Other metal"] = "other-metal"
typeMap["Transition metal"] = "transition-metal"
typeMap["Unknown"] = "unknown"
typeMap["Alkali metal"] = "alkali-metal"
typeMap["Alkaline earth metal"] = "alkaline-earth-metal"
typeMap["Lanthanide"] = "lanthanide"
typeMap["Actinide"] = "actinide"
typeMap["Noble gas"] = "noble-gas"
typeMap["Halogen"] = "halogen"

var blockMap = new Map()
blockMap['p'] = "p-block"
blockMap['d'] = "d-block"
blockMap['s'] = "s-block"
blockMap['f'] = "f-block"

var stateMap = new Map()
stateMap["Gas"] = "gas"
stateMap["Liquid"] = "liquid"
stateMap["Solid"] = "solid"

module.exports = {
    getBlockMap: function () {
        return blockMap
    },

    getTypeMap: function () {
        return typeMap
    },

    getStateMap: function () {
        return stateMap
    },
    getElectronegativityClass: function (electronegativity) {
        var enclass = "";
        if (electronegativity < 0.4) {
            return "en-none"
        } else if (isBetween(electronegativity, 0.5, 1)) {
            return "en-one"
        } else if (isBetween(electronegativity, 1, 1.5)) {
            return "en-two"
        } else if (isBetween(electronegativity, 1.5, 2)) {
            return "en-three"
        } else if (isBetween(electronegativity, 2, 2.5)) {
            return "en-four"
        } else if (isBetween(electronegativity, 2.5, 3)) {
            return "en-five"
        } else if (isBetween(electronegativity, 3, 3.5)) {
            return "en-six"
        } else if (isBetween(electronegativity, 3.5, 4)) {
            return "en-seven"
        } else {
            return "en-none"
        }
    }

}

function isBetween(number, min, max) {
    return number >= min && number < max
}
