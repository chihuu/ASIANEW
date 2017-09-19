"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import VideoPlayer from "./VideoPlayer";
import Video from "react-native-video";
import TabsWrapper from "../components/relate/TabsWrapper";

class Detail extends Component {
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
      ignoreSilentSwitch: null
    };
  }

  componentWillMount() {
    const { itemsFetchDataDetail, idChild, payload } = this.props;
    itemsFetchDataDetail(idChild);
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  render() {
    const {
      payload,
      isLogin,
      fullscreenPlayer,
      _layout,
      isFullscreen,
      imageDeviceLanscape,
      presentFullscreenVideoPlayer,
      isFetching,
      chromecastId
    } = this.props;

    let paddingTop = isFullscreen ? 0 : 64;
    let resizeMode = isFullscreen ? "stretch" : "contain";

    let backgroundVideo = !isFullscreen
      ? styles.backgroundVideo
      : styles.backgroundVideoFull;
    let backgroundHeightVideo = !isFullscreen
      ? { height: _layout.width / 16 * 9 }
      : { height: _layout.height };

    //rending
    if (isFetching && !payload.listDetail) {
      return (
        <View style={[styles.centering, styles.waiting]}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <VideoPlayer
          payload={payload}
          _layout={_layout}
          backgroundVideo={backgroundVideo}
          backgroundHeightVideo={backgroundHeightVideo}
          presentFullscreenVideoPlayer={presentFullscreenVideoPlayer}
          isFullscreen={isFullscreen}
        />
        {!isFullscreen && <TabsWrapper {...this.props} />}
      </View>
    );
  }
}

export default Detail;
