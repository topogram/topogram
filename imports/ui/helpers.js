import { Template } from 'meteor/templating'

import { d3 } from 'd3'
import * as _ from 'lodash'

// get colors
export const colors = d3.scale.category20()


Template.registerHelper( 'objectToPairs', function( object ) {
    return _.map( object, function( value, key ) {
        return {
            key: key,
            value: value
        }
    } )
} )

// truncate String to make it shorter
String.prototype.trunc = String.prototype.trunc ||
  function(n){
      return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
  };
