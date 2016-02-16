Template.importNetwork.onCreated( function() {
    this.newLayerDataReady = new ReactiveVar(false);
    this.dataFields = new ReactiveVar([]);
    this.newLayerType= new ReactiveVar(undefined);

    var self = this;
    this.parseData = function(csvData) {
      var lines = csvData.split( '\n' );

      //remove empty lines
      lines = lines.filter( function( line ) {
          return line != '';
      } );

      //check all lines have the same nb of datum
      var nbDatum = lines[ 0 ].split( ',' ).length;
      // console.log( 'nbDatum:', nbDatum );
      if ( lines.filter( function( l ) {
          l.split( ',' ).length != nbDatum;
      } ).length != 0 ) {
          console.log( "all lines don't have the same nb of datum" );
      } else {
          console.log( "data seems safe" );

          // TODO : make UI for those options
          var parsingOptions = {
              header: true
          };

          var data = Papa.parse( csvData, parsingOptions );
          console.log( data );

          // check if there is any points in the fields
          data.meta.fields.forEach(function(fieldName){
            if(fieldName.split(".").length > 1) {
              data.errors.push({
                "message" : "the column name'"+ fieldName + "' contains the forbidden character : '.'"
              })
            }
          })

          if ( data.errors.length ) {
              for ( var i = 0; i < data.errors.length; i++ ) {
                  self.newLayerDataReady.set(false);

                  var message = 'CSV parsing Error ';
                  if ( data.errors[ i ].row ) message += 'at row: ' + data.errors[ i ].row + ' ';
                  message += data.errors[ i ].message;
                  FlashMessages.sendError( message );
              }
          } else {
              var message = 'CSV parsed succesfully : ' + data.data.length + ' records';
              FlashMessages.sendSuccess( message );

              // keep data
              self.newLayerDataReady.set(true );
              self.dataFields.set(data.meta.fields);
          }
      }
    }
});

Template.importNetwork.helpers( {
    dataIsReady: function() {
        return Template.instance().newLayerDataReady.get();
    },
    getLayerType: function() {
        return Template.instance().newLayerType.get();
    },
    isEdges: function() {
        return Template.instance().newLayerType.get() === 'edges' && Template.instance().newLayerDataReady.get();
    },
    isNodes: function() {
        return Template.instance().newLayerType.get() === 'nodes' && Template.instance().newLayerDataReady.get();
    },
    getDataFields: function() {
        return Template.instance().dataFields.get();
    }
} );

Template.importNetwork.events( {

    'change #file-input': function( e, template ) {
        e.preventDefault();
        var file = e.target.files[ 0 ];
        if ( !file ) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function( e ) {

            // add to textarea
            var contents = e.target.result.split( '\n' ).filter( function( d ) {
                return d !== '';
            } ).join( '\n' );
            template.parseData(contents)
            var element = document.getElementById( 'layerData' );
            element.innerHTML = contents;
        };
        reader.readAsText( file );
    },

    'click .validateImportData': function( e, template ) {
        e.preventDefault();
        var lines = $("#importFileUpload textarea").val();
        template.parseData(lines)
    },

    'change #layerType': function( e, template ) {
        template.newLayerType.set( e.currentTarget.value );
        $(".collapsible").collapsible();
    },

    'submit #importForm': function( e ) {
        e.preventDefault();

        var self = this;

        // Get value from form elements
        var type = e.target.layerType.value, // nodes or edges
            csv = e.target.layerData.value; // csv data

        // init
        var srcField, targetField, idField, latField, lngField;

        // TODO : make UI for those options
        var parsingOptions = {
            header: true
        };

        var data = Papa.parse( csv, parsingOptions );
        console.log( data );

        // check for errors in CSV
        if ( data.errors.length || !Template.instance().newLayerDataReady.get() ) {
            FlashMessages.sendError( 'CSV contains errors, please fix before submitting' );
            return; // end function
        }

        if( ! $(e.target).find("select.importField").length) {
          FlashMessages.sendError( 'Please select a type for your data' );
          return
        }

        // get all active select fields
        var selected = {};
        $(e.target).find("select.importField").each(function(i, select) {
          return selected[select.id] = select.value;
        })

        console.log(data, selected);

        // check for errors in vars
        if ( type == 'edges' ) {
            // check if src and target have been set correctly
            if ( !selected.targetField || !selected.sourceField || ( selected.targetField == selected.sourceField ) ) {
                FlashMessages.sendError( 'Please define source and target' );
                return;
            }
        }
        else if ( type == 'nodes' ) {
          if ( !selected.idField ) {
              FlashMessages.sendError( 'Please define ID field for your nodes' );
              return;
          }
        }
        // TODO Verify optional fields



        // parse data
        var parsedData = data.data.map(function(d) {
          console.log(d);

          // parse csv data
          var cleanData = {}
          for (key in selected) {

            var cleanKey = key.replace("Field", ""); // get key from field name
            var csvKey = selected[key]; // proper row name from csv
            cleanData[cleanKey] = d[ csvKey ]
          };

          // create nodes and edges
          if ( type == 'nodes' )
            return makeNode(self.topogramId, cleanData, d);
          else if ( type == 'edges' )
            return makeEdge(self.topogramId, cleanData, d);

        });
        console.log(parsedData);

        // save data
        // TODO : display loader
        if ( type == 'edges' ) {
            Meteor.call( 'batchInsertEdges', parsedData, function( edges ) {
                console.log( data.data.length, ' edges added' );
                FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' edges created.' );
                Router.go( '/topograms/' + self.topogramId + '/edges' );
            })
        } else if ( type == 'nodes' ) {
            Meteor.call( 'batchInsertNodes', parsedData, function( nodes ) {
                console.log( data.data.length, ' nodes added' );
                FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' nodes created.' );
                Router.go( '/topograms/' + self.topogramId + '/nodes' );
            });
        }
    }
} );
