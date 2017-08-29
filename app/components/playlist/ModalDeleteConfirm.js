"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  InteractionManager,
  Modal,
  TextInput,
  Keyboard
} from "react-native";
import styles from "../../styles/Styles";
import { CheckBox } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class ModalDeleteConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      audioChecked: true,
      videoChecked: false,
      name: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: null });
  }

  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _createPlaylist() {
    this._setModalVisible(!this.state.modalVisible);
  }

  componentWillUnmount() {
    this.setState({ name: null });
  }

  _videoRadioChecked() {
    const { audioChecked } = this.state;

    this.setState({
      audioChecked: false,
      videoChecked: true
    });
  }

  _audioRadioChecked() {
    const { audioChecked } = this.state;

    this.setState({
      audioChecked: true,
      videoChecked: false
    });
  }

  handlePress = event => {
    this.props.onCancel(event);
  };

  addPlaylist() {
    const { receiveAddPlaylist, userInfo, onPress, modalVisible } = this.props;
    const { name, audioChecked } = this.state;

    let mode = 0;
    const contentId = 0;

    if (name && userInfo.accessToken) {
      receiveAddPlaylist(userInfo.accessToken, contentId, name, mode);
      onPress(modalVisible);
    }
  }

  onDelete = () => {
    const { playlistId, onDelete } = this.props;
    onDelete(playlistId);
  };

  render() {
    const {
      sizeContainer,
      listenSizeContainer,
      sizeImage,
      listenSizeImage,
      sizeText,
      mode
    } = this.props;
    const { name } = this.state;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={this.handlePress}
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
            height: "20%",
            backgroundColor: "#FFFFFF",
            position: "absolute",
            right: 0,
            top: "30%",
            left: 0,
            marginHorizontal: 40,
            borderRadius: 10,
            overflow: "hidden",
            zIndex: 500
          }}
        >
          <View style={[styles.row]}>
            <Text style={[styles.playlistHeaderText, styles.textCenter]}>
              {"NOTICE".toUpperCase()}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              { padding: 7, alignItems: "center", justifyContent: "center" }
            ]}
          >
            <Text style={[styles.textCenter]}>
              Are you sure you want to delete this playlist?
            </Text>
          </View>

          <View
            style={[
              styles.row,
              {
                alignItems: "center",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: 0
              }
            ]}
          >
            <View
              style={[
                {
                  bottom: 0,
                  position: "relative",
                  left: 0,
                  right: 0,
                  width: "50%",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#ccc"
                }
              ]}
            >
              <TouchableHighlight
                onPress={() => this.handlePress()}
                style={[
                  {
                    width: "100%",
                    justifyContent: "center",
                    paddingVertical: 15
                  }
                ]}
                underlayColor={"#ececec"}
              >
                <Text
                  style={[
                    styles.black,
                    { textAlign: "center", fontFamily: "Roboto Condensed" }
                  ]}
                >
                  CANCEL
                </Text>
              </TouchableHighlight>
            </View>

            <View
              style={[
                {
                  bottom: 0,
                  position: "relative",
                  left: 0,
                  right: 0,
                  width: "50%",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderColor: "#ccc"
                }
              ]}
            >
              <TouchableHighlight
                onPress={() => this.onDelete()}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  paddingVertical: 15
                }}
                underlayColor={"#ececec"}
              >
                <Text
                  style={[
                    styles.black,
                    {
                      textAlign: "center",
                      color: "#45cbe2",
                      fontFamily: "RobotoCondensed-Bold"
                    }
                  ]}
                >
                  DELETE
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
