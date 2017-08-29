"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import Video from "react-native-video";
import Orientation from "react-native-orientation";
import { Progress } from "../components";

export default class extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    this.state = {
      rate: 1.0,
      volume: 1.0,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      hideProgress: false,
      ignoreSilentSwitch: null
    };
  }

  toHHMMSS(duration) {
    var hours =
      Math.floor(duration / 3600) < 10
        ? ("00" + Math.floor(duration / 3600)).slice(-2)
        : Math.floor(duration / 3600);
    var minutes = ("00" + Math.floor(duration % 3600 / 60)).slice(-2);
    var seconds = ("00" + duration % 3600 % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  onLoad(e) {
    this.setState({
      duration: e.duration,
      currentTime: e.currentTime
    });
    // setTimeout(() => {
    //   this.setState({ hideProgress: true });
    // }, 8000);
  }

  onProgress(e) {
    this.setState({ currentTime: e.currentTime });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  playOrPauseVideo() {
    this.setState({ paused: !this.state.paused });
  }

  displayProgress() {
    this.setState({ hideProgress: false, isToggle: false });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({ hideProgress: true });
    }, 8000);
  }

  resizeModeControl() {
    const { presentFullscreenVideoPlayer, width, height } = this.props;

    let isFullscreen = "";

    Orientation.getOrientation(function(err, orientation) {
      if (err) {
        return console.log("Error rotate");
      }

      if (orientation === "LANDSCAPE") {
        Orientation.lockToPortrait();
        isFullscreen = false;
      } else {
        Orientation.lockToLandscape();
        isFullscreen = true;
      }

      presentFullscreenVideoPlayer({
        isFullscreen: isFullscreen
      });
    });
  }

  getCurrentTimePercentage(currentTime, duration) {
    if (parseFloat(currentTime) > 0 && parseFloat(duration) > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  render() {
    const {
      payload,
      backgroundVideo,
      backgroundHeightVideo,
      isFullscreen,
      _layout
    } = this.props;

    const { currentTime, duration } = this.state;

    let paddingTop = isFullscreen ? 0 : 64;
    let flexCompleted =
      this.getCurrentTimePercentage(currentTime, duration) * 100;
    let flexRemaining =
      (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;

    return (
      <View style={styles.containerVideo}>
        <TouchableOpacity
          style={styles.containerVideo}
          onPress={() => this.displayProgress()}
        >
          <View style={[backgroundVideo, backgroundHeightVideo]}>
            <Video
              source={{
                uri: payload.listDetail.content.link,
                mainVer: 1,
                patchVer: 0
              }}
              ref={(ref: Video) => (this.videoPlayer = ref)}
              rate={this.state.rate} // 0 is paused, 1 is normal.
              volume={1.0} // 0 is muted, 1 is normal.
              muted={false} // Mutes the audio entirely.
              paused={this.state.paused} // Pauses playback entirely.
              resizeMode={"contain"} // Fill the whole screen at aspect ratio.
              repeat={false} // Repeat forever.
              progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.loadStart} // Callback when video starts to load
              onLoad={this.onLoad}
              onProgress={this.onProgress} // Callback every ~250ms with currentTime
              onEnd={this.onEnd} // Callback when playback finishes
              onError={this.videoError} // Callback when video cannot be loaded
              ignoreSilentSwitch={"ignore"}
              onTimedMetadata={this.onTimedMetadata}
              onBuffer={this.onBuffer}
              style={[backgroundVideo, backgroundHeightVideo]}
            />
            <Progress
              isLive={payload.listDetail.content.isLive}
              categoryId={payload.listDetail.content.cat_id}
              playOrPauseVideo={this.playOrPauseVideo}
              resizeModeControl={this.resizeModeControl}
              percent={flexCompleted}
              remain={flexRemaining}
              isFullscreen={isFullscreen}
              _layout={_layout}
              {...this.state}
              // duration={duration}
              // currentTime={currentTime}
              // percent={flexCompleted}
              // remain={flexRemaining}
              // onNewPercent={this.onProgressChanged.bind(this)}
              // fullscreen={fullscreen}
              // onInfo={this.onInfo}
              // isTimeline={isTimeline}
              // hideProgress={hideProgress}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
