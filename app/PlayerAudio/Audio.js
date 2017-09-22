import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
  Easing,
  AsyncStorage,
  TouchableWithoutFeedback,
  ScrollView,
  InteractionManager,
  Alert
} from "react-native";
import ProgressAudio from "./ProgressAudio";
import styles from "../styles/Styles";
import Video from "react-native-video";
import Swiper from "react-native-swiper";
import { Config } from "../common/config";
import Icon from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { CachedImage } from "react-native-img-cache";
import { BlurView } from "react-native-blur";
import { pause } from "./actions";
import AudioEpisodes from "./AudioEpisodes";
import AudioRelated from "./AudioRelated";
import AudioTimeLines from "./AudioTimeLines";
import { Actions } from "react-native-router-flux";
import { CHANGE_TYPES } from "../private/constants";
import _ from "lodash";

let { width, height } = Dimensions.get("window");

export class Audio extends Component {
  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.changeLinkAudio = this.changeLinkAudio.bind(this);
    this.onProgressChanged = this.onProgressChanged.bind(this);
    this.playOrPause = this.playOrPause.bind(this);
    this.onRepeat = this.onRepeat.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onRandom = this.onRandom.bind(this);
    //this.onEnd = this.onEnd.bind(this);

    this.state = {
      rate: 1.0,
      volume: 1.0,
      muted: false,
      duration: 0.0,
      dataAudio: [],
      imageLoading: true,
      imageBgLoading: true,
      currentTime: 0.0,
      linkVideo: "",
      spinValue: new Animated.Value(0),
      modalY: new Animated.Value(0),
      displayed: true,
      height: height,
      audioScale: false,
      isFirstAnimate: false,
      loading: false,
      isBuffering: false,
      submitted: false, //Check timelines click
      nextItemPlay: 0, //If has episodes, series auto next play
      repeat: false,
      isNextItem: false,
      isPrevItem: false,
      isEnd: false,
      playAudioEnd: false,
      linkAudio: ""
    };
  }

  componentWillMount() {
    const { idChild, payload, player } = this.props;
    this.spin();
    // if (parseInt(dataAudio.idChild) > 0) {
    //   receiveAudio(parseInt(dataAudio.idChild));
    // }
    this.setState({
      loading: true,
      paused: false,
      submitted: false
    });
    // this.handleAudioScale();
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 12000,
      easing: Easing.linear
    }).start(() => this.spin());
  }

  onLoad(data) {
    this.setState({
      duration: data.duration,
      imageLoading: false
    });
  }

  changeLinkAudio = items => {
    items.paused = true;
    this.setState(items);
    setTimeout(() => {
      this.setState({ paused: false });
    }, 4000);
  };

  onProgress(data) {
    this.setState({
      currentTime: data.currentTime
    });

    // const { playSong, player } = this.props;
    // let time = player.currentTime;
    // time = data.currentTime;
    // let currentTime = isNaN(player.currentTime) ? 0 : player.currentTime;
    // playSong(currentTime);
  }

  onForward() {
    const { changeCurrentItemPlay, player, payload } = this.props;
    let number = isNaN(player.currentItemPlay) ? 0 : player.currentItemPlay;
    let data = "";
    if (
      payload.listAudio &&
      payload.listAudio.episodes &&
      payload.listAudio.episodes.length > 1
    ) {
      data = payload.listAudio.episodes;
    } else {
      data = payload.listAudio.related;
    }
    if (player.isRandom == true) {
      number = this.getRandomIntInclusive(0, data.length - 1);
    } else if (number + 1 == data.length) {
      number = 0;
    } else if (number > data.length) {
      number = 0;
    } else {
      number = number + 1;
    }
    changeCurrentItemPlay(
      number,
      player.paused,
      player.repeatNumber,
      player.isRandom
    );
  }

  onEnd() {
    const { player, repeatNumber, currentItemPlay, payload } = this.props;
    if (repeatNumber == 0) {
      this.onForward();
    }
  }

  onPrev() {
    const { changeCurrentItemPlay, player, payload } = this.props;
    let number = isNaN(player.currentItemPlay) ? 0 : player.currentItemPlay;
    let data = "";
    if (
      payload.listAudio &&
      payload.listAudio.episodes &&
      payload.listAudio.episodes.length > 1
    ) {
      data = payload.listAudio.episodes;
    } else {
      data = payload.listAudio.related;
    }
    if (player.isRandom == true) {
      number = this.getRandomIntInclusive(0, data.length - 1);
    } else {
      number = number - 1;
    }
    changeCurrentItemPlay(
      number,
      player.paused,
      player.repeatNumber,
      player.isRandom
    );
  }

  playOrPause() {
    const { changePlayOrPause, player, changeSong } = this.props;
    let paused = player.paused;
    changePlayOrPause(
      player.paused,
      player.currentItemPlay,
      player.repeatNumber,
      player.isRandom
    );
  }

  getCurrentTimePercentage(currentTime, duration) {
    if (parseFloat(currentTime) > 0 && parseFloat(duration) > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onProgressChanged(newPercent, paused) {
    const { player } = this.props;
    let { duration } = this.state;
    let newTime = newPercent * duration / 100;
    player.currentTime = newTime;
    if (newTime <= 0) {
      newTime = 0;
    }

    if (newTime > duration) {
      newTime = duration;
    }

    this.setState({ paused: paused });
    this.videoPlayer.seek(newTime);
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  onRandom() {
    const { changeIsRanDom, player } = this.props;
    this.setState({ repeat: false });
    changeIsRanDom(
      player.isRandom,
      player.repeatNumber,
      player.currentItemPlay,
      player.paused
    );
  }

  onRepeat() {
    const { player, changeRepeatNumber } = this.props;

    let isRandom = this.props.isRandom;
    let number = isNaN(player.repeatNumber) ? 0 : player.repeatNumber;
    if (number == 1) {
      number = number + 1;
    } else if (number == 2) {
      number = 0;
      this.setState({ repeat: false });
    } else {
      number = number + 1;
      this.setState({ repeat: true });
      isRandom = false;
    }
    changeRepeatNumber(number, player.currentItemPlay, player.paused, isRandom);
  }

  render() {
    const {
      payload,
      _layout,
      isFetching,
      player,
      currentItemPlay
    } = this.props;

    let scale = this.state.audioScale ? "slideInDown" : "slideInUp";
    let flexCompleted = 100;
    let flexRemaining = 0;
    let linkAudio = "";
    let showDataRelate = "";
    let isShowRelated = (isLive = showHideButtons = showHideOnlyRepeatOneButton = false);

    let { duration, submitted, audioScale, currentTime } = this.state;
    //  let currentTime = player.currentTime || 0;
    //  let currentItemPlay = player.currentItemPlay || 0;
    let isCurrentLive =
      payload.listAudio &&
      payload.listAudio.content &&
      payload.listAudio.content.isLive == true
        ? true
        : false;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    if (
      payload.listAudio &&
      payload.listAudio.content &&
      payload.listAudio.content.isLive == false
    ) {
      flexCompleted =
        this.getCurrentTimePercentage(currentTime, duration) * 100;
      flexRemaining =
        (1 - this.getCurrentTimePercentage(currentTime, duration)) * 100;
    }
    if (isFetching && !payload.listAudio.content) {
      return (
        <View style={[styles.centering, styles.waiting]}>
          <ActivityIndicator size="small" color="white" />
        </View>
      );
    }
    if (
      payload.listAudio &&
      payload.listAudio.actors &&
      payload.listAudio.actors != "" &&
      !isLive
    ) {
      if (typeof payload.listAudio.content.actors === "string") {
        actors = payload.listAudio.content.actors;
      } else {
        let arrActors = [];
        payload.listAudio.actors.map(function(data, value) {
          arrActors.push(data.name);
        });
        actors = arrActors.join(", ");
      }
    }
    if (
      payload.listAudio &&
      payload.listAudio.content &&
      payload.listAudio.content.cat_id == 7 &&
      isCurrentLive
    ) {
      if (
        payload.listAudio &&
        payload.listAudio.timelines &&
        payload.listAudio.timelines.length > 0
      ) {
        dataItems = payload.listAudio.timelines[0].timeline;
        linkImage = payload.listAudio.content.image;
        isShowRelated = true;
        showHideButtons = true;

        showDataRelate = (
          <AudioTimeLines
            timelines={payload.listAudio.timelines[0].timeline}
            changeLinkAudio={this.changeLinkAudio}
            currentItemPlay={currentItemPlay}
            isCurrentLive={isCurrentLive}
            isLive={isLive}
            currentTime={currentTime}
            paused={paused}
            submitted={submitted}
            id={dataItems[currentItemPlay].id}
            payload={payload}
          />
        );
      } else if (
        payload.listAudio &&
        payload.listAudio.episodes &&
        payload.listAudio.episodes.length > 0
      ) {
        dataItems = payload.listAudio.episodes;
        linkImage = payload.listAudio.content.image;
        albumName = payload.listAudio.content.name;
        songName = dataItems[currentItemPlay].name;
        linkAudio = dataItems[currentItemPlay].link;
        isShowRelated = true;
        showHideButtons = true;

        showDataRelate = (
          <AudioEpisodes
            submitted={submitted}
            currentTime={currentTime}
            changeCurrentItemPlay={this.props.changeCurrentItemPlay}
            player={player}
            paused={this.state.paused}
            currentItemPlay={currentItemPlay}
            id={dataItems[currentItemPlay].id}
            changeLinkAudio={this.changeLinkAudio}
            {...this.props}
            payload={payload}
          />
        );
      } else if (
        payload.listAudio &&
        payload.listAudio.related &&
        payload.listAudio.related.length > 0
      ) {
        dataItems = payload.listAudio.related;
        linkImage = payload.listAudio.content.image;
        songName = dataItems[currentTime].name;
        isShowRelated = true;
        showHideButtons = false;
        showHideOnlyRepeatOneButton = true;

        showDataRelate = (
          <AudioRelated
            related={payload.listAudio.related}
            currentItemPlay={currentItemPlay}
            showHideButtons={showHideButtons}
            submitted={submitted}
            payload={payload}
            player={player}
          />
        );
      }
    } else {
      if (payload.listAudio.episodes && payload.listAudio.episodes.length > 0) {
        isShowRelated = true;
        showHideButtons = true;
        dataItems = payload.listAudio.episodes;
        linkImage = dataItems[currentItemPlay].image;
        linkAudio = dataItems[currentItemPlay].link;
        songName = dataItems[currentItemPlay].name;
        albumName = payload.listAudio.content.name;

        showDataRelate = (
          <AudioEpisodes
            submitted={submitted}
            changeCurrentItemPlay={this.props.changeCurrentItemPlay}
            player={player}
            paused={this.state.paused}
            currentItemPlay={currentItemPlay}
            id={dataItems[currentItemPlay].id}
            changeLinkAudio={this.changeLinkAudio}
            payload={payload}
            currentTime={this.state.currentTime}
          />
        );
      } else if (
        payload.listAudio &&
        payload.listAudio.related &&
        payload.listAudio.related.length > 0
      ) {
        dataItems = payload.listAudio.related;
        linkImage = dataItems[currentItemPlay].image;
        songName = dataItems[currentItemPlay].name;
        linkAudio = dataItems[currentItemPlay].link;
        isShowRelated = true;
        showHideButtons = false;
        albumName = "";
        showDataRelate = (
          <AudioRelated
            currentItemPlay={currentItemPlay}
            submitted={submitted}
            currentTime={currentTime}
            player={player}
            payload={payload}
            {...this.props}
          />
        );
      }
    }

    return (
      <Animatable.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: _layout.height
          }
        ]}
        animation={scale}
      >
        <Image
          source={{ uri: linkImage }}
          style={{ flex: 1 }}
          blurRadius={100}
          onLoadEnd={e => this.setState({ imageBgLoading: false })}
        >
          <BlurView blurType="light" blurAmount={70} style={{ flex: 1 }}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", flex: 1 }}>
              <TouchableOpacity
                style={styles.leftNavButtonRadio}
                onPress={Actions.pop}
              >
                <Icon name="ios-arrow-back" size={32} color={"#FFFFFF"} />
              </TouchableOpacity>
              <Video
                source={{ uri: linkAudio }} // Looks for .mp4 file (background.mp4) in the given expansion version.
                ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                rate={this.state.rate} // 0 is paused, 1 is normal.
                volume={this.state.volume} // 0 is muted, 1 is normal.
                muted={false} // Mutes the audio entirely.
                paused={player.paused} // Pauses playback entirely.
                resizeMode="contain" // Fill the whole screen at aspect ratio.
                repeat={this.state.repeat} // Repeat forever.
                progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                onLoad={this.onLoad} // Callback when video loads
                onProgress={this.onProgress} // Callback every ~250ms with currentTime
                onError={this.videoError} // Callback when video cannot be loaded
                onTimedMetadata={this.onTimedMetadata}
                onEnd={_.debounce(this.onEnd.bind(this), 100)}
                onBuffer={this.onBuffer}
                playInBackground={true} // Audio continues to play when app entering background.
                playWhenInactive={true} // [iOS] Video continues to play when control or notification center are shown.
                controls={true}
                ignoreSilentSwitch={"ignore"}
              />
              {isShowRelated == true
                ? <Swiper
                    showsPagination={true}
                    dot={
                      <View
                        style={{
                          backgroundColor: "rgba(255,255,255,.3)",
                          width: 13,
                          height: 13,
                          borderRadius: 7,
                          marginLeft: 7,
                          marginRight: 7
                        }}
                      />
                    }
                    activeDot={
                      <View
                        style={{
                          backgroundColor: "#fff",
                          width: 13,
                          height: 13,
                          borderRadius: 7,
                          marginLeft: 7,
                          marginRight: 7
                        }}
                      />
                    }
                    loop={false}
                    index={1}
                    paginationStyle={styles.paginationAudio}
                    height={height - 100}
                  >
                    <View
                      style={[
                        styles.wrapperAudioSwipper,
                        { height: height - 225, overflow: "hidden" }
                      ]}
                    >
                      {payload.listAudio.content.lyric &&
                      payload.listAudio.content.lyric != ""
                        ? <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                          >
                            <View style={{ flex: 1, overflow: "hidden" }}>
                              <Text
                                style={[
                                  styles.white,
                                  { textAlign: "center", lineHeight: 22 }
                                ]}
                              >
                                {payload.listAudio.content.lyric}
                              </Text>
                            </View>
                          </ScrollView>
                        : <Text style={styles.white}>Not Found Lyrics</Text>}
                    </View>

                    <View style={styles.wrapperAudioSwipper}>
                      <Animated.Image
                        source={{
                          uri: linkImage,
                          cache: "reload"
                        }}
                        style={[
                          styles.centering,
                          {
                            width: width - 100,
                            height: width - 100,
                            marginBottom: 100,
                            borderRadius: (width - 100) / 2,
                            transform: [{ rotate: spin }]
                          }
                        ]}
                        key={linkImage}
                        resizeMode="contain"
                      >
                        {(this.state.imageLoading || currentTime <= 0) &&
                          <ActivityIndicator size="small" color="white" />}
                      </Animated.Image>
                      <Text
                        style={[
                          styles.white,
                          {
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: 30
                          }
                        ]}
                      >
                        {albumName}
                      </Text>
                      {songName != "" &&
                        <Text
                          style={[
                            styles.white,
                            { fontSize: 16, textAlign: "center" }
                          ]}
                        >
                          {songName}
                        </Text>}
                    </View>
                    <View
                      style={[
                        styles.wrapperAudioTimelines,
                        { height: height - 225, overflow: "hidden" }
                      ]}
                    >
                      {showDataRelate}
                    </View>
                  </Swiper>
                : <Swiper
                    showsPagination={true}
                    dot={
                      <View
                        style={{
                          backgroundColor: "rgba(255,255,255,.3)",
                          width: 13,
                          height: 13,
                          borderRadius: 7,
                          marginLeft: 7,
                          marginRight: 7
                        }}
                      />
                    }
                    activeDot={
                      <View
                        style={{
                          backgroundColor: "#fff",
                          width: 13,
                          height: 13,
                          borderRadius: 7,
                          marginLeft: 7,
                          marginRight: 7
                        }}
                      />
                    }
                    loop={false}
                    index={1}
                    paginationStyle={styles.paginationAudio}
                    height={height - 100}
                  >
                    <View style={styles.wrapperAudioSwipper}>
                      {payload.listAudio.content.lyric &&
                      payload.listAudio.content.lyric != ""
                        ? <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                          >
                            <View>
                              <Text
                                style={[
                                  styles.white,
                                  {
                                    textAlign: "center",
                                    lineHeight: 22,
                                    paddingLeft: 15,
                                    paddingRight: 15
                                  }
                                ]}
                              >
                                {payload.listAudio.content.lyric}
                              </Text>
                            </View>
                          </ScrollView>
                        : <Text style={[styles.white, { padding: 7 }]}>
                            Not Found Lyrics
                          </Text>}
                    </View>

                    <View style={styles.wrapperAudioSwipper}>
                      <Animated.Image
                        source={{
                          uri: payload.listAudio.content.image,
                          cache: "reload"
                        }}
                        style={[
                          styles.centering,
                          {
                            width: width - 50,
                            height: width - 50,
                            marginBottom: 50,
                            borderRadius: (width - 50) / 2,
                            transform: [{ rotate: spin }]
                          }
                        ]}
                        onLoadEnd={e => this.setState({ imageLoading: false })}
                      >
                        {(this.state.imageLoading || currentTime <= 0) &&
                          <ActivityIndicator size="small" color="white" />}
                      </Animated.Image>
                      <Text
                        style={[
                          styles.white,
                          {
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: 30
                          }
                        ]}
                      >
                        {albumName}
                      </Text>
                      {songName != "" &&
                        <Text
                          style={[
                            styles.white,
                            { fontSize: 16, textAlign: "center" }
                          ]}
                        >
                          {songName}
                        </Text>}
                    </View>
                  </Swiper>}
              <View style={[styles.column, { padding: 7 }]}>
                <ProgressAudio
                  payload={payload}
                  isLive={payload.listAudio.content.isLive}
                  contentId={payload.listAudio.content.id}
                  playOrPause={this.playOrPause}
                  percent={flexCompleted}
                  onPrev={this.onPrev}
                  player={player}
                  remain={flexRemaining}
                  isCurrentLive={isCurrentLive}
                  onForward={this.onForward}
                  changeLinkAudio={this.changeLinkAudio}
                  onNewPercent={this.onProgressChanged}
                  onRandom={this.onRandom}
                  showHideButtons={showHideButtons}
                  onRepeat={this.onRepeat}
                  isRandom={player.isRandom}
                  currentItemPlay={currentItemPlay}
                  dataItems={dataItems}
                  albumName={payload.listAudio.content.name}
                  showHideOnlyRepeatOneButton={showHideOnlyRepeatOneButton}
                  {...this.state}
                />
              </View>
            </View>
          </BlurView>
        </Image>
      </Animatable.View>
    );
  }
}

export default Audio;
