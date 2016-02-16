Template.searchBox.rendered = function() {
  $(".search").dropdown();
}

Template.searchBox.events( {
    'click .search-dropdown>li': function(e, template) {
        var divName = template.data.searchName
        var searchType = template.data.type;

        // display text
        $("#"+divName+" .search" ).attr("value", $(e.target).text());

        // search if a node exists
        if ( !$(e.target).data("node-id") ) return;

        // get network
        var net = template.view.parentView.parentView.parentView._templateInstance.network.get();

        // get node from cy
        var selectedNode = net.nodes().filter("[id='"+$(e.target).data("node-id")+"']");

        // check if a node is already selected
        if(searchType == 'source') {

          // color focus
          net.focusOnNodes(selectedNode);

          // display info
          Session.set('currentType', 'node');
          Session.set('currentId', selectedNode.id());
          $('#infoBox').css('visibility', 'visible');
        } else if(searchType == 'target') {

          // select a second node and draw path
          var nodeOrigin = net.nodes().filter("[id='" + Session.get('currentId') + "']");

          console.log("path",nodeOrigin, selectedNode);
          net.drawPath(nodeOrigin, selectedNode);
        }



    },

    'click .searchClose': function( e, template ) {
        e.preventDefault();
        $(".search" ).attr("value", '');
        $( "ul.search-dropdown li").remove();

        var net = template.view.parentView.parentView._templateInstance.network.get();

        // reset display
        net.unFocus();

        // hide info
        $( "#infoBox" ).css( 'visibility', 'hidden' );
    },

    'keyup .search': function( e, template ) {
        var options = options || {};

        var divName = template.data.searchName
        if ( options.limit ) {
            options.limit = Math.min( 10, Math.abs( options.limit ) );
        } else {
            options.limit = 20;
        }

        if ( event.target.value != '' ) {
          $( ".search-dropdown>li" ).remove(); // clean list
          var nodes =  Nodes.find({
            'data.name' : {
              $regex: event.target.value+"*",
              $options : "i"
            }}, options ).fetch();

          nodes.forEach( function( r ) {
            $( "ul.search-dropdown" ).append( "<li><a href=# data-node-id=" + r.data.id + ">" + r.data.name + "</a></li>" );
          } );
        } else {
          $( ".search-dropdown>li" ).remove();
        }
    }
} );
