Template.createDataset.onCreated( function() {
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
            header: true,
            skipEmptyLines: true
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

Template.createDataset.helpers( {
    dataIsReady: function() {
        return Template.instance().newLayerDataReady.get();
    },
    getLayerType: function() {
        return Template.instance().newLayerType.get();
    },
    getDataFields: function() {
        return Template.instance().dataFields.get();
    },
    availableLanguages: function() {
        return ["zh"]
    }
} );

Template.createDataset.events( {

    'change #file-input': function( e, template ) {
        e.preventDefault();
        var file = e.target.files[ 0 ];
        if ( !file ) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function( e ) {
            var contents = e.target.result;
            template.parseData(contents);
        };
        reader.readAsText( file );
    }
});
