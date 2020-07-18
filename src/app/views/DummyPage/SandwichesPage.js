import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { canUseDOM } from 'exenv';

import { DEMO_DATA_ACTIONS } from 'app/core/store/actions/demoDataAction';
import { getDemoDataStateData } from 'app/core/store/selectors/demoDataSelector';

function SandwichesPage ({ demoData, fetchDemoData }) {
  if (!canUseDOM) {
    fetchDemoData();
  }

  useEffect(() => {
    console.log('demoData', demoData);
  }, [demoData]);

  return (
    <Fragment>
      <h2>Sandwiches</h2>
      <div>{ JSON.stringify(demoData) }</div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  demoData: getDemoDataStateData(state)
});

const mapDispatchToProps = dispatch => ({
  fetchDemoData: () => dispatch (DEMO_DATA_ACTIONS.fetchDemoData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SandwichesPage);