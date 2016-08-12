import './titleBox.html'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'

Template.titleBox.created = function() {
    this.editMode = this.data.editMode
}

Template.titleBox.rendered = function() {
    $(".collapsible").collapsible()
}

Template.titleBox.helpers({
    isEditable : function() {
      return Template.instance().data.editMode
    },
    version: function() {
      return Session.get("version")
    },
    topogram: function() {
      return Template.instance().data.topogram
    },
    topogramName: function() {
      return Template.instance().data.topogramName
    },
    topogramId: function() {
      return FlowRouter.getParam('topogramId')
    },
    networkInstance : function(){
      return Template.instance().data.network
    }
})

Template.titleBox.events =  {
  'click #toggle-toolbox' : function() {
    $('#toolbox').toggle()
  },
  'click #share-icon' : function() {
    $('#shareBox').toggle()
  },
  'click #toggle-searchBox' : function() {
    $('#searchBox').toggle()
  },
  'click #toggle-algobox' : function() {
    $('#algobox').toggle()
  },
  'click #toggle-filterBox' : function() {
    $('#filterBox').toggle()
  },
  'click #toggle-commentbox' : function() {
    $('#commentBox').toggle()
  },
  'click #download-png' : function(event, template) {
    console.log(template)
    var network = template.data.network.get()
    var png =  network.png({
      // 'full' : true
    })
    var a = document.createElement("a")
    a.download = "network.png"
    a.href = png
    a.click()

  }
  ,
  'click #download-csv' : function(event, template) {

    var network = template.data.network.get()
    var name = template.data.topogramName

    var nodes =  network.json().elements.nodes.map(function(d) { return d.data })
    var edges =  network.json().elements.edges.map(function(d) { return d.data })

    var nodeCSV = convertToCSV(nodes)
    downloadCSV(nodeCSV, name+' nodes.csv')

    var edgesCSV = convertToCSV(edges)
    downloadCSV(edgesCSV, name+' edges.csv')

  }
}


function convertToCSV(jsonArray) {
  var keys = Object.keys(jsonArray[0]).filter( k => k != "additionalInfo" && k != "rawData")
  var csv = jsonArray.map(function(row){
    return keys.map(function(fieldName){
      return JSON.stringify(row[fieldName] || '');
    });
  });
  csv.unshift(keys); // add header column
  return csv.join('\r\n')
}

function downloadCSV(csvString, filename) {
  var csvData = new Blob([csvString], {type: 'text/csv;charset=utf-8;'});
  var csvURL =  null;
  if (navigator.msSaveBlob) {
      csvURL = navigator.msSaveBlob(csvData, 'download.cv');
  } else {
      csvURL = window.URL.createObjectURL(csvData);
  }
  var tempLink = document.createElement('a');
  tempLink.href = csvURL;
  tempLink.setAttribute('download', filename);
  tempLink.click();
}
