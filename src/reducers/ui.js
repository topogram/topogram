const initialState = {
  filterPanelIsOpen: true,
  // filters
  minTime : null,
  maxTime : null,
  currentSliderTime : () => new Date().getTime(), // TODO set default to minTime
  selectedNodeCategories: [],
  // viz layout settings
  graphVisible : true, // default to graph view
  geoMapVisible : false,
  timeLineVisible : false,
  // network/map
  layoutName : 'preset',
  nodeRadius : 'degree',
  geoMapTile : 'default',
  // selection
  selectedElements : [],
  focusElement: null,
  cy : null, // cytoscape graph
  // isolate
  isolateMode : false,
  prevPositions : null
}
