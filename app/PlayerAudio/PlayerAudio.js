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
import Audio from "./Audio";
import Video from "react-native-video";

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { itemsFetchDataPlayerAudio, idChild, payload } = this.props;
    itemsFetchDataPlayerAudio(idChild);
  }

  render() {
    const {
      payload,
      _layout,
      isFetching,
      player,
      changePlayOrPause,
      changeRepeatNumber,
      changeCurrentItemPlay,
      changeIsRanDom,
      repeatNumber,
      playSong,
      changeSong,
      currentItemPlay
    } = this.props;
    //rending
    if (isFetching && !payload.listAudio) {
      return (
        <View style={[styles.centering, styles.waiting]}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Audio
          payload={payload}
          _layout={_layout}
          player={player}
          playSong={playSong}
          changeSong={changeSong}
          currentItemPlay={currentItemPlay}
          changeIsRanDom={changeIsRanDom}
          changeCurrentItemPlay={changeCurrentItemPlay}
          changeRepeatNumber={changeRepeatNumber}
          changePlayOrPause={changePlayOrPause}
          repeatNumber={repeatNumber}
        />
      </View>
    );
  }
}

export default PlayerAudio;
