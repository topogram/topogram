import './import.html'
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import Papa from 'papaparse'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { $ } from 'meteor/jquery'

import { FlashMessages } from '../flashMessages/flashMessages.js'

// import '../../api/edges/edgesMethods.js'
// import '../../api/nodes/nodesMethods.js'
import { makeNode, makeEdge } from '../../api/modelsHelpers.js'
import '../../ui/components/datalab/importNetwork/importOptionalFields.js'
import '../../ui/components/datalab/importNetwork/importEdges.js'
import '../../ui/components/datalab/importNetwork/importNodes.js'

Template.import.onCreated( function() {
    this.newLayerDataReady = new ReactiveVar(false)
    this.dataFields = new ReactiveVar([])
    this.newLayerType= new ReactiveVar(undefined)

    var self = this
    this.parseData = function(csvData) {

      // TODO : make UI for those options
      var parsingOptions = {
          header: true
      }

      // if the last line is empty, remove it to avoid parsing errors
      if(csvData.slice(-1) ==  '\n') csvData = csvData.slice(0, - 1)

      var data = Papa.parse( csvData, parsingOptions )
      console.log(data)

      if ( data.meta.fields ) {
        // check if there is any points in the fields
        data.meta.fields.forEach(function(fieldName){
          if(fieldName.split(".").length > 1) {
            data.errors.push({
              "message" : "the headers'"+ fieldName + "' contains the forbidden character : '.'"
            })
          }
        })
      }

      // if single row only, the parser lib throw an error, so catch it and parse single row data
      if ( data.errors.length == "1" && data.errors[0].code == "UndetectableDelimiter" && data.meta.fields.length == 1) {

        var message = 'CSV parsed succesfully : ' + data.data.length + ' records'
        FlashMessages.sendSuccess( message )

        // keep data
        self.newLayerDataReady.set(true )
        self.dataFields.set(data.meta.fields)

      // check for errors
      } else if (data.errors.length) {
          data.errors.forEach( error => {
              self.newLayerDataReady.set(false)
              var msg = 'CSV Error: '
              if ( error.row ) msg += '[row ' + error.row + '] '
              msg += error.message
              FlashMessages.sendError( msg )
          })
      } else {
          var message = 'CSV parsed succesfully : ' + data.data.length + ' records'
          FlashMessages.sendSuccess( message )

          // keep data
          self.newLayerDataReady.set(true )
          self.dataFields.set(data.meta.fields)
      }
    }
})

Template.import.helpers( {
    dataIsReady: function() {
        return Template.instance().newLayerDataReady.get()
    },
    getLayerType: function() {
        return Template.instance().newLayerType.get()
    },
    isEdges: function() {
        return Template.instance().newLayerType.get() === 'edges' && Template.instance().newLayerDataReady.get()
    },
    isNodes: function() {
        return Template.instance().newLayerType.get() === 'nodes' && Template.instance().newLayerDataReady.get()
    },
    getDataFields: function() {
        return Template.instance().dataFields.get()
    }
} )

Template.import.events( {

    'change #file-input': function( event, instance ) {
        event.preventDefault()
        var file = event.target.files[ 0 ]
        if ( !file ) {
            return
        }
        var reader = new FileReader()
        reader.onload = function( e ) {

            // add to textarea
            var contents = e.target.result.split( '\n' ).filter( function( d ) {
                return d !== ''
            } ).join( '\n' )
            instance.parseData(contents)
            var element = document.getElementById( 'layerData' )
            element.innerHTML = contents
        }
        reader.readAsText( file )
    },

    'click .validateImportData': function( event, instance ) {
        event.preventDefault()
        var lines = $("#importFileUpload textarea").val()
        instance.parseData(lines)
    },

    'change #layerType': function( event, instance ) {
        instance.newLayerType.set( event.currentTarget.value )
        $(".collapsible").collapsible()
    },

    'submit #importForm': function( event ) {
        event.preventDefault()

        var self = this

        self.topogramId =  FlowRouter.getParam('topogramId')

        // Get value from form elements
        var type = event.target.layerType.value, // nodes or edges
            csv = event.target.layerData.value  // csv data

        // init
        // var srcField, targetField, idField, latField, lngField

        // TODO : make UI for those options
        var parsingOptions = {
            header: true
        }

        var data = Papa.parse( csv, parsingOptions )
        console.log( data )

        // check for errors in CSV
        if ( data.errors.length || !Template.instance().newLayerDataReady.get() ) {
            FlashMessages.sendError( 'CSV contains errors, please fix before submitting' )
            return  // end function
        }

        if( ! $(event.target).find("select.importField").length) {
          FlashMessages.sendError( 'Please select a type for your data' )
          return
        }

        // get all active select fields
        var selected = {}
        $(event.target).find("select.importField").each(function(i, select) {
          return selected[select.id] = select.value
        })

        console.log(data, selected)

        // check for errors in vars
        if ( type == 'edges' ) {
            // check if src and target have been set correctly
            if ( !selected.targetField || !selected.sourceField || ( selected.targetField == selected.sourceField ) ) {
                FlashMessages.sendError( 'Please define source and target' )
                return
            }
        }
        else if ( type == 'nodes' ) {
          if ( !selected.idField ) {
              FlashMessages.sendError( 'Please define ID field for your nodes' )
              return
          }
        }
        // TODO Verify optional fields



        // parse data
        var parsedData = data.data.map(function(d) {
          // console.log(d)

          // parse csv data
          var cleanData = {}
          for (var key in selected) {

            var cleanKey = key.replace("Field", "")  // get key from field name
            var csvKey = selected[key]  // proper row name from csv
            cleanData[cleanKey] = d[ csvKey ]
          }

          // create nodes and edges
          if ( type == 'nodes' )
            return makeNode(self.topogramId, cleanData, d, Meteor.userId())
          else if ( type == 'edges' )
            return makeEdge(self.topogramId, cleanData, d, Meteor.userId())

        })
        console.log(parsedData)

        // save data
        // TODO : display loader
        if ( type == 'edges' ) {
            Meteor.call( 'batchInsertEdges', parsedData, function( err, edges ) {
              if (err) throw err
              console.log(err, edges)
              console.log(self);
              // console.log( data.data.length, "/", edges.length , ' edges added' )
              FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' edges created.' )
              FlowRouter.go( '/topograms/' + self.topogramId + '/lab' )
            })
        } else if ( type == 'nodes' ) {
            Meteor.call( 'batchInsertNodes', parsedData, function( err, nodes ) {
              if (err) throw err
              console.log(nodes)
              // console.log( data.data.length, '/', nodes.length, ' nodes added' )
              FlashMessages.sendSuccess( 'Success ! : ' + data.data.length + ' nodes created.' )
              FlowRouter.go( '/topograms/' + self.topogramId + '/lab' )
            })
        }
    }
} )
