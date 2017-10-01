# Get Started


Currently, Topogram is available as a service at [app.topogram.io](http://app.topogram.io), but you can also run it on your own computer (see the [README](/)). The demo here will use the online service version.


## The Python API Client

To visualize our data with Topogram, we need to upload it first into the database. For this, we will use the dedicated [Python API client](https://github.com/topogram/topogram-api-client). Let's install first the library using `pip`.

    pip install topogram-api-client

## Get some data

Then, we will need some properly formatted data (nodes and edges)

The following CSV file describe nodes that are people with name, weight, geo-location and the year where they start and stopped to be part of this network.

```
# nodes.csv

id,name,lat,lng,weight,year_start,year_stop
1,Stephanie,-6.7589,105.8671,20,2005,2008
2,Teresa,47.7675,21.24,14,2006,2009
3,Theresa,29.28065,105.70568,11,2005,2008
4,Phyllis,-37.46025,-63.58537,11,2006,2010
5,Ann,-6.23,106.0752,19,2006,2011
6,Jennifer,-6.5465,105.8728,10,2007,2012
7,Jacqueline,15.31667,-91.61667,11,2009,2010
8,Julie,61.79682,25.70457,12,2008,2010
9,Louise,61.19472,62.86889,10,2007,2009
10,Wanda,-31.38333,-57.96667,19,2009,2012

```

The CSV file describing the edges represent (weigthed) connections between each oftnodes.

```
# edges.csv

source,target,weight
1,9,4
5,8,3
7,3,1
9,9,2
9,3,2
2,10,2
10,8,1
3,7,2
10,8,2
8,10,4
10,5,2
9,7,2
7,8,2
5,4,3
10,6,4
6,2,4
7,10,1
2,1,3
2,7,1
2,2,2
```

## Create a Topogram

Now we need to create a new topogram. We have two ways of doing it : 1) via the online interface, or 2) using the API. Let's see how to do it via the API.

```python
from topogram_client import TopogramAPIClient

# credentials
TOPOGRAM_URL = "https://app.topogram.io"
USER = "myself@email.com"
PASSWORD = "password"

# connect to the topogram instance (we pass debug=True params for more info )
topogram = TopogramAPIClient(TOPOGRAM_URL, debug=True)

# login with your credentials
topogram.user_login(USER, PASSWORD)

# create the topogram
title="My first online geo-spatial network"
req = topogram.create_topogram(title)

# fetch the ID of the topogram we just created
topogram_ID = req["data"]["_id"]

print "topogram ID : %s"%topogram_ID
# output "topogram ID : ZeBnh5rq4RbxYAuSq"
```

## Add nodes

Now we will read the data from our nodes and push it to our topogram.

```python

# parse our nodes properly
nodes = []
with open('data/nodes.csv') as f :
  reader = DictReader(f)
  for n in reader :
    node = {
      "id" : n["id"],
      "name" : n["name"],
      "lat" : float(n["lat"]),
      "lng" : float(n["lng"]),
      "weight" : float(n["weight"]),
      "start" : n["year_start"],
      "end" : n["year_stop"]
      }

    # in the nodes, all data is stored in a 'data' argument
    nodes.append({ "data" : node })

# to create our nodes, we pass the ID of our topogram with our data
r = topogram.create_nodes(topogram_ID, nodes)

print "%s nodes created."%len(r["data"])
# output : "10 nodes created."
```

## Add edges

Let's push the edges to our topogram now.

```python

edges=[]
with open('data/edges.csv') as f :
    reader = DictReader(f)
    for e in reader :
        edge = {
            "source" : e["source"],
            "target" : e["target"],
            "weight" : float(e["weight"])
        }
        edges.append({ "data" : edge })

# create our edges by passing the ID of the topogram
r = topogram.create_edges(topogram_ID, edges)

print "%s edges created."%len(r["data"])
# output : "20 edges created"
```

## Visualize

Congratulations ! You can now start exploring the data by accessing the visualization interface online. Use the different panels to move into the dimensions of the graphs.


```python
print "Your topogram is available at %s/topograms/%s"%(TOPOGRAM_URL, topogram_ID)
# output : "Your topogram is available at http://app.topogram.io/topograms/ZeBnh5rq4RbxYAuSq"
```

![Topogram Panels](img/Topogram-panels.png)

Read more about the [Python API client](https://github.com/topogram/topogram-api-client) and the [interface](/)
