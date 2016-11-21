import './table.html'
import './table.css'
import './editableMarkdown.js'
import '../boxes/nodeMerge/nodeMerge.js'

// import './tableRow.js'

import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { Meteor } from 'meteor/meteor'

import {EditableText} from 'meteor/babrahams:editable-text'
import { Nodes } from '../../../api/collections.js'
import { ReactiveVar } from 'meteor/reactive-var'

Template.table.created = function() {
  console.log("table")
  let template = Template.instance();

  template.searchQuery = new ReactiveVar()
  template.searching   = new ReactiveVar( false )
  template.limit   = new ReactiveVar( 0 )
  template.offset   = new ReactiveVar( 0 )
  template.sorting   = new ReactiveVar()
  template.selected   = new ReactiveVar([])

  template.modalText   = new ReactiveVar("")

  Session.set("mergeSource", null)
  Session.set("mergeTargets", null )
}

Template.table.events({
  'keyup [name="search"]' ( event, instance ) {
    let value = event.target.value.trim();
    if ( value !== '' ) { instance.searchQuery.set( value ); }
  },
  'click .searchClose': function( event, instance ) {
      event.preventDefault();
      instance.searchQuery.set('');
  },
  'click .sortable': function( event, instance ) {
      event.preventDefault();
      let field = event.currentTarget.dataset.field
      let sort = {}
      let prevSort = instance.sorting.get()

      // sort
      sort[field] = prevSort && prevSort[field] == 1 ? -1 : 1
      instance.sorting.set(sort);

      // display sorting indicator
      let sortClass = sort[field] == 1 ? "arrow-up" : "arrow-down"

      // remove from all sortable columns
      event.currentTarget.className = "sortable "+sortClass;
  },
  'change [type="checkbox"]' : function(event, instance) {

    // find all selected
    let selected = $(':checked').map(function(i, el){
      return el.dataset.id
    }).toArray()

    console.log(selected);
    instance.selected.set(selected)

  },
  'click .merger': function( event, instance ) {
    event.preventDefault();
    let selected = instance.selected.get()

    // only catch
    if(selected.length != 2) return

    console.log(selected);
    let source = Nodes.findOne(selected[0]),
      target = Nodes.findOne(selected[1])

    let txt = "Merge " + source.data.name + " and " + target.data.name + " into a single node ?"

    instance.modalText.set(txt)

    // TODO : fix merger
    $('#modal-merge').openModal()
  },
  'click #merge-ok' : function(event, instance) {
    let selected = instance.selected.get()
    console.log("merge", selected);
    Meteor.call("mergeNodes", selected[0], selected[1])
    instance.selected.set([])
  },
  'click .delete' : function(event, instance) {
    event.preventDefault();
    let selected = instance.selected.get()
    if (!selected.length) return

    let nodes = Nodes.find({ '_id' : { '$in' : selected }}).fetch()
    console.log("delete", nodes);
    let names = nodes.map(d => d.data.name).join(" ,")
    let txt = "Are you sure you want to delete this "+selected.length+" nodes : "+names
    instance.modalText.set(txt)
    $('#modal-delete').openModal()

  },
  'click #delete-ok' : function(event, instance) {
    let selected = instance.selected.get()
    console.log("delete", selected);
    Meteor.call('deleteNodeAndConnectedEdges', selected)
    instance.selected.set([])
  }
})

Template.table.helpers( {

    'count': function() {
      return Nodes.find().count()
    },
    'rows': function() {
      // console.log(Nodes.findOne());
      let q = {},
        projection = {
          limit : Template.instance().limit.get(),
          offset : Template.instance().offset.get(),
          sort: Template.instance().sorting.get()
        };

      let search = Template.instance().searchQuery.get();

      if ( search ) {
         let regex = new RegExp( search, 'i' );
         q = { "data.name" : regex }
       }
      return Nodes.find(q, projection).fetch()
    },
    'searching' : function() {
      console.log(this);
      return Template.instance().searching.get();
    },
    query : function() {
      return Template.instance().searchQuery.get();
    },
    selected : function() {
      return Template.instance().selected.get()
    },
    mergeDisable : function() {
      return Template.instance().selected.get().length == 2 ? "" : "disable"
    },
    modalText : function() {
      return Template.instance().modalText.get()
    }
})
