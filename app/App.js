import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  InteractionManager
} from 'react-native';
import Launch from './components/Launch';
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
import Home from './components/Home';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import EchoView from './components/EchoView';
import Button from 'react-native-button';
import MessageBar from './components/MessageBar';
import Search from './components/Search';
import Authorization from './common/Authorization';
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

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};
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
    //SideMenu.getMoviesFromApi();
    let menu = SideMenu.getMoviesFromApi().done();
console.log(menu);
    InteractionManager.runAfterInteractions(() => {
      this.setState({loading: false})
    });
  }

  // getMoviesFromApi() {
  //    const authorization = Authorization.generate();
  //
  //    return fetch('http://ottapi.com/v1.7/ntm/home/menu', {
  //                                   method: 'GET',
  //                                   headers: {
  //                                     'DateTime': authorization.DateTime,
  //                                     'RequestToken': authorization.RequestToken
  //                                   }
  //                                 })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         return responseJson;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //     });
  //  }

  render() {
    if (this.state.loading) {
      return <View><Text>Loading...</Text></View>;
    }
console.log(this.props);
    return (
      <Router createReducer={reducerCreate} tintColor='red' getSceneStyle={getSceneStyle}>
        <Scene overlay>
          <Scene key="messageBar" component={MessageBar} />
          <Scene key="modal" modal hideNavBar initial>
            <Scene key="lightbox" lightbox leftButtonTextStyle={{color: 'green'}} backButtonTextStyle={{color: 'red'}} initial>
              <Scene key="root" hideNavBar hideTabBar>

                <Scene key="drawer" drawer contentComponent={TabView} open={false} initial title="Logo">
                  <Scene key='drawerChildrenWrapper'>
                    <Scene key="launch" component={Launch} {...navBarButtons} />
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
      </Router>
    );
  }

}

export default App;
