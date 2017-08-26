"use strict";

import React, { PropTypes, Component } from "react";
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

export class ModalCreatePlaylist extends Component {
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
    const {
      receiveAddPlaylist,
      userInfo,
      onPress,
      modalVisible,
      contentId
    } = this.props;
    const { name, audioChecked } = this.state;

    let mode = audioChecked ? 0 : 1;
    if (name && userInfo.accessToken) {
      receiveAddPlaylist(userInfo.accessToken, contentId, name, mode);
      onPress(modalVisible);
    }
  }

  // processPlaylistCreate(message) {
  //   const {modalVisible, onPress} = this.props;
  //   onPress(modalVisible, message);
  // }

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
              {"CREATE PLAYLIST".toUpperCase()}
            </Text>
          </View>

          <View style={{ padding: 10 }}>
            <View>
              <View style={[styles.row]}>
                <TextInput
                  autoFocus={true}
                  placeholder="Name..."
                  onChangeText={name => this.setState({ name: name })}
                  style={[styles.formModalInputPlaylist, { flex: 1 }]}
                  autoCapitalize={"none"}
                  keyboardType={"default"}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>

            <View style={[styles.formModalGroup, { width: 0, height: 0 }]}>
              {mode == -1
                ? <View
                    style={[
                      styles.row,
                      { alignItems: "center", justifyContent: "center" }
                    ]}
                  >
                    <CheckBox
                      title="Audio"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={this.state.audioChecked}
                      onPress={this._audioRadioChecked.bind(this)}
                      containerStyle={styles.formModalCheckbox}
                      checkedColor="#45cbe2"
                    />

                    <CheckBox
                      title="Video"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={this.state.videoChecked}
                      onPress={this._videoRadioChecked.bind(this)}
                      containerStyle={styles.formModalCheckbox}
                      checkedColor="#45cbe2"
                    />
                  </View>
                : <View
                    style={[
                      styles.row,
                      { alignItems: "center", justifyContent: "center" }
                    ]}
                  >
                    <CheckBox
                      title="Audio"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={true}
                      containerStyle={styles.formModalCheckbox}
                      onPress={this._audioRadioChecked.bind(this)}
                      checkedColor="#45cbe2"
                    />

                    <CheckBox
                      title="Video"
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={mode == 1 ? true : false}
                      containerStyle={styles.formModalCheckbox}
                      onPress={this._videoRadioChecked.bind(this)}
                      checkedColor="#45cbe2"
                    />
                  </View>}
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
                onPress={this.handlePress}
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
                  width: "50%",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderColor: "#ccc"
                }
              ]}
            >
              {name && name.length > 0 && name != ""
                ? <TouchableHighlight
                    onPress={this.addPlaylist.bind(this)}
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
                      paddingVertical: 15
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

const mapStateToProps = state => {
  return {
    data: state.views
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      receiveAddPlaylist: viewsActions.receiveAddPlaylistApi,
      receivePlaylistAddContent: viewsActions.receivePlaylistAddContentApi
      //destroyAudio: viewsActions.destroyAudioApi
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ModalCreatePlaylist
);
