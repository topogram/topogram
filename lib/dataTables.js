TabularTables = {};

TabularTables.TopogramsList = new Tabular.Table( {
    name: "TopogramsList",
    collection: Topograms,
    columns: [ {
        data: 'name',
        title: 'Name',
        render: function( val, type, doc ) {;
            return "<a href='/topograms/" + doc._id + "''>" + val + "</a>";
        }
    }, {
        data: 'sharedPublic',
        title: 'Public',
        render: function( val, type, doc ) {
            return val ? "Public" : "Private";
        }
    }, {
        data: 'createdAt',
        title: 'Created At',
        render: function( val, type, doc ) {
            return moment( val ).format( "MMMM Do YYYY, h:mm:ss a" );
        }
    }, {
        tmpl: Meteor.isClient && Template.deleteCell
    } ]
} );

TabularTables.NodesList = new Tabular.Table( {
    name: "NodesList",
    collection: Nodes,
    columns: [ {
        data: 'id',
        title: 'ID'
    }, {
        data: 'data.name',
        title: 'Name'
    }, {
        data: 'data.group',
        title: 'Group'
    }, {
        data: 'data.lat',
        title: 'Latitude'
    }, {
        data: 'data.lng',
        title: 'Longitude'
    }, {
        data: 'data.starred',
        title: 'Starred'
    }, {
        data: "createdAt",
        title: "Created At"
    } ]
} );

TabularTables.EdgesList = new Tabular.Table( {
    name: "EdgesList",
    collection: Edges,
    columns: [ {
        data: 'data.id',
        title: 'ID'
    }, {
        data: 'data.source',
        title: 'Source'
    }, {
        data: 'data.target',
        title: 'Target'
    }, {
        data: "createdAt",
        title: "Created At"
    }, ]
} );
