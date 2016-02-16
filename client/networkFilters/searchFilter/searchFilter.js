Template.searchFilter.rendered = function() {
  $("#search").dropdown();
}


Template.searchFilter.events( {
    'click #search-dropdown>li': function(e, template) {
        // console.log($(e.target).data("node-id"), $(e.target).text());

        // display text
        document.getElementById( "search" ).value = $(e.target).text();

        if ( !$(e.target).data("node-id") ) return;

        var net = template.view.parentView.parentView._templateInstance.network.get();

        // get node from cy
        var node = net.nodes().filter("[id='"+$(e.target).data("node-id")+"']");

        Session.set('currentType', 'node');
        Session.set('currentId', node.id());

        // color focus
        net.nodes().style({
            'opacity': '.1'
        });
        net.edges().style({
            'opacity': '.1'
        });
        node.style({
            'opacity': '1'
        });
        node.neighborhood().style({
            'opacity': '1'
        });

        // make only the focus selectable
        net.nodes().unselectify();
        net.edges().unselectify(false);
        node.neighborhood().selectify();

        $('#infoBox').css('visibility', 'visible');

    },

    'click #searchClose': function( e, template ) {
        e.preventDefault();
        document.getElementById( "search" ).value = '';

        var net = template.view.parentView.parentView._templateInstance.network.get();

        net.nodes().style( {
            "opacity": '1'
        } );
        net.edges().style( {
            "opacity": '1'
        } );
        net.nodes().selectify();
        net.edges().selectify();

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
              $( "#search-dropdown" ).append( "<li><a href=# data-node-id=" + r.data.data.id + ">" + r.data.data.name + "</a></li>" );
          } );
        } else {
          $( "#search-dropdown>li" ).remove();
        }
    }
} );
