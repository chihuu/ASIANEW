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

export default class ModalMessage extends Component {
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
        <View
          style={{
            height: "10%",
            backgroundColor: "rgba(0, 0, 0, .8)",
            position: "absolute",
            right: 0,
            top: "30%",
            left: 0,
            padding: 7,
            margin: 7,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
          }}
        >
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
