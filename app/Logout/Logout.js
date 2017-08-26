"use strict";
import React, { Component } from "react";
import { Text, TouchableOpacity, AsyncStorage, View } from "react-native";
import FBSDK from "react-native-fbsdk";
const { LoginManager, AccessToken } = FBSDK;
import shallowCompare from "react-addons-shallow-compare";
import * as viewsActions from "./actions";

import styles from "../styles/Styles";

export class Logout extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleNavButtonPress}
        >
          <Text style={styles.white}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleNavButtonPress = e => {
    const {
      id,
      handleNavButtonPress,
      logout,
      setUserInfo,
      closeAudio,
      dataAudio
    } = this.props;
    logout();
    LoginManager.logOut();

    let dataUserInfo = {
      userInfo: null,
      isLogin: false
    };
    AsyncStorage.setItem("dataUserInfo", JSON.stringify(dataUserInfo));
    //setUserInfo(dataUserInfo);
    if (dataAudio && dataAudio.isPlaylist) {
      closeAudio();
    }

    handleNavButtonPress(e, { id });
  };
}

export default Logout;
