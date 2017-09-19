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
import styles from "../styles/Styles";
import { Icon } from "react-native-elements";
import { Config } from "../common/config";
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
      changeLinkAudio,
      albumName,
      player,
      onForward,
      currentItemPlay
    } = this.props;
    onForward();

    if (dataItems.length == parseInt(currentItemPlay) + 1) {
      return false;
    }
    changeLinkAudio({
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) + 1].link,
      songName: dataItems[parseInt(currentItemPlay) + 1].name,
      albumName: albumName,
      currentItemPlay: parseInt(currentItemPlay) + 1,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  }

  onPrev() {
    const {
      dataItems,
      player,
      changeLinkAudio,
      albumName,
      onPrev,
      currentItemPlay
    } = this.props;
    if (parseInt(currentItemPlay) <= 0) {
      return false;
    }
    onPrev();
    changeLinkAudio({
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false,
      submitted: true,
      linkAudio: dataItems[parseInt(currentItemPlay) - 1].link,
      songName: dataItems[parseInt(currentItemPlay) - 1].name,
      albumName: albumName,
      currentItemPlay: parseInt(currentItemPlay) - 1
    });
  }

  onRandom() {
    const { onRandom, onRepeat, repeatNumber, isRandom } = this.props;
    onRandom();
    //  onRandom({ isRandom: !isRandom, repeat: false, repeatNumber: 0 });
  }

  onRepeat() {
    const { onRepeat } = this.props;
    onRepeat();
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

  playOrPause() {
    const { playOrPause } = this.props;
    playOrPause();
  }

  render() {
    let { moving, modalMessageVisible } = this.state;
    let {
      currentTime,
      duration,
      percent,
      remain,
      player,
      isLive,
      playOrPause,
      onForward,
      submitted,
      payload,
      isCurrentLive,
      showHideButtons,
      showHideOnlyRepeatOneButton,
      notShowShuffle,
      isRandom,
      currentItemPlay
    } = this.props;
    let panResponder =
      isCurrentLive && !submitted ? null : this.holderPanResponder.panHandlers;
    let repeatImage = require("../common/images/player/Repeat_icon_45.png");
    let repeatCss = isRandom ? { opacity: 0.3 } : "";

    if (player.repeatNumber == 1) {
      repeatImage = require("../common/images/player/repeatOne45.png");
    } else if (player.repeatNumber == 2) {
      repeatImage = require("../common/images/player/repeatAll45.png");
    } else {
      repeatImage = require("../common/images/player/Repeat_icon_45.png");
    }

    const shuffleImage = isRandom
      ? require("../common/images/player/shuffle_icon_45_active.png")
      : require("../common/images/player/shuffle_icon_45.png");

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
                      {
                        flex: percent,
                        borderColor: "#45cbe2",
                        backgroundColor: "#45cbe2"
                      }
                    ]}
                    onPress={this.onLinePressed.bind(this)}
                  />

                  <TouchableOpacity
                    style={[
                      styles.line,
                      {
                        flex: 100 - percent,
                        borderColor: "white",
                        backgroundColor: "#FFFFFF"
                      }
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
                    source={require("../common/images/player/shuffleTransparent45.png")}
                    style={showShuffle}
                  />
                </View>
            : submitted &&
              <TouchableOpacity
                onPress={() => this.changeLink()}
                style={{ justifyContent: "center" }}
              >
                <Image
                  source={require("../common/images/player/live_icon_back.png")}
                  style={{ height: 26, width: 38 }}
                />
              </TouchableOpacity>}

          <View style={styles.groupButtonRadio}>
            {!isLive && currentItemPlay > 0
              ? <TouchableOpacity onPress={this.onPrev}>
                  <Image
                    source={require("../common/images/player/Previous_icon_new_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>
              : <Image
                  source={require("../common/images/player/previousTransparent95.png")}
                  style={{ height: 47.5, width: 47.5 }}
                />}

            {player.paused || currentTime == 0
              ? <TouchableOpacity
                  onPress={this.playOrPause.bind(this)}
                  style={{ marginLeft: 7, marginRight: 7 }}
                >
                  <Image
                    source={require("../common/images/player/Play_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>
              : <TouchableOpacity
                  onPress={this.playOrPause.bind(this)}
                  style={{ marginLeft: 7, marginRight: 7 }}
                >
                  <Image
                    source={require("../common/images/player/Pause_95.png")}
                    style={{ height: 47.5, width: 47.5 }}
                  />
                </TouchableOpacity>}

            {!isLive && currentItemPlay < dataItems.length - 1
              ? <TouchableOpacity onPress={this.onForward}>
                  <Image
                    source={require("../common/images/player/Next_icon_new_95.png")}
                    style={{
                      backgroundColor: "transparent",
                      height: 47.5,
                      width: 47.5
                    }}
                  />
                </TouchableOpacity>
              : <Image
                  source={require("../common/images/player/nextTransparent95.png")}
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
        </View>
      </View>
    );
  }
}
