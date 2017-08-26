"use strict";
import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  Image
} from "react-native";
import { CachedImage } from "react-native-img-cache";

class AddPlaylistModalButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={"#ececec"}
        style={this.props.style}
        onPress={this.handlePress}
      >
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Image
            style={[{ width: 29, height: 29, marginRight: 7 }]}
            source={require("../../common/images/common/playlistAdd.png")}
            mutable
          />
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  }

  handlePress = event => {
    this.props.onPress(event);
  };
}

export default AddPlaylistModalButton;
