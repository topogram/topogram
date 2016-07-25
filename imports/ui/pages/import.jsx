import React from 'react'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
// fix material-ui select bug
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import RaisedButton from 'material-ui/RaisedButton';
import { Card, SelectField, MenuItem } from 'material-ui';

import { makeNode, makeEdge } from '../../api/modelsHelpers.js'

import ImportDataForm from '../components/import/ImportDataForm.jsx'
import ImportEdgesFields from '../components/import/ImportEdgesFields.jsx'
import ImportNodesFields from '../components/import/ImportNodesFields.jsx'
import ImportElementsForm from '../components/import/ImportElementsForm.jsx'
import FlashMessages from '../components/flashMessages/FlashMessages.jsx'

const ElementTypeSelector = React.createClass({
  getInitialState(){
    return {
      value: ''
    }
  },
  _handleChange(e, k, type){
    this.setState({value : type})
    this.props.handleChange(type)
  },
  render() {
    return (
      <SelectField
        floatingLabelText='select type'
        ref='selectField'
        value={this.state.value}
        onChange={this._handleChange}
      >
        <MenuItem value='nodes' primaryText="Nodes" />
        <MenuItem value='edges' primaryText="Edges" />
      </SelectField>
    )
  }
})

const ImportDataPage = React.createClass({
  getInitialState(){
    return {
      elementType : null,
      dataIsReady : false,
      CSVFields : [],
      parsedCSVData : {},
      fieldMapping : {}
    }
  },
  _setElementType(type){
    console.log(type);
    this.setState({ elementType : type })
  },
  _setDataState(dataState, CSVfields, parsedCSVData){
    console.log(dataState, CSVfields, parsedCSVData)
    this.setState({
      dataIsReady : dataState,
      CSVFields : CSVfields,
      parsedCSVData : parsedCSVData
    })
  },
  _submitData(e){
    e.preventDefault();
    console.log(this.refs)

    // map selected fields
    let mapping = {}
    Object.keys(this.refs.elementsFields.refs).forEach( k => {
      if (k == "optionalFields")
        Object.keys(this.refs.elementsFields.refs.optionalFields.refs).forEach(optK =>
          mapping[optK] = this.refs.elementsFields.refs.optionalFields.refs[optK].state.value
        )
      else mapping[k] = this.refs.elementsFields.refs[k].state.value
    })
    this.setState({ fieldMapping : mapping})
    console.log(mapping)

    // check for missing values in mapping
    if ( this.state.elementType == 'edges' ) {
        // check if src and target have been set correctly
        if ( !mapping.target || !mapping.source || ( mapping.target == mapping.source ) ) {
            this.refs.flash.sendError( 'Please define source and target' )
            return
        }
    }
    else if ( this.state.elementType == 'nodes' ) {
      if ( !mapping.id ) {
          this.refs.flash.sendError( 'Please define ID field for your nodes' )
          return
      }
    }
    // TODO Verify optional fields

    // parse data
    let topogramId = FlowRouter.getParam('topogramId')
    var parsedData = this.state.parsedCSVData.data.map((d) => {

      // parse csv data
      var cleanData = {}
      for (let key in mapping) {
        let csvKey = mapping[key]  // proper row name from csv
        cleanData[key] = d[csvKey]
      }

      // create nodes and edges
      if ( this.state.elementType == 'nodes' )
        return makeNode(topogramId, cleanData, d, Meteor.userId())
      else if ( this.state.elementType == 'edges' )
        return makeEdge(topogramId, cleanData, d, Meteor.userId())

    })
    console.log(parsedData)

    // save data
    // TODO : display loader
    if ( this.state.elementType == 'edges' ) {
        Meteor.call( 'batchInsertEdges', parsedData, (err, edges) => {
          if (err) throw err
          console.log(err, edges)
          this.refs.flash.sendSuccess( 'Success ! : ' + edges.length + ' edges created.' )
          FlowRouter.go( '/topograms/' + topogramId + '/lab' )
        })
    } else if ( this.state.elementType == 'nodes' ) {
        Meteor.call( 'batchInsertNodes', parsedData, (err, nodes) => {
          if (err) throw err
          console.log(nodes)
          this.refs.flash.sendSuccess( 'Success ! : ' + nodes.length + ' nodes created.' )
          FlowRouter.go( '/topograms/' + topogramId + '/lab' )
        })
    }
  },
  render() {
    let typeSelector,
      element,
      submitButton;

    if (this.state.dataIsReady)
      typeSelector = <ElementTypeSelector
        ref='elementSelector'
        handleChange={this._setElementType}
        />

    let importNodes = () => (
      <ImportElementsForm
        handleSubmit={this._submitData}
        title="Nodes"
        subtitle="Match field names from your CSV"
        >
        <ImportNodesFields
          fields={this.state.CSVFields}
          ref='elementsFields'
        />
      </ImportElementsForm>
    )

    let importEdges = () => (
      <ImportElementsForm
        handleSubmit={this._submitData}
        title="Edges"
        subtitle="Match field names from your CSV"
        >
        <ImportEdgesFields
          fields={this.state.CSVFields}
          ref='elementsFields'
        />
      </ImportElementsForm>
    )

    if (this.state.elementType == "nodes") element = importNodes()
    else if (this.state.elementType == "edges") element = importEdges()

    let selector;
    if (this.state.dataIsReady) {
      selector = <Card>
        {typeSelector}
        {element}
        {submitButton}
      </Card>
    }

    return (
      <section>
        <h1>Create a new network</h1>
        <p>I don't have data.</p>
        <RaisedButton
          href="/topograms/{topogramId}"
          label="Skip this step"
        />

        <p>You can import network data (nodes and edges) or generate it using our data tools. Read more in the <a href="http://topogram.io/HowItWorks" target="_blank">documentation</a></p>

        <ImportDataForm
          ref='importDataForm'
          onDataChange={this._setDataState}
        />

        {selector}

        <FlashMessages
          ref='flash'
        />

      </section>
    )
  }
})

export default ImportDataPage
