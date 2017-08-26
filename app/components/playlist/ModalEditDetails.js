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

export default class ModalEditDetails extends Component {
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
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            height: "28%",
            backgroundColor: "#FFFFFF",
            position: "absolute",
            right: 0,
            bottom: 7,
            left: 0,
            alignItems: "flex-start",
            marginHorizontal: 7,
            borderRadius: 10,
            overflow: "hidden",
            zIndex: 500
          }}
        >
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
