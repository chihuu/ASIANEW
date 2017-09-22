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
  ListView,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";

export default class AudioTimeLines extends Component {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  changeLink = (item, index) => {
    const { changeLinkAudio } = this.props;

    changeLinkAudio({
      submitted: true,
      linkAudio: item.link,
      audioName: item.name,
      currentItemPlay: parseInt(index),
      nextItemPlay: parseInt(index) + 1,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  };

  _renderItem = ({ item, index }) => {
    const {
      currentItemPlay,
      isCurrentLive,
      isLive,
      currentTime,
      paused,
      player
    } = this.props;

    return (
      <View key={index} style={styles.column}>
        <TouchableOpacity
          onPress={() => this.changeLink(item, index)}
          style={[styles.row, styles.wrapperRelated]}
        >
          {currentItemPlay == index && isCurrentLive && !isLive
            ? <View style={{ marginRight: 30, width: 30 }}>
                {currentTime == 0 || player.paused
                  ? <CachedImage
                      source={Config.ICON_CURRENT_PAUSE}
                      resizeMode="contain"
                      style={[styles.iconCurrentPlay]}
                      mutable
                    />
                  : <CachedImage
                      source={Config.ICON_CURRENT_PLAY}
                      resizeMode="contain"
                      style={[styles.iconCurrentPlay]}
                      mutable
                    />}
              </View>
            : <View style={styles.wrapperTextCount}>
                <Text style={styles.textCount}>
                  {parseInt(index) + 1}
                </Text>
              </View>}
          <View style={[styles.caption, { flex: 1 }]}>
            <Text style={[styles.titleAudio]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.subTitle,
                {
                  textAlign: "left",
                  color: "rgba(255, 255, 255, 0.5)",
                  paddingTop: 5,
                  fontSize: 14
                }
              ]}
            >
              {item.start + " - " + item.end}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      payload,
      currentItemPlay,
      currentTime,
      player,
      isCurrentLive
    } = this.props;
    let data = payload.listAudio.timelines;
    return (
      <View>
        this.props.payload.timelines &&
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          currentItemPlay={currentItemPlay}
          currentTime={currentTime}
          isCurrentLive={isCurrentLive}
          paused={player.paused}
        />
      </View>
    );
  }
}
