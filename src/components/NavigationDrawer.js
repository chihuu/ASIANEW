import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

import TabView from './TabView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {
  render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref='navigation'
        type='static'
        open={state.open}
        onOpen={() => Actions.refresh({key: state.key, open: true})}
        onClose={() => Actions.refresh({key: state.key, open: false})}
        content={<TabView />}
        captureGestures
        tapToClose={true}
        openDrawerOffset={100}
        panCloseMask={0.8}
        panThreshold={150}
        negotiatePan={true}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
