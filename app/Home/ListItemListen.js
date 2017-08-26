import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import styles from "../styles/Styles";

import { CachedImage } from "react-native-img-cache";
import {
  AddPlaylistButton,
  AddPlaylistModalButton,
  ModalCreatePlaylist,
  ModalMessage
} from "../components";
import ListAll from "../playlist/ListAll";

const { width, height } = Dimensions.get("window");
const BLOCK_MARGIN = 5;
const _oldProgress = 0;
const imageDevice = width + "x" + height;

export default class ListItemListen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: null,
      imageLoading: true,
      modalVisible: false,
      modalCreateVisible: false,
      modalCreateFormVisible: false,
      modalAddContentVisible: false,
      modalMessageVisible: false,
      messageAddContent: null,
      mode: -1,
      message: null
    };
    this.handleNavButtonPress = this.handleNavButtonPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  renderSectionHeader(key) {
    let name = null;

    switch (key) {
      case "popular":
        name = "Most Popular Audio Today";
        break;
      case "recommend":
        name = "Recommendation Audio";
        break;
      case "added":
        name = "Recently Audio Add";
        break;
      case "album":
        name = "Album Audio";
        break;
      default:
        name = "Most Popular Audio Today";
        break;
    }

    return (
      <View style={[styles.sectionHeader]}>
        <Text style={styles.sectionTitle}>
          {name.toUpperCase()}
        </Text>
      </View>
    );
  }

  renderData(data) {
    return Object.keys(data).map(key => {
      return (
        <View key={key}>
          {data[key].length > 0 ? this.renderSectionHeader(key) : null}
          {data[key].length > 0 ? this.renderDataContent(data, key) : null}
        </View>
      );
    });
  }

  renderDataContent(data, key) {
    let len = data[key] ? data[key].length : height;

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data[key].map((data, index) => {
          return (
            <TouchableOpacity
              key={key + "_" + index}
              onPress={this.handleNavButtonPress.bind(this, data.id, data)}
              activeOpacity={1}
            >
              <View
                style={[
                  styles.itemContainer,
                  index + 1 == len && styles.itemPadding
                ]}
              >
                <View
                  style={[
                    this.props.screenProps.listenSizeImage,
                    styles.imageBorderRadius
                  ]}
                >
                  <CachedImage
                    style={[
                      this.props.screenProps.listenSizeImage,
                      styles.imageBorderRadius,
                      { justifyContent: "flex-end", alignItems: "flex-end" }
                    ]}
                    defaultSource={require("../common/images/common/default_thumbnail_radio.png")}
                    source={{ uri: data.image }}
                    onLoadEnd={() => {
                      this.setState({ imageLoading: false });
                    }}
                    mutable
                  />
                  {this.state.imageLoading &&
                    <ActivityIndicator
                      size="small"
                      color="black"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                      }}
                    />}
                </View>
                <View
                  style={[
                    styles.titleContainer,
                    this.props.screenProps.listenSizeText
                  ]}
                >
                  <Text
                    style={[styles.title, styles.textCenter]}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                  >
                    {data.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  handleNavButtonPress = (idChild, data) => {
    const { navigator, listAudio } = this.props;

    listAudio({
      idChild: idChild,
      showAudio: true
    });
  };

  _setModalVisible = (visible, dataId = null, mode = -1) => {
    this.setState({
      modalVisible: visible,
      id: dataId,
      modalAddContentVisible: false,
      mode: mode
    });
  };

  _setModalCreateFormVisible = visible => {
    this.setState({ modalCreateVisible: visible, modalVisible: false });
  };

  _setModalStoreVisible = (visible, message) => {
    this.timeout = setTimeout(() => {
      this.setState({
        modalCreateVisible: false,
        modalVisible: false,
        modalMessageVisible: true,
        message: message
      });
    }, 1000);

    this.timeout = setTimeout(() => {
      this.setState({
        modalCreateVisible: false,
        modalMessageVisible: false,
        message: null
      });
    }, 3000);
  };

  _setModalAddContentVisible = visible => {
    this.setState({
      modalAddContentVisible: visible,
      modalVisible: false,
      modalMessageVisible: true,
      id: null
    });

    this.timeout = setTimeout(() => {
      this.setState({
        modalAddContentVisible: false,
        modalMessageVisible: false
      });
    }, 4000);
  };

  _setCancelModalCreatePlaylist = () => {
    this.setState({
      modalMessageVisible: false,
      modalVisible: false,
      modalAddContentVisible: false,
      modalCreateVisible: false
    });
  };

  render() {
    // let id = this.state.id || null;
    // const {
    //   modalAddContentVisible,
    //   messageAddContent,
    //   modalMessageVisible,
    //   modalCreateVisible,
    //   mode,
    //   message
    // } = this.state;
    // const { addContentPlaylist } = this.props.data.list;
    //
    // return (
    //   <View style={styles.scrollContainer}>
    //     <ModalCreatePlaylist
    //       contentId={id}
    //       mode={mode}
    //       modalVisible={modalCreateVisible}
    //       onPress={this._setModalStoreVisible}
    //       onCancel={this._setCancelModalCreatePlaylist}
    //     />
    //
    //     <ModalPlaylist
    //       modalVisible={this.state.modalVisible}
    //       onPress={() => this._setModalVisible(!this.state.modalVisible, mode)}
    //     >
    //       <TouchableWithoutFeedback
    //         onPress={() =>
    //           this._setModalVisible(!this.state.modalVisible, mode)}
    //       >
    //         <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }} />
    //       </TouchableWithoutFeedback>
    //
    //       <View
    //         style={{
    //           height: "28%",
    //           backgroundColor: "#FFFFFF",
    //           position: "absolute",
    //           right: 0,
    //           bottom: 7,
    //           left: 0,
    //           alignItems: "center",
    //           margin: 7,
    //           borderRadius: 10,
    //           overflow: "hidden"
    //         }}
    //       >
    //         <AddPlaylistModalButton
    //           style={{ flexDirection: "row", paddingVertical: 5 }}
    //           onPress={() =>
    //             this._setModalCreateFormVisible(!this.state.modalCreateVisible)}
    //         >
    //           <Text>CREATE PLAYLIST</Text>
    //         </AddPlaylistModalButton>
    //
    //         <ListAll
    //           contentId={id}
    //           mode={mode}
    //           height={this.props.height}
    //           onPress={this._setModalAddContentVisible}
    //           modalVisible={this.state.modalAddContentVisible}
    //         />
    //
    //         <View
    //           style={[
    //             styles.border1pxPlaylist,
    //             {
    //               bottom: 0,
    //               position: "relative",
    //               width: this.props.width - 14,
    //               alignItems: "center"
    //             }
    //           ]}
    //         >
    //           <TouchableHighlight
    //             onPress={() => this._setModalVisible(!this.state.modalVisible)}
    //             style={{
    //               paddingVertical: 15,
    //               width: this.props.screenProps.width - 14
    //             }}
    //             underlayColor={"#ececec"}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "center",
    //                 color: "#45cbe2",
    //                 fontFamily: "RobotoCondensed-Bold"
    //               }}
    //             >
    //               CLOSE
    //             </Text>
    //           </TouchableHighlight>
    //         </View>
    //       </View>
    //     </ModalPlaylist>
    //
    //     {modalMessageVisible &&
    //       this.props.data.list.addContentPlaylist &&
    //       <ModalMessage
    //         modalVisible={modalMessageVisible}
    //         onPress={() =>
    //           this._setCancelModalCreatePlaylist(!modalMessageVisible)}
    //       >
    //         <Text style={[styles.white, { fontSize: 14 }]}>
    //           {this.props.data.list.addContentPlaylist.message}
    //         </Text>
    //       </ModalMessage>}
    //
    //     {modalMessageVisible &&
    //       this.props.data.list.addPlaylist &&
    //       <ModalMessage
    //         modalVisible={modalMessageVisible}
    //         onPress={() =>
    //           this._setCancelModalCreatePlaylist(!modalMessageVisible)}
    //       >
    //         <Text style={[styles.white, { fontSize: 14 }]}>
    //           {this.props.data.list.addPlaylist.message}
    //         </Text>
    //       </ModalMessage>}
    return (
      <View style={styles.scrollContainer}>
        {this.props.data ? this.renderData(this.props.data) : null}
      </View>
    );
  }
}
