import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares'

import {
  NODES_SUBSCRIPTION_READY,
  NODES_SUBSCRIPTION_CHANGED,
  NODES_SUB,
} from '/imports/client/actions/nodes'

const initialState = {
  ready: false,
  nodes: [],
  nodesSubscriptionStopped: false,
  nodeCategories : []
}


export function nodes(state = initialState, action) {
  switch (action.type) {
  case NODES_SUBSCRIPTION_READY:
    return {
      ...state,
      ready: action.payload.ready,
      nodesSubscriptionStopped: false,
    }
  case NODES_SUBSCRIPTION_CHANGED: {

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
//console.log(ends,"ends");

//console.log(nodes,"nodes");

//TODOIMPROVE THIS
      const weighsMin = nodes
        .filter(n => n.data.weight)
        .map(n => n.data.weight)
        .sort((a,b) =>a-b)



        // {
        //   return(
        //   [a-b,b-a]
        //   )
        // })
        const weighsMax = nodes
          .filter(n => n.data.weight)
          .map(n => n.data.weight)
          .sort((a,b) =>b-a)
//console.log(weighsMin,"weighsMin");
//console.log(weighsMax,"weighsMax");
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
      nodes,
      hasTimeInfo,
      hasGeoInfo,
      nodeCategories,
      minTime: starts[0],
      maxTime: ends[0],
      minWeight: weighsMin[0],
      maxWeight: weighsMax[1],

    }
  }
  case STOP_SUBSCRIPTION:
    return action.payload === NODES_SUB
      ? { ...state, nodesSubscriptionStopped: true }
      : state
  default:
    return state
  }
}
