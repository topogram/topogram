import React, { PropTypes } from 'react'

import TopogramsLayout from './TopogramsLayout.jsx'

import TopogramList from '/imports/client/ui/components/topograms/TopogramList.jsx'
//import TopogramAddForm from '/imports/client/ui/components/topograms/TopogramAddForm.jsx'

// define and export our Welcome component
export default class TopogramsPrivateList extends React.Component {

  componentDidMount() {
    this.props.loadPrivateTopograms()

  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.user.isLoggedIn !== nextProps.user.isLoggedIn);
  //   if (this.props.user.isLoggedIn !== nextProps.user.isLoggedIn)
  // }

  componentWillUnmount() {
    this.props.stopTopogramsSubscription()
  }

  static propTypes = {
    router : PropTypes.object.isRequired,
    loadPrivateTopograms : PropTypes.func.isRequired,
    stopTopogramsSubscription : PropTypes.func.isRequired,
    topograms : PropTypes.array.isRequired
  }

  render() {

    const {
      user,
      router,
      promptSnackbar,
      topograms
    } = this.props

    return (
      <TopogramsLayout
        user={user}
        router={router}
        >

        <TopogramList
          topograms={topograms}
          router={router}
          title="My Topograms"
          showFilters={false}
        />
      </TopogramsLayout>
    )
  }
}
