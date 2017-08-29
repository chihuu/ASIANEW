import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Carousel from "react-native-looped-carousel";
import Button from "react-native-button";
import { MessageBarAlert, MessageBarManager } from "react-native-message-bar";
import DataListItem from "./DataListItem";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true
    };
  }

  render() {
    return (
      <View>
        <DataListItem data={this.props.data} size={this.props._layout.size} />
      </View>
    );
  }
}
