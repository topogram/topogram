import './tableEdges.html'
import './table.css'
import './editableMarkdown.js'

// import './tableRow.js'

import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { Meteor } from 'meteor/meteor'

import { Edges } from '../../../api/collections.js'
import { ReactiveVar } from 'meteor/reactive-var'

Template.tableEdges.created = function() {
  console.log("table")
  let template = Template.instance();

  template.searchQuery = new ReactiveVar()
  template.searching   = new ReactiveVar( false )
  template.limit   = new ReactiveVar( 0 )
  template.offset   = new ReactiveVar( 0 )
  template.sorting   = new ReactiveVar()
  template.selected   = new ReactiveVar([])

  template.modalText   = new ReactiveVar("")

}

Template.tableEdges.events({
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

    instance.selected.set(selected)
  },
  'click .delete' : function(event, instance) {
    event.preventDefault();
    let selected = instance.selected.get()
    if (!selected.length) return

    let edges = Edges.find({ '_id' : { '$in' : selected }}).fetch()
    // console.log("delete", edges.length, "edges");
    let names = edges.map(d =>
      '<li>' + [d.data.target, d.data.source].join(" --> ") + '</li>'
    ).join("\n")
    let txt = "Are you sure you want to delete this "+selected.length+" edges : <ul>"+names+"</ul>"
    instance.modalText.set(txt)
    $('#modal-delete').openModal()

  },
  'click #delete-ok' : function(event, instance) {
    let selected = instance.selected.get()
    // console.log("delete", selected);
    Meteor.call('deleteEdges', selected)
    instance.selected.set([])
  }
})

Template.tableEdges.helpers( {

    'count': function() {
      return Edges.find().count()
    },
    'rows': function() {
      console.log(Edges.findOne());
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
      return Edges.find(q, projection).fetch()
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
