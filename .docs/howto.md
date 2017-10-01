---
layout: main
title: How To Use Topogram
---

# How To Use

## Input data

Currently, the simplest way is to input data is to use the [Python API client](https://github.com/topogram/topogram-api-client) to push data directly into the database.


```python
from topogram-python-client import TopogramAPIClient

topogram = TopogramAPIClient("http://localhost:3000")

# create a new network
topogram.create_topogram("Awesome viz of geo-time network")

# add data
r = topogram.create_nodes(topogram_ID, [...nodes])
r = topogram.create_edges(topogram_ID, [...edges])

```

## Data format

### Nodes

You can add geographic and time information to the nodes.

| Name | Type | Description |
|---|---|---|
| id | String | Id of the node (optional : will be generated). This will be used by the edges to recognize the node |
| name | String | The name of the node |
| lat | Float | Latitude (in degrees) |
| lng | Float | Longitude (in degrees)|
| start | Date | Date when the node started existing |
| end | Date | Date when the node stopped existing |
| color | String | Color of the node |
| weight | Float | Weight of the node |
| group | String | Some category to classify the node |
| notes | String | (Markdown) Additional info about the nodes |

See the model in [/imports/api/nodes/Nodes.js]()


Example of mapping using the Python API Client :

```
  node = {
    "id" : str,
    "name" : str,
    "lat" : float,
    "lng" : float,
    "weight" : float,
    "start" : datetime,
    "end" : datetime,
    "notes" : str
    }
```

### Edges

Edges require a source and target. When source node or target node are absent from the data, the edge will be ignored.

| Name | Type | Description |
|---|---|---|
| id | String | Id of the edge (optional : will be generated) |
| source | String | Id of the source node (required)|
| target | String | Id of the target node (required)|
| name | String | The name/label of the edge |
| start | Date | Date when the edge started existing |
| end | Date | Date when the edge stopped existing |
| color | String | Color of the node |
| weight | Float | Weight of the node |
| group | String | Some category to classify the node |
| notes | String | (Markdown) Additional info about the nodes |

See the model in [/imports/api/edges/Edges.js]()


Example of mapping using the Python API Client :

```
  edge = {
    "source" : str,
    "target" : str,
    "weight" : float,
    "notes" : str
    }
```

## Visualization

Once you have created your topogram, it will be available at the list at the address [/topograms]() of your server. You can click on the title to access


### Panel Selector

The main visualization is divided between 3 panels :

* network graph
* geographical map
* timeline

You can toggle each of these panels by using the panel selector. When no geo or time element are detected, the checkboxes are disabled automatically.

### Side menu

By clicking on the title, you can access the main menu to manipulate and edit your topogram.

#### Map background

Change the tiles of the map according to your needs.

#### Network layout

Different layouts are available to display your graph. Try different options to see what fits you best.

#### Node Radius

Different options are available to display the nodes. It can used the degree of the node in the graph or a user-defined weight (if you assigned it in the data).

### Selection mode

When the selection mode is activated, you can click to highlight specific elements of the graphs.
