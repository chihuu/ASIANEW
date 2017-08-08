import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  InteractionManager,
  NetInfo,
  Alert
} from 'react-native';
import { connect, Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore()
const RouterWithRedux = connect()(Router);

import Home from './Home';
import Menu from './Menu';
import Register from './components/Register';
import Login from './components/Login';
import Login2 from './components/Login2';
import Login3 from './components/Login3';
import navBarButtons from './components/NavBarButtons';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
} from 'react-native-router-flux';
import Error from './components/Error';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import EchoView from './components/EchoView';
import Button from 'react-native-button';
import MessageBar from './components/MessageBar';
import Search from './components/Search';
import { Authorization, General, Messages } from './common';
import SideMenu from './models/SideMenu';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


const getSceneStyle = () => ({
  backgroundColor: 'white',
  shadowOpacity: 1,
  shadowRadius: 3,
});

class App extends Component {

  state = {
      loading: true
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);

    InteractionManager.runAfterInteractions(() => {
      this.setState({loading: false})
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    if(!isConnected) {
      Actions.error(Messages.ERROR_NETWORK);
    }
  };

  render() {
    if (this.state.loading) {
      return <View><Text>Loading...</Text></View>;
    }

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene overlay>
            <Scene key="messageBar" component={MessageBar} />
            <Scene key="modal" modal hideNavBar initial>
              <Scene key="lightbox" lightbox leftButtonTextStyle={{color: 'green'}} backButtonTextStyle={{color: 'red'}} initial>
                <Scene key="root" hideNavBar hideTabBar>

                  <Scene key="drawer" drawer contentComponent={Menu} open={false} initial title="Logo">
                    <Scene key='drawerChildrenWrapper'>
                      <Scene key="home" component={Home} {...navBarButtons} />
                      <Scene key="search" component={Search} />
                    </Scene>
                  </Scene>

                </Scene>
                <Scene key="error" component={Error}/>
              </Scene>
              <Scene key="login">
                <Scene key="loginModal" component={Login} title="Login"
                       onEnter={()=>console.log('onEnter')}
                       onExit={()=>console.log('onExit')}
                       leftTitle="Cancel" onLeft={Actions.pop}/>
                <Scene
                  key="loginModal2"
                  component={Login2}
                  title="Login2"
                  backTitle="Back"
                  panHandlers={null}
                  duration={1}
                />
                <Scene
                  key="loginModal3"
                  hideNavBar
                  component={Login3}
                  title="Login3"
                  panHandlers={null}
                  duration={1}
                />
              </Scene>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }

}

export default App;
