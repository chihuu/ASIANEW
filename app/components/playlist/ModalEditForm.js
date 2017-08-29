"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  InteractionManager,
  Modal,
  TextInput,
  Keyboard
} from "react-native";
import styles from "../../styles/Styles";
import { CheckBox } from "react-native-elements";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as viewsActions from "../../playlist/actionPlaylist";

const { width, height } = Dimensions.get("window");

export default class ModalEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name });
  }

  handlePress = event => {
    this.props.onCancel(event);
  };

  updatePlaylist = () => {
    const { updatePlaylist, item } = this.props;
    item.name = this.state.name;
    updatePlaylist(item);
  };

  render() {
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
              {"RENAME PLAYLIST".toUpperCase()}
            </Text>
          </View>

          <View style={{ marginTop: 15, marginHorizontal: 7 }}>
            <View style={[styles.row]}>
              <TextInput
                autoFocus={true}
                placeholder="Name..."
                onChangeText={name => this.setState({ name: name })}
                style={[styles.formModalInputPlaylist, { flex: 1 }]}
                autoCapitalize={"none"}
                keyboardType={"default"}
                value={this.state.name}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
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
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#ccc",
                  bottom: 0,
                  position: "relative",
                  left: 0,
                  right: 0,
                  width: "50%",
                  alignItems: "center"
                }
              ]}
            >
              <TouchableHighlight
                onPress={this.handlePress}
                style={[
                  {
                    width: "100%",
                    justifyContent: "center",
                    paddingVertical: 10
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
                  width: "50%",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderColor: "#ccc"
                }
              ]}
            >
              {name && name.length > 0 && name != ""
                ? <TouchableHighlight
                    onPress={this.updatePlaylist.bind(this)}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      paddingVertical: 10
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
                      SAVE
                    </Text>
                  </TouchableHighlight>
                : <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      paddingVertical: 10
                    }}
                  >
                    <Text
                      style={[
                        {
                          textAlign: "center",
                          color: "#000000",
                          fontFamily: "RobotoCondensed-Bold"
                        }
                      ]}
                    >
                      SAVE
                    </Text>
                  </View>}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
