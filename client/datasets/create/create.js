Template.createDataset.onCreated( function() {
  this.newLayerDataReady = new ReactiveVar(false);
  this.dataFields = new ReactiveVar([]);
  this.newLayerType= new ReactiveVar(undefined);
  var self = this;

  this.parseData = function(csvData) {

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
    },
    'submit #importForm': function( e ) {
        e.preventDefault();
        console.log(e);

        // get all active select fields
        var description = {}
        $(e.target).find("select.importField").each(function(i, select) {
          return description[select.id]= select.value
        });

        console.log(description);

        var datasetDescription = {
          'text_column' : description.textField,
          'language' : description.languageField,
          'time_column' : description.timeField,
          'source_column' : description.userField,
          'additional_columns' : [description.additionalInfoField]
        }
        console.log(datasetDescription);

    }
});
