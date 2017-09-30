import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';

import { loadHomeTopograms, TOPOGRAMS_PUBLIC_SUB } from '/imports/client/actions/topograms';

import { HomeComponent } from '/imports/client/ui/pages/HomeComponent';

const mapStateToProps = state => ({
    ready: state.topogramsPublic.ready,
    topograms: state.topogramsPublic.topograms
  })

const mapDispatchToProps = dispatch => ({
  loadTopograms: () => dispatch(loadHomeTopograms()),
  stopTopogramsSubscription: () => dispatch(stopSubscription(TOPOGRAMS_PUBLIC_SUB)),
});


export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
