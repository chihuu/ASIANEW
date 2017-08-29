"use strict";
import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
//import shallowCompare from 'react-addons-shallow-compare';

class Button extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.handlePress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }

  handlePress = event => {
    this.props.onPress(event);
  };
}

export default Button;
