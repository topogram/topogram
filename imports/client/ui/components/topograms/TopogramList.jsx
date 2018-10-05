import React, { PropTypes } from 'react'
import Toggle from 'material-ui/Toggle'
import SubHeader from 'material-ui/Subheader'
import { GridList } from 'material-ui/GridList'
import TopogramListItem from './TopogramListItem.jsx'
import ui from 'redux-ui'
import { defineMessages, injectIntl } from 'react-intl'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
const messages = defineMessages({
  hint : {
    'id': 'queryBox.hint',
    'defaultMessage': 'Search for a Map',
    'message': ''
  },
  label : {
    'id': 'queryBox.label',
    'defaultMessage': 'Map search',
    'message': ''
  }
})

@ui()
class TopogramList extends React.Component {

  constructor(props) {
    super(props)
    this.state = { anonymousOnly : false ,
      currentValue : null
      //, pageTopos : 1
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    showFilters : PropTypes.bool.isRequired,
    topograms: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }

  handleOnToggle = () => {
    this.setState({ anonymousOnly : !this.state.anonymousOnly })
  }




  handlePageTopoUp = ({numbTopopages}) => {
    console.log(this.props.pageTopos);
    console.log(this.numbTopopages);
  if (this.props.pageTopos < numbTopopages) {
    valuepageTopos=this.props.pageTopos
    valuepageTopos+=1
   this.props.updateUI({
     pageTopos :valuepageTopos
   })
  }}

  handlePageTopoDown = (numbTopopages) => {
  if (pageTopos > 1) {
  valuepageTopos=this.props.pageTopos
  valuepageTopos-=1
  this.props.updateUI({
    pageTopos :valuepageTopos
    })
  }}



  handleNewRequest = ({value, text, topogram}, index) => {
    //const {selectElement} = this.props
    //console.log("VALUE",value)
    //console.log("TEXT",text)
    //console.log("topogram",topogram)

  const {win} = window.open(`/topograms/${topogram._id}`, '_blank');

  this.setState({ numbTopopages : Math.ceil(topogramItems.length/128)})
console.log({numbTopopages});
console.log(this.props);

  }




  render() {

    const { formatMessage } = this.props.intl
    const { pageTopos } = this.props.ui

    //this.props.updateUI({pageTopos:1})
    const { anonymousOnly } = this.state
    const { showFilters, title, topograms, numbTopopages } = this.props

    const dataSource = topograms
      .filter(d => anonymousOnly ? d.userId === null : true)
      .sort( (a, b) => b.createdAt - a.createdAt)
      .map( n => (
        {
          value : n.title.substr(0, 20),
          text : n.title.substr(0, 20),
          topogram : n
        }
      ))
    //console.log("dataSource",dataSource);

    const topogramItems = topograms
      .filter(d => anonymousOnly ? d.userId === null : true)
      .sort( (a, b) => b.createdAt - a.createdAt)
      .map( topogram => (
        <TopogramListItem
          key={ topogram._id }
          topogramId={ topogram._id }
          topogramTitle={ topogram.title }
          author={topogram.author &&  topogram.author.username ? topogram.author.username : null}
          topogramSharedPublic={topogram.sharedPublic}
          router={this.props.router}
          lastModified={ topogram.createdAt }
        />
      ))







    return (
      <div>
      <AutoComplete
        ref="queryBox"
        filter={AutoComplete.fuzzyFilter}
        dataSource={dataSource}
        maxSearchResults={70}
        fullWidth={true}
        style={this.props.style}
        menuProps={{desktop:true}}
        hintText={formatMessage(messages.hint)}
        floatingLabelText={formatMessage(messages.label)}
        onNewRequest={this.handleNewRequest}
        // onUpdateInput={this.handleUpdateInput}
      />

      <section
        className="home-public-list"
        style={{ width : '80vw', margin : '0 auto 1em auto' }}
      >
        <SubHeader>{title}</SubHeader>
        {
          showFilters ?
            <div style={{ maxWidth: 250, paddingBottom : '1em' }}>
              <Toggle
                label="Show only anonymous"
                toggled={anonymousOnly}
                onToggle={this.handleOnToggle}
              />
            </div>
            :
            null
        }
        {
          topogramItems.length > 128 ?
          <div>
            <GridList
              cellHeight={240}
              cols={3}
            >
              {topogramItems.slice(0*pageTopos,128*pageTopos)}
            </GridList>
            <RaisedButton
            label="previous"
            primary={true}
            onClick={this.handlePageTopoDown}
            />
            <RaisedButton
            label="next"
            primary={true}
            onClick={this.handlePageTopoUp}
            />
            <p>{pageTopos}/{this.numbTopopages} </p>
            </div>
            :
            topogramItems.length ?
            <GridList
              cellHeight={240}
              cols={3}
            >
              {topogramItems}
            </GridList>
            :
            <p>No topograms yet!</p>
        }
      </section>
      </div>
    )
  }
}

TopogramList.propTypes = {
  // promptSnackbar: PropTypes.func,
  topogram : PropTypes.object,
  //nodes : PropTypes.array,
  // edges : PropTypes.array,
  // style : PropTypes.object,
  // intl : PropTypes.shape({
  //   formatMessage : PropTypes.func
  // })
}

TopogramList.defaultProps = {
  topogram : {},
  nodes : [],
  edges : [],
  pageTopos: 1
}

export default injectIntl(TopogramList)
