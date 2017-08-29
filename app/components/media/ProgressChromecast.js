import React, { Component } from "react";
import _ from "lodash";
import {
  Animated,
  PanResponder,
  Slider,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from "react-native";
import styles from "../../styles/Styles";
import { Icon } from "react-native-elements";

let { width } = Dimensions.get("window");
let radiusOfHolder = 8;
let radiusOfActiveHolder = 9;

export default class ProgressChromecast extends Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.state = {
      lineX: new Animated.Value(0),
      slideX: new Animated.Value(0),
      width: 0
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
        this.notifyPercentChange(newPercent, false);
      }
    });
  }

  notifyPercentChange(newPercent, paused) {
    let { onNewPercent } = this.props;
    if (onNewPercent instanceof Function) {
      onNewPercent(newPercent, paused);
    }
  }

  _onLayout = event => {
    this.setState({
      width: event.nativeEvent.layout.width - radiusOfHolder * 2,
      widthLayout: event.nativeEvent.layout.width,
      heightLayout: event.nativeEvent.layout.height
    });
  };

  getHolderStyle() {
    let { moving, slideX, width } = this.state;
    let { isLive } = this.props;

    if (width > 0) {
      var interpolatedAnimation = slideX.interpolate({
        inputRange: [0, 0],
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

  render() {
    let { moving } = this.state;
    let {
      currentTime,
      duration,
      percent,
      remain,
      categoryId,
      mp3Link,
      paused,
      changeLinkKaraoke,
      resizeModeControl,
      playOrPauseVideo,
      onInfo,
      isLive,
      hideProgress,
      widthLayout
    } = this.props;

    return (
      !hideProgress &&
      <View style={{ flex: 1 }}>
        <View style={[styles.playerContainer, styles.row]}>
          <View style={[styles.isCast, styles.row]}>
            <Text style={[styles.white, styles.isCastText]}>Cast</Text>
            <Icon name="circle" type="font-awesome" color="red" size={4} />
          </View>

          <Text
            style={[
              styles.textDuration,
              styles.startDuration,
              { width: 70, textAlign: "center", marginRight: 5 }
            ]}
          >
            {this.formatSeconds(parseInt(currentTime))}
          </Text>

          <View
            style={styles.trackingControls}
            onLayout={this._onLayout}
            {...this.holderPanResponder.panHandlers}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                top: moving ? radiusOfActiveHolder : radiusOfHolder
              }}
            >
              <TouchableOpacity
                style={[styles.line, { flex: percent, borderColor: "#45cbe2" }]}
                onPress={this.onLinePressed.bind(this)}
              />
              <TouchableOpacity
                style={[
                  styles.line,
                  { flex: 100 - percent, borderColor: "white" }
                ]}
                onPress={this.onLinePressed.bind(this)}
              />
            </View>
            <Animated.View style={[this.getHolderStyle(), { top: -4 }]} />
          </View>

          <Text
            style={[
              styles.textDuration,
              styles.endDuration,
              { width: 70, textAlign: "center", marginLeft: 5 }
            ]}
          >
            {this.formatSeconds(parseInt(duration))}
          </Text>

          {categoryId && categoryId == 5
            ? <View style={styles.iconKaraoke}>
                <Icon
                  name="microphone"
                  type="font-awesome"
                  color="#fff"
                  size={10}
                  onPress={() => changeLinkKaraoke(mp3Link)}
                />
              </View>
            : null}
        </View>

        {paused
          ? <View style={[styles.iconPlay, { top: width / 16 * 9 / 2 - 10 }]}>
              <Icon
                name="play"
                type="font-awesome"
                color="#fff"
                size={22}
                onPress={() => playOrPauseVideo()}
              />
            </View>
          : <View style={[styles.iconPause, { top: width / 16 * 9 / 2 - 10 }]}>
              <Icon
                name="pause"
                type="font-awesome"
                color="#fff"
                size={22}
                onPress={() => playOrPauseVideo()}
              />
            </View>}

        {
          <View style={styles.iconInfo}>
            <Icon
              name="info-circle"
              type="font-awesome"
              color="#fff"
              size={22}
              onPress={() => onInfo()}
            />
          </View>
        }
      </View>
    );
  }
}
