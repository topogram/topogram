import {
  NODES_LOADING,
  NODES_LOADED
} from '../actions'

const initialState = {
  ready: false,
  loading: false,
  nodes: [],
  nodeCategories : []
}


export function nodes(state = initialState, action) {
  switch (action.type) {
    case NODES_LOADING:
      return {
        ...state,
        loading: true
      }
    case NODES_LOADED: {

      // convert from Document to plain JS object properly
      const nodes = action.payload
        .map(d => JSON.parse(JSON.stringify(d)))
        .map( (n,i) => {
          n.data.i = i // add index as reference
          n.storedPosition = Object.assign({}, n.position) // backup position from the db
          return n
        })

      const starts = nodes
        .filter(n => n.data.start)
        .map(n => new Date(n.data.start))
        .sort((a,b) => a.getTime() -b.getTime())

      const ends = nodes
        .filter(n => n.data.end)
        .map(n => new Date(n.data.end))
        .sort((a,b) => b.getTime()-a.getTime())

      const hasTimeInfo = !!(starts.length || ends.length)

      const nodeCategories = [
        ...new Set(
          nodes.map(n => n.data.group)
            .filter(n => !!n)
        )
      ]

      const latLngs = nodes
        .filter(n => !!(n.data.lat && n.data.lng))

      const hasGeoInfo = !!latLngs.length

      return {
        ...state,
        ready: true,
        loading: false,
        nodes,
        hasTimeInfo,
        hasGeoInfo,
        nodeCategories,
        minTime: starts[0],
        maxTime: ends[0]
      }
    }
    default:
      return state
  }
}
