import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import styles from "../../styles/Styles";

import shallowCompare from "react-addons-shallow-compare";

export default class ModalPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handlePress = event => {
    this.props.onPress(event);
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={this.handlePress}
      >
        {this.props.children}
      </Modal>
    );
  }
}
