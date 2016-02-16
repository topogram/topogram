Template.searchFilter.rendered = function() {
  $("#search").dropdown();
}


Template.searchFilter.events( {
    'click #search-dropdown>li': function(e, template) {

        // display text
        document.getElementById( "search" ).value = $(e.target).text();

        // search if a node exists
        if ( !$(e.target).data("node-id") ) return;

        var net = template.view.parentView.parentView._templateInstance.network.get();

        // get node from cy
        var selectedNode = net.nodes().filter("[id='"+$(e.target).data("node-id")+"']");

        // color focus
        net.focusOnNodes(selectedNode);

        // display info
        // TODO : should support multiple nodes
        Session.set('currentType', 'node');
        Session.set('currentId', selectedNode.id());
        $('#infoBox').css('visibility', 'visible');

    },

    'click #searchClose': function( e, template ) {
        e.preventDefault();
        document.getElementById( "search" ).value = '';

        var net = template.view.parentView.parentView._templateInstance.network.get();

        // reset display
        net.unFocus();

        // hide info
        $( "#infoBox" ).css( 'visibility', 'hidden' );
    },

    'keyup #search': function( e ) {
        var options = options || {};

        if ( options.limit ) {
            options.limit = Math.min( 10, Math.abs( options.limit ) );
        } else {
            options.limit = 20;
        }

        if ( event.target.value != '' ) {
          $( "#search-dropdown>li" ).remove(); // clean list
          var nodes =  Nodes.find({
            'data.data.name' : {
              $regex: event.target.value+"*",
              $options : "i"
            }}, options ).fetch();
          nodes.forEach( function( r ) {
              $( "#search-dropdown" ).append( "<li><a href=# data-node-id=" + r.data.id + ">" + r.data.name + "</a></li>" );
          } );
        } else {
          $( "#search-dropdown>li" ).remove();
        }
    }
} );
