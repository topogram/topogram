Template.importNetwork.onCreated( function() {
    this.newLayerDataReady = new ReactiveVar(false);
    this.dataFields = new ReactiveVar([]);
    this.newLayerType= new ReactiveVar(undefined);

    var self = this;
    this.parseData = function(csvData) {
      console.log(csvData);
      var lines = csvData.split( '\n' );
      console.log(lines);

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

        console.log(e);
        // e.target
        var self = this;
        console.log( self );

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
        if ( data.errors.length || !Session.get( 'newLayerDataReady' ) ) {
            FlashMessages.sendError( 'CSV contains errors, please fix before submitting' );
            return; // end function
        }

        // get all active select fields
        var selected = $(e.target).find("select.importField").map(function(i, select) {
          return {
            "id" : select.id,
            "value" : select.value
          }
        })

        // check for errors in vars


        // if ( type == 'edges' ) {
        //     srcField = e.target.srcField.value;
        //     targetField = e.target.targetField.value;
        //     if ( Session.get( 'hasDate' ) ) {
        //         dateField = e.target.dateField.value;
        //     }
        //     if ( Session.get( 'hasWidth' ) ) {
        //         widthField = e.target.widthField.value;
        //     }
        //
        //     // check if src and target have been set correctly // TODO VERIFY DATEFIELD
        //     if ( !targetField || !srcField || ( targetField == srcField ) ) {
        //         FlashMessages.sendError( 'Please define source and target' );
        //         return;
        //     }
        // } else if ( type == 'nodes' ) {
        //     idField = e.target.idField.value;
        //
        //     // parse latitude / longitude
        //     if ( Session.get( 'hasLatLng' ) ) {
        //         latField = e.target.latField.value;
        //         lngField = e.target.lngField.value;
        //
        //         // add nodes
        //         if ( !idField || !latField || !lngField || ( latField == lngField ) ) {
        //             FlashMessages.sendError( 'Please define lat / lng / ID fields' );
        //             return;
        //         }
        //     }
        //     if ( Session.get( 'hasDate' ) ) {
        //         dateField = e.target.dateField.value;
        //     }
        //     if ( Session.get( 'hasWidth' ) ) {
        //         widthField = e.target.widthField.value;
        //     }
        //     if ( Session.get( 'hasData2' ) ) {
        //         Data2Field = e.target.Data2Field.value;
        //     }
        //     if ( Session.get( 'hasName' ) ) {
        //         nameField = e.target.nameField.value;
        //     }
        //     if ( Session.get( 'hasArrow' ) ) {
        //         arrowField = e.target.arrowField.value;
        //     }
        //     if ( Session.get( 'hasColor' ) ) {
        //         colorField = e.target.colorField.value;
        //     }
        //     if ( Session.get( 'hasStar' ) ) {
        //         starField = e.target.starField.value;
        //     }
        //     if ( Session.get( 'hasRepMethod' ) ) {
        //         repMethodField = e.target.repMethodField.value;
        //     }
        // }
        //
        // // parse data
        // var parsedData = data.data.map( function( d ) {
        //     // parse geo coords
        //     var lat = 0,
        //         lng = 0;
        //     if ( Session.get( 'hasLatLng' ) ) {
        //         lat = d[ e.target.latField.value ];
        //         lng = d[ e.target.lngField.value ];
        //     };
        //     //parse dates
        //     var date = 0;
        //     if ( Session.get( 'hasDate' ) ) {
        //         date = d[ e.target.dateField.value ];
        //     };
        //     //parse width
        //     var width = 0;
        //     if ( Session.get( 'hasWidth' ) ) {
        //         width = d[ e.target.widthField.value ];
        //     };
        //     //parse data2
        //     var data2 = 0;
        //     if ( Session.get( 'hasData2' ) ) {
        //         data2 = d[ e.target.Data2Field.value ];
        //     };
        //     //parse name
        //     var nameE = 0;
        //     if ( Session.get( 'hasName' ) ) {
        //         nameE = d[ e.target.nameField.value ];
        //     };
        //     //parse arrow
        //     var arrow = 0;
        //     if ( Session.get( 'hasArrow' ) ) {
        //         arrow = d[ e.target.arrowField.value ];
        //     };
        //     //parse color
        //     var color = 0;
        //     if ( Session.get( 'hasColor' ) ) {
        //         color = d[ e.target.colorField.value ];
        //     };
        //     //parse star
        //     var star = 0;
        //     if ( Session.get( 'hasStar' ) ) {
        //         star = d[ e.target.starField.value ];
        //     };
        //     //parse group
        //     var group = 0;
        //     if ( Session.get( 'hasGroup' ) ) {
        //         group = d[ e.target.groupField.value ];
        //     };
        //     //parse repMethod
        //     var repMethod = "";
        //     if ( Session.get( 'hasrepMethod' ) ) {
        //         repMethod = d[ e.target.repMethodField.value ];
        //     };
        //
        //     // parse data
        //     if ( type == 'nodes' ) return makeNode( self.topogramId, d[ idField ], 0, 0, lat, lng, width,data2, date, nameE, color, repMethod,star,group, d );
        //     else if ( type == 'edges' ) return makeEdge( self.topogramId, d[ srcField ], d[ targetField ],width,data2, date, nameE, color, repMethod, arrow,group, d );
        // } );
        //
        // /// TODO : display loader
        // if ( type == 'edges' ) {
        //     Meteor.call( 'batchInsertEdges', parsedData, function( edges ) {
        //         console.log( data.data.length, ' edges added' );
        //         FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' edges created.' );
        //         // Router.go( '/topograms/' + self.topogramId + '/edges' );
        //     } )
        // } else if ( type == 'nodes' ) {
        //     console.log( parsedData );
        //     Meteor.call( 'batchInsertNodes', parsedData, function( nodes ) {
        //         console.log( data.data.length, ' nodes added' );
        //         FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' nodes created.' );
        //         // Router.go( '/topograms/' + self.topogramId + '/nodes' );
        //     } );
        // }

        // Navigate to the new graph
        // Router.go( '/topograms/' + self.topogramId );
    }
} );
