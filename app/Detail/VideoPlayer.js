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
import ToggleInfo from "../components/relate/ToggleInfo";
import { Progress } from "../components";
import Icon from "react-native-vector-icons/Ionicons";
import _ from "lodash";

import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst
} from "react-native-router-flux";

export default class extends Component {
  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.playOrPauseVideo = this.playOrPauseVideo.bind(this);
    this.resizeModeControl = this.resizeModeControl.bind(this);
    this.onInfo = this.onInfo.bind(this);
    this.changeLink = this.changeLink.bind(this);
    this.processWhenEnd = this.processWhenEnd.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
    this.onProgressChanged = this.onProgressChanged.bind(this);
    this.state = {
      rate: 1.0,
      volume: 1.0,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      hideProgress: false,
      ignoreSilentSwitch: null,
      isToggle: false,
      hideProgress: false,
      submitted: false,
      currentItemPlay: 0,
      showChromecast: false,
      pausedChromecast: false,
      isKaraoke: false
    };
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   const { isFullscreen } = this.props;
  //   console.log(nextProps);
  //   console.log(this.props);
  //   if (nextProps.isFullscreen != isFullscreen) {
  //     Actions.refresh({ key: "detail", hideNavBar: true });
  //   }
  // }

  toHHMMSS(duration) {
    var hours =
      Math.floor(duration / 3600) < 10
        ? ("00" + Math.floor(duration / 3600)).slice(-2)
        : Math.floor(duration / 3600);
    var minutes = ("00" + Math.floor(duration % 3600 / 60)).slice(-2);
    var seconds = ("00" + duration % 3600 % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }

  onVideoLoad(e) {
    const { payload } = this.props;

    this.setState({
      duration: e.duration,
      currentTime: e.currentTime,
      imageLoading: false,
      paused: this.state.paused
    });

    if (
      payload.listDetail.episodes &&
      payload.listDetail.episodes.length > 1 &&
      !this.state.submitted
    ) {
      let currentIndex = _.findIndex(payload.listDetail.episodes, {
        id: payload.listDetail.content.id
      });

      this.setState({ currentItemPlay: currentIndex });
    }

    this.timeout = setTimeout(() => {
      this.setState({ hideProgress: true });
    }, 8000);
  }

  chromecastCastMedia() {
    this.setState({
      paused: true,
      showChromecast: true,
      pausedChromecast: false
    });
    Chromecast.castMedia(
      this.props.listDetail.content.link,
      this.props.listDetail.content.name,
      this.props.listDetail.content.image,
      this.state.currentTime
    );
  }

  onProgressChanged(newPercent, paused) {
    let { duration } = this.state;
    let newTime = newPercent * duration / 100;

    if (newTime <= 0) {
      newTime = 0;
    }

    if (newTime > duration) {
      newTime = duration;
    }

    this.setState({ currentTime: newTime, paused: paused });
    this.videoPlayer.seek(newTime);
  }

  updateProgressChanged() {
    const { currentTime } = this.props;
    this.setState({
      showChromecast: false,
      paused: false,
      pausedChromecast: true
    });
    currentTime > 0 && this.videoPlayer.seek(currentTime);
  }
  onProgress(e) {
    this.setState({ currentTime: e.currentTime });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  onInfo() {
    this.setState({ isToggle: !this.state.isToggle, hideProgress: true });
  }

  playOrPauseVideo() {
    this.setState({ paused: !this.state.paused });
  }

  resizeModeControl() {
    const { presentFullscreenVideoPlayer, hide } = this.props;
    const { paused } = this.state;
    console.log(hide);
    hide();

    let isFullscreen = "";
    //Actions.refresh({ key: "detail", hideNavBar: true });
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({ paused: true });
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
        hideNavBar = true;
      }

      presentFullscreenVideoPlayer({
        isFullscreen: isFullscreen
      });
    });
  }

  changeLink(index) {
    this.setState({ currentItemPlay: index });
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

  getCurrentTimePercentage(currentTime, duration) {
    if (parseFloat(currentTime) > 0 && parseFloat(duration) > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onForward(currentTime, duration) {
    if (currentTime + FORWARD_DURATION > duration) {
      this.onVideoEnd();
    } else {
      let newTime = currentTime + FORWARD_DURATION;
      this.videoPlayer.seek(newTime);
      this.setState({ currentTime: newTime });
    }
  }
  onVideoEnd() {
    const { payload } = this.props;
    const { currentItemPlay } = this.state;

    if (payload.listDetail.episodes && payload.listDetail.episodes.length > 1) {
      if (
        payload.listDetail.episodes.length !==
        parseInt(currentItemPlay) + 1
      ) {
        this.videoPlayer.seek(0);
        this.processWhenEnd();
      } else {
        return false;
      }
    } else {
      this.setState({ paused: true });
    }
  }

  processWhenEnd() {
    const { payload } = this.props;
    const { currentItemPlay } = this.state;

    let rowCurrentItemPlay = parseInt(currentItemPlay) + 1 || 0;

    this.setState({
      submitted: true,
      duration: 0,
      currentTime: 0,
      currentItemPlay: rowCurrentItemPlay
    });
  }

  render() {
    const {
      payload,
      backgroundVideo,
      backgroundHeightVideo,
      isFullscreen,
      _layout,
      isFetching
    } = this.props;
    const { currentTime, duration, isToggle, currentItemPlay } = this.state;
    let link = "";
    let id = 0;
    let name = "";
    let flexCompleted =
      this.getCurrentTimePercentage(currentTime, duration) * 100;
    let flexRemaining =
      (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;

    if (payload.listDetail && payload.listDetail.content) {
      if (!this.state.submitted) {
        link = this.state.isKaraoke
          ? this.state.link
          : payload.listDetail.content.link;
        id = payload.listDetail.content.id;
        name = payload.listDetail.content.name;
      } else {
        link = payload.listDetail.episodes[currentItemPlay].link;
        name = payload.listDetail.episodes[currentItemPlay].name;
        id = payload.listDetail.episodes[currentItemPlay].id;
      }
    }
    if (isFetching) {
      return (
        <View style={[styles.centering, styles.waiting]}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }

    return (
      <View style={[styles.containerVideo, backgroundHeightVideo]}>
        <TouchableOpacity onPress={() => this.displayProgress()}>
          <View style={[backgroundVideo, backgroundHeightVideo]}>
            <Video
              source={{
                uri: link,
                mainVer: 1,
                patchVer: 0
              }}
              ref={(ref: Video) => (this.videoPlayer = ref)}
              rate={this.state.rate} // 0 is paused, 1 is normal.
              volume={0} // 0 is muted, 1 is normal.
              muted={false} // Mutes the audio entirely.
              paused={this.state.paused} // Pauses playback entirely.
              resizeMode={"contain"} // Fill the whole screen at aspect ratio.
              repeat={false} // Repeat forever.
              progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.loadStart} // Callback when video starts to load
              onLoad={this.onVideoLoad}
              onProgress={this.onProgress} // Callback every ~250ms with currentTime
              onEnd={_.debounce(this.onVideoEnd.bind(this), 100)} // Callback when playback finishes
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
              onInfo={this.onInfo}
              {...this.state}
              // duration={duration}
              // currentTime={currentTime}
              // percent={flexCompleted}
              // remain={flexRemaining}
              onNewPercent={this.onProgressChanged.bind(this)}
              // fullscreen={fullscreen}

              // isTimeline={isTimeline}
              // hideProgress={hideProgress}
            />

            {isToggle && isFullscreen
              ? <ToggleInfo
                  imageDevice={_layout.imageDeviceLanscape}
                  dataRelate={payload.listDetail}
                  onInfo={this.onInfo}
                  width={_layout.width}
                  height={_layout.height}
                  changeLink={this.changeLink}
                />
              : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
