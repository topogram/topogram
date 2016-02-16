Template.registerHelper( 'objectToPairs', function( object ) {
    return _.map( object, function( value, key ) {
        return {
            key: key,
            value: value
        };
    } );
} );

// get current node
getCurrentSelection = function() {
  var id = Session.get( 'currentId' ),
      type = Session.get( 'currentType' ),
      item = {};

  if(id && type) {
    if ( type == 'node' ) {
        item = Nodes.findOne( {
            'data.id': id
        } );
    } else if ( type == 'edge' ) {
        item = Edges.findOne( {
            'data.id': id
        } );
    }
  }
  return item;
}

// truncate String to make it shorter
String.prototype.trunc = function(m) {
  return (this.length > m)
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};
