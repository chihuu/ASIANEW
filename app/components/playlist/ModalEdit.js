import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import styles from "../../styles/Styles";

export default class ModalEdit extends Component {
  handlePress = event => {
    this.props.onPress(event);
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => this.handlePress()}
      >
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View
            style={{
              height: "80%",
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            }}
          />
        </TouchableWithoutFeedback>

        <View
          style={{
            height: "20%",
            backgroundColor: "#FFFFFF",
            position: "absolute",
            right: 0,
            top: 0,
            left: 0,
            alignItems: "flex-start"
          }}
        >
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
