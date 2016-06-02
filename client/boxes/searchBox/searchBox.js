Template.searchBox.rendered = function() {
  $(".search").dropdown();
  $("#new-node").hide();
}

Template.searchBox.events( {
    'click .search-dropdown>li': function(e, template) {
        var divName = template.data.searchName
        var searchType = template.data.type;

        // get network
        var net = Template.instance().data.network.get()

        // display text
        $("#"+divName+" .search" ).attr("value", $(e.target).text());

        // check there is a proper data argument
        if ( !$(e.target).data("node-id") ) return

        // select my nodes
        var selectedNode = net.nodes().filter("[id='"+$(e.target).data("node-id")+"']");

        // create new node if it does not exists
        if(!selectedNode.length){
          net.createNode($(e.target).data("node-id"));

        } else {

          // check if a node is already selected
          if(searchType == 'source') {

            // display info
            Session.set('currentType', 'node');
            Session.set('currentId', selectedNode.id());

            // color focus
            net.selectElement(selectedNode, "node");

          } else if(searchType == 'target') {

            // select a second node and draw path
            var nodeOrigin = net.nodes().filter("[id='" + Session.get('currentId') + "']");
            Session.set('pathTargetNodeId', selectedNode.data('id'))
            net.drawPath(nodeOrigin, selectedNode);
          }
        }
    },

    'click .searchClose': function( e, template ) {
        e.preventDefault();
        $(".search" ).val("");
        $( "ul.search-dropdown li").not('#new-node').remove();

        var net = Template.instance().data.network.get()

        // reset display
        net.unFocus();
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
          $( ".search-dropdown>li").not('#new-node').remove(); // clean list
          $("#new-node").show();
          $("#new-node a").data("node-id", event.target.value);
          $("#new-node a span").html(event.target.value);

          var nodes =  Nodes.find({
            'data.name' : {
              $regex: event.target.value+"*",
              $options : "i"
            }}, options ).fetch();

          nodes.forEach( function( r ) {
            $( "ul.search-dropdown" ).append( "<li><a href=# data-node-id=" + r.data.id + ">" + r.data.name + "</a></li>" );
          } );

        } else {
          $("#new-node").hide();
          $( ".search-dropdown>li").not('#new-node').remove();
        }
    }
} );
