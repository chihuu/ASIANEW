import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  InteractionManager,
  AsyncStorage,
  NetInfo,
  Dimensions,
  Alert
} from "react-native";
import { connect, Provider } from "react-redux";
import configureStore from "./store/configureStore";
const store = configureStore();
const RouterWithRedux = connect()(Router);

import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Register from "./Register/Register";
import Login2 from "./components/Login2";
import Login3 from "./components/Login3";
import navBarButtons from "./components/NavBarButtons";
import { appLayoutAndroid } from "./common/config";
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst
} from "react-native-router-flux";
import Error from "./components/Error";
import TabView from "./components/TabView";
import TabIcon from "./components/TabIcon";
import EchoView from "./components/EchoView";
import Button from "react-native-button";
import MessageBar from "./components/MessageBar";
import Search from "./components/Search";
import { Authorization, General, Messages } from "./common";
import SideMenu from "./models/SideMenu";
import { appLayout } from "./common/config";
import styles from "./styles/Styles";
const { height, width } = Dimensions.get("window");
const _layout = appLayout(width, height);

class App extends Component {
  state = {
    loading: true,
    isLogin: false,
    userInfo: null
  };

  componentDidMount() {
    this.getUserInfo().done();
    NetInfo.isConnected.addEventListener(
      "change",
      this._handleConnectionChange
    );

    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "change",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = isConnected => {
    if (!isConnected) {
      Actions.error(Messages.ERROR_NETWORK);
    }
  };
  async getUserInfo() {
    return await AsyncStorage.getItem("dataUserInfo").then(dataJson => {
      if (dataJson) {
        let data = JSON.parse(dataJson);
        this.setState({
          isLogin: data.isLogin,
          userInfo: data.userInfo
        });
      }
    });
  }

  setUserInfo = userInfo => {
    this.setState(userInfo);
  };

  render() {
    console.log(this.props);
    const { isLogin, userInfo } = this.state;

    if (this.state.loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene overlay>
            <Scene key="messageBar" component={MessageBar} />
            <Scene key="modal" modal hideNavBar initial>
              <Scene
                key="lightbox"
                lightbox
                leftButtonTextStyle={{ color: "green" }}
                backButtonTextStyle={{ color: "red" }}
                initial
              >
                <Scene key="root" hideNavBar hideTabBar>
                  <Scene
                    key="drawer"
                    drawer
                    contentComponent={Menu}
                    open={false}
                    initial
                    title="Logo"
                    userInfo={userInfo}
                    setUserInfo={this.setUserInfo}
                    isLogin={isLogin}
                  >
                    <Scene key="drawerChildrenWrapper">
                      <Scene
                        key="home"
                        component={Home}
                        {...navBarButtons}
                        _layout={_layout}
                        userInfo={userInfo}
                        setUserInfo={this.setUserInfo}
                      />
                      <Scene key="search" component={Search} />
                    </Scene>
                  </Scene>
                </Scene>
                <Scene key="error" component={Error} />
              </Scene>
              <Scene key="login">
                <Scene
                  key="loginModal"
                  component={Login}
                  title="Login"
                  onEnter={() => console.log("onEnter")}
                  onExit={() => console.log("onExit")}
                  leftTitle="Cancel"
                  onLeft={Actions.pop}
                />
                <Scene
                  key="register"
                  component={Register}
                  title="Register"
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
