"use strict";
import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

class AddPlaylistButton extends Component {
  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.handlePress}>
        <Image
          style={[
            {
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: 20,
              height: 20,
              marginBottom: 5,
              marginRight: 5
            }
          ]}
          source={require("../../common/images/common/addPlaylist.png")}
        />
        {this.props.children}
      </TouchableOpacity>
    );
  }

  handlePress = event => {
    this.props.onPress(event);
  };
}

export default AddPlaylistButton;
