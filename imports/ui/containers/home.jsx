import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';

import { loadHomeTopograms, TOPOGRAMS_SUB } from '/imports/client/actions/topograms';

import { HomePageComponent } from '/imports/pages/home';

const mapStateToProps = state => ({
    ready: state.topograms.ready,
    items: state.topograms.topograms,
  })

const mapDispatchToProps = dispatch => ({
  loadTopograms: () => dispatch(loadHomeTopograms()),
  stopTopogramsSubscription: () => dispatch(stopSubscription(HOME_POSTS_SUB)),
});


export const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);
