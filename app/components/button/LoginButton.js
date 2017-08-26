"use strict";
import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/Styles";
//import shallowCompare from 'react-addons-shallow-compare';
import { Actions } from "react-native-router-flux";
export default class LoginButton extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    return (
      <View style={[styles.loginButton]}>
        <TouchableOpacity onPress={Actions.login}>
          <Text style={[styles.white, styles.textBtnLogin]}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
