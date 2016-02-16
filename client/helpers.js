Template.registerHelper( 'objectToPairs', function( object ) {
    return _.map( object, function( value, key ) {
        return {
            key: key,
            value: value
        };
    } );
} );

// truncate String to make it shorter
String.prototype.trunc = function(m) {
  return (this.length > m)
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
};
