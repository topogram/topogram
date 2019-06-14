const initialState = {
  filterPanelIsOpen: true,
  // filters
  minTime : null,
  maxTime : null,
  currentSliderTime : null,
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

export function ui(state = initialState, action) {
  switch (action.type) {
    case 'SET_CY_INSTANCE':
      return {
        ...state,
        cy: action.cy
      }
    case 'SET_NODES_SELECTED_CATEGORIES':
      return {
        ...state,
        selectedNodeCategories: action.selectedNodeCategories
      }
    case 'SET_CURRENT_SLIDER_TIME':
      return {
        ...state,
        currentSliderTime: action.currentSliderTime
      }
    case 'SET_MIN_TIME':
      return {
        ...state,
        minTime: action.minTime
      }
    case 'SET_MAX_TIME':
      return {
        ...state,
        maxTime: action.maxTime
      }
    default:
      return state
  }
}
