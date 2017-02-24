import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';

import { loadHomeTopograms, TOPOGRAMS_SUB } from '/imports/client/actions/topograms';

import { HomeComponent } from '/imports/ui/pages/HomeComponent';

const mapStateToProps = state => ({
    ready: state.topograms.ready,
    topograms: state.topograms.topograms,
  })

const mapDispatchToProps = dispatch => ({
  loadTopograms: () => dispatch(loadHomeTopograms()),
  stopTopogramsSubscription: () => dispatch(stopSubscription(HOME_POSTS_SUB)),
});


export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
