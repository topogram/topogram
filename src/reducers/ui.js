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
      if (typeof action.currentSliderTime.getMonth !== 'function')
        throw("currentSliderTime needs to be a valid JS date object")
      return {
        ...state,
        currentSliderTime: action.currentSliderTime
      }
    case 'SET_MIN_TIME':
      if (typeof action.minTime.getMonth !== 'function')
        throw("minTime needs to be a valid JS date object")
      return {
        ...state,
        minTime: action.minTime
      }
    case 'SET_MAX_TIME':
      if (typeof action.maxTime.getMonth !== 'function')
        throw("maxTime needs to be a valid JS date object")
      return {
        ...state,
        maxTime: action.maxTime
      }
    case 'SHOW_TIMELINE':
      return {
        ...state,
        timeLineVisible : true
      }
    case 'GEO_SET_TILE':
      return {
        ...state,
        geoMapTile : action.geoMapTile
      }
    case 'GEO_MAP_TOGGLE' :
      return {
        ...state,
        geoMapVisible : !state.geoMapVisible
      }
    case 'GRAPH_TOGGLE' :
      return {
        ...state,
        graphVisible : !state.graphVisible
      }
    case 'GEO_MAP_TOGGLE' :
      return {
        ...state,
        geoMapVisible : !state.geoMapVisible
      }
    case 'TIMELINE_TOGGLE' :
      return {
        ...state,
        timeLineVisible : !state.timeLineVisible
      }
    case 'FILTER_PANEL_OPEN':
      return {
        ...state,
        'filterPanelIsOpen' : true
      }
    case 'FILTER_PANEL_CLOSE':
      return {
        ...state,
        'filterPanelIsOpen' : false
      }
    case 'SELECT_ELEMENTS':
      return {
        ...state,
        'selectedElements' : action.selectedElements
      }
    case 'FOCUS_ELEMENTS':
      return {
        ...state,
        'focusElement' : action.focusElement
      }
    case 'ISOLATE_MODE_ENTER':
      return {
        ...state,
        'isolateMode' : true
      }
    case 'ISOLATE_MODE_EXIT':
      return {
        ...state,
        'isolateMode' : true
      }
    case 'PREV_POSITIONS_SET':
      return {
        ...state,
        prevPositions: action.prevPositions
      }
    case 'PREV_POSITIONS_CLEAR':
      return {
        ...state,
        prevPositions: null
      }
    case 'NETWORK_SET_LAYOUT':
      return {
        ...state,
        layoutName: action.layoutName
      }
    case 'NETWORK_SET_NODE_RADIUS':
      return {
        ...state,
        nodeRadius: action.nodeRadius
      }
    default:
      return state
  }
}
