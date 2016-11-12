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
  getBlockMap: function() {
    return blockMap
  },

  getTypeMap: function() {
    return typeMap
  },

  getStateMap: function() {
    return stateMap
  }
}
