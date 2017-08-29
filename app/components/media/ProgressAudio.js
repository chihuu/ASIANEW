import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  Slider,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Dimensions,
  Image
} from "react-native";
import styles from "../../styles/Styles";
import { Icon } from "react-native-elements";
import { Config } from "../../../common/config";
import {
  SideMenuLink,
  AddPlaylistButton,
  AddPlaylistModalButton,
  ModalPlaylist,
  ModalCreatePlaylist,
  ModalMessage,
  Button
} from "../";
import ListAll from "../../scenes/playlist/ListAll";

let { width } = Dimensions.get("window");
let radiusOfHolder = 8;
let radiusOfActiveHolder = 10;

export default class ProgressAudio extends Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.onForward = this.onForward.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onRandom = this.onRandom.bind(this);
    this.onRepeat = this.onRepeat.bind(this);
    this.state = {
      lineX: new Animated.Value(0),
      slideX: new Animated.Value(0),
      width: 0,
      modalMessage: false,
      modalVisible: false,
      modalCreateVisible: false,
      modalCreateFormVisible: false,
      modalAddContentVisible: false,
      modalMessageVisible: false,
      messageAddContent: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.moving) {
      this.state.slideX.setValue(this.computeScreenX(nextProps.percent));
    }
  }

  computeScreenX(percent) {
    return percent * this.state.width / 100;
  }

  componentWillMount() {
    this.holderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        let { slideX } = this.state;
        this.setState({ moving: true });
        slideX.setOffset(slideX._value);
        slideX.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        let totalX = this.state.slideX._offset + gestureState.dx;
        let newPercent = totalX / this.state.width * 100;
        this.notifyPercentChange(newPercent, true);
        Animated.event([null, { dx: this.state.slideX }])(e, gestureState);
      },
      onPanResponderRelease: (e, gesture) => {
        this.state.slideX.flattenOffset();
        let newPercent = this.state.slideX._value / this.state.width * 100;
        this.setState({ moving: false });
        this.notifyPercentChange(newPercent, this.props.paused);
      }
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  notifyPercentChange(newPercent, paused) {
    let { onNewPercent } = this.props;
    if (onNewPercent instanceof Function) {
      onNewPercent(newPercent, paused);
    }
  }

  _onLayout = event => {
    this.setState({
      width: event.nativeEvent.layout.width - radiusOfHolder * 2
    });
  };

  getHolderStyle() {
    let { moving, slideX, width } = this.state;
    let { isLive, submitted } = this.props;

    if (width > 0) {
      var interpolatedAnimation = slideX.interpolate({
        inputRange: [0, width],
        outputRange: [0, width],
        extrapolate: "clamp"
      });
      return [
        styles.holder,
        moving && styles.activeHolder,
        { transform: [{ translateX: interpolatedAnimation }] }
      ];
    } else {
      return [styles.holder];
    }
  }

  onLinePressed(e) {
    let newPercent = e.nativeEvent.locationX / this.state.width * 100;
    this.notifyPercentChange(newPercent, false);
  }

  formatSeconds(duration) {
    var hours =
      Math.floor(duration / 3600) < 10
        ? ("00" + Math.floor(duration / 3600)).slice(-2)
        : Math.floor(duration / 3600);
    var minutes = ("00" + Math.floor(duration % 3600 / 60)).slice(-2);
    var seconds = ("00" + duration % 3600 % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  changeLink = () => {
    const { changeLinkAudio, albumName } = this.props;

    changeLinkAudio({
      submitted: false,
      currentItemPlay: 0,
      isCurrentLive: true,
      albumName: albumName
    });
  };

  onForward() {
    const {
      dataItems,
      currentItemPlay,
      changeLinkAudio,
      albumName
    } = this.props;

    if (dataItems.length == parseInt(currentItemPlay) + 1) {
      return false;
    }

    changeLinkAudio({
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) + 1].link,
      songName: dataItems[parseInt(currentItemPlay) + 1].name,
      albumName: albumName,
      currentItemPlay: parseInt(currentItemPlay) + 1,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  }

  onPrev() {
    const {
      dataItems,
      currentItemPlay,
      changeLinkAudio,
      albumName
    } = this.props;

    if (parseInt(currentItemPlay) - 1 < 0) {
      return false;
    }

    changeLinkAudio({
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) - 1].link,
      songName: dataItems[parseInt(currentItemPlay) - 1].name,
      albumName: albumName,
      currentItemPlay: parseInt(currentItemPlay) - 1,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  }

  onRandom() {
    const { onRandom, onRepeat, repeatNumber } = this.props;
    onRandom({ isRandom: true, repeat: false, repeatNumber: 0 });
  }

  onRepeat() {
    const {
      onRepeat,
      onRandom,
      repeatNumber,
      dataItems,
      showHideButtons,
      showHideOnlyRepeatOneButton
    } = this.props;
    let repeatNum = 0;

    if (dataItems && dataItems.length > 1 && !showHideOnlyRepeatOneButton) {
      if (repeatNumber == 2) {
        repeatNum = 0;
      } else {
        repeatNum = repeatNumber + 1;
      }
    } else {
      repeatNum = repeatNumber == 0 ? 1 : 0;
    }

    const repeat = repeatNum == 1 ? true : false;

    onRepeat({ repeat: repeat, repeatNumber: repeatNum, isRandom: false });
  }

  _setModalVisible = visible => {
    this.setState({ modalVisible: visible });
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
    let { moving, modalMessageVisible } = this.state;
    let {
      currentTime,
      duration,
      percent,
      remain,
      paused,
      isLive,
      playOrPause,
      onForward,
      submitted,
      isLogin,
      list,
      dataItems,
      isCurrentLive,
      showHideButtons,
      showHideOnlyRepeatOneButton,
      notShowShuffle,
      repeatNumber,
      isRandom,
      isPlaylist,
      contentId
    } = this.props;
    let panResponder =
      isCurrentLive && !submitted ? null : this.holderPanResponder.panHandlers;
    let repeatImage = require("../../../common/images/player/Repeat_icon_45.png");
    let repeatCss = isRandom ? { opacity: 0.3 } : "";

    if (dataItems && dataItems.length > 1) {
      if (repeatNumber == 1) {
        repeatImage = require("../../../common/images/player/repeatOne45.png");
      } else if (repeatNumber == 2) {
        repeatImage = require("../../../common/images/player/repeatAll45.png");
      } else {
        repeatImage = require("../../../common/images/player/Repeat_icon_45.png");
      }
    } else if (dataItems && dataItems.length == 1) {
      if (repeatNumber == 1) {
        repeatImage = require("../../../common/images/player/repeatOne45.png");
      } else {
        repeatImage = require("../../../common/images/player/Repeat_icon_45.png");
      }
    } else if (!showHideButtons && showHideOnlyRepeatOneButton) {
      if (repeatNumber == 1) {
        repeatImage = require("../../../common/images/player/repeatOne45.png");
      } else {
        repeatImage = require("../../../common/images/player/Repeat_icon_45.png");
      }
    } else {
      repeatImage = require("../../../common/images/player/Repeat_icon_45.png");
    }

    const shuffleImage = isRandom
      ? require("../../../common/images/player/shuffle_icon_45_active.png")
      : require("../../../common/images/player/shuffle_icon_45.png");

    let showShuffle = notShowShuffle
      ? { height: 0, width: 0, marginRight: 30 }
      : { height: 22.5, width: 25.5, padding: 5 };

    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          right: 0,
          bottom: 15,
          left: 0,
          margin: 10
        }}
      >
        <View
          style={[
            { backgroundColor: "transparent", alignItems: "center" },
            styles.row
          ]}
        >
          {isCurrentLive &&
            !submitted &&
            <View style={[styles.isLive, styles.row]}>
              <Image source={Config.IMAGE_LIVE} style={[styles.liveImage]} />
            </View>}

          {isCurrentLive && !submitted
            ? null
            : <Text
                style={[
                  styles.textDuration,
                  styles.startDuration,
                  { textAlign: "left", top: moving ? 1 : 0 }
                ]}
              >
                {this.formatSeconds(parseInt(currentTime))}
              </Text>}

          <View
            style={[styles.trackingControls]}
            onLayout={this._onLayout}
            {...panResponder}
          >
            {isCurrentLive && !submitted
              ? <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    top: moving ? radiusOfActiveHolder : radiusOfHolder
                  }}
                >
                  <TouchableOpacity
                    style={[styles.line, { flex: 1, borderColor: "#45cbe2" }]}
                  />
                </View>
              : <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    top: moving ? radiusOfActiveHolder : radiusOfHolder
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.line,
                      { flex: percent, borderColor: "#45cbe2" }
                    ]}
                    onPress={this.onLinePressed.bind(this)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.line,
                      { flex: 100 - percent, borderColor: "white" }
                    ]}
                    onPress={this.onLinePressed.bind(this)}
                  />
                </View>}

            <Animated.View
              style={[
                this.getHolderStyle(),
                { top: isCurrentLive && !submitted ? -6 : -1 }
              ]}
            />
          </View>

          {isCurrentLive && !submitted
            ? null
            : <Text
                style={[
                  styles.textDuration,
                  { textAlign: "right", top: moving ? 1 : 0 }
                ]}
              >
                {this.formatSeconds(parseInt(duration))}
              </Text>}
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          {!isCurrentLive
            ? showHideButtons
              ? <TouchableOpacity
                  style={[styles.iconRandom]}
                  onPress={this.onRandom}
                >
                  <Image source={shuffleImage} style={showShuffle} />
                </TouchableOpacity>
              : <View style={[styles.iconRandom]}>
                  <Image
                    source={require("../../../common/images/player/shuffleTransparent45.png")}
                    style={showShuffle}
                  />
                </View>
            : submitted &&
              <TouchableOpacity
                onPress={() => this.changeLink()}
                style={{ justifyContent: "center" }}
              >
                <Image
                  source={require("../../../common/images/player/live_icon_back.png")}
                  style={{ height: 26, width: 38 }}
                />
              </TouchableOpacity>}

          <View style={styles.groupButtonRadio}>
            {!isLive && showHideButtons
              ? <TouchableOpacity onPress={this.onPrev}>
                  <Image
                    source={require("../../../common/images/player/Previous_icon_new_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>
              : <Image
                  source={require("../../../common/images/player/previousTransparent95.png")}
                  style={{ height: 47.5, width: 47.5 }}
                />}

            {paused || currentTime == 0
              ? <TouchableOpacity
                  onPress={() => playOrPause()}
                  style={{ marginLeft: 7, marginRight: 7 }}
                >
                  <Image
                    source={require("../../../common/images/player/Play_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>
              : <TouchableOpacity
                  onPress={() => playOrPause()}
                  style={{ marginLeft: 7, marginRight: 7 }}
                >
                  <Image
                    source={require("../../../common/images/player/Pause_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>}

            {!isLive && showHideButtons
              ? <TouchableOpacity onPress={this.onForward}>
                  <Image
                    source={require("../../../common/images/player/Next_icon_new_95.png")}
                    style={{
                      backgroundColor: "transparent",
                      height: 47.5,
                      width: 47.5
                    }}
                  />
                </TouchableOpacity>
              : <Image
                  source={require("../../../common/images/player/nextTransparent95.png")}
                  style={{
                    backgroundColor: "transparent",
                    height: 47.5,
                    width: 47.5
                  }}
                />}
          </View>

          {!isLive &&
            <TouchableOpacity onPress={this.onRepeat} style={[styles.iconList]}>
              <Image
                source={repeatImage}
                style={[
                  {
                    height: 22.5,
                    width: 22.5,
                    padding: 5,
                    backgroundColor: "transparent"
                  }
                ]}
              />
            </TouchableOpacity>}

          <ModalCreatePlaylist
            contentId={contentId}
            mode={0}
            userInfo={this.props.userInfo}
            modalVisible={this.state.modalCreateVisible}
            onPress={this._setModalStoreVisible}
            onCancel={this._setCancelModalCreatePlaylist}
          />

          <ModalPlaylist
            modalVisible={this.state.modalVisible}
            onPress={() => this._setModalVisible(!this.state.modalVisible)}
          >
            <TouchableWithoutFeedback
              onPress={() => this._setModalVisible(!this.state.modalVisible)}
            >
              <View
                style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
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
                alignItems: "center",
                margin: 7,
                borderRadius: 10,
                overflow: "hidden"
              }}
            >
              <AddPlaylistModalButton
                style={{ flexDirection: "row", paddingVertical: 10 }}
                onPress={() =>
                  this._setModalCreateFormVisible(
                    !this.state.modalCreateVisible
                  )}
              >
                <Text>CREATE PLAYLIST</Text>
              </AddPlaylistModalButton>

              <ListAll
                userInfo={this.props.userInfo}
                contentId={contentId}
                mode={0}
                onPress={this._setModalAddContentVisible}
                modalVisible={this.state.modalAddContentVisible}
              />

              <View
                style={[
                  styles.border1pxPlaylist,
                  {
                    bottom: 0,
                    position: "relative",
                    width: this.props.width - 14,
                    alignItems: "center"
                  }
                ]}
              >
                <TouchableHighlight
                  onPress={() =>
                    this._setModalVisible(!this.state.modalVisible)}
                  style={{ paddingVertical: 15, width: this.props.width - 14 }}
                  underlayColor={"#ececec"}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#45cbe2",
                      fontFamily: "RobotoCondensed-Bold"
                    }}
                  >
                    CLOSE
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </ModalPlaylist>

          {modalMessageVisible &&
            list.addContentPlaylist &&
            <ModalMessage
              modalVisible={modalMessageVisible}
              onPress={() =>
                this._setCancelModalCreatePlaylist(!modalMessageVisible)}
            >
              <Text style={[styles.white, { fontSize: 14 }]}>
                {list.addContentPlaylist.message}
              </Text>
            </ModalMessage>}

          {modalMessageVisible &&
            list.addPlaylist &&
            <ModalMessage
              modalVisible={modalMessageVisible}
              onPress={() =>
                this._setCancelModalCreatePlaylist(!modalMessageVisible)}
            >
              <Text style={[styles.white, { fontSize: 14 }]}>
                {list.addPlaylist.message}
              </Text>
            </ModalMessage>}
        </View>
      </View>
    );
  }
}
