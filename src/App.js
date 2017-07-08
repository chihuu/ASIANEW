import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import Home from './Home';
import Card from './Card';
import NavigationDrawer from './components/NavigationDrawer';

const ConnectedRouter = connect()(Router)
const store = configureStore()

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='drawer' component={NavigationDrawer} open={false} title='Home Title'>
      <Scene key='drawerChildrenWrapper'>
        <Scene key='home' component={Home} rightTitle='Search' rightButtonImage={source} />
        <Scene key='card' component={Card} />
      </Scene>
    </Scene>
  </Scene>
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={Scenes}/>
      </Provider>
    )
  }
}
