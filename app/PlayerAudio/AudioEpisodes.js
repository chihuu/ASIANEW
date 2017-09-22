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
  FlatList,
  InteractionManager
} from "react-native";
import styles from "../styles/Styles";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";

export default class AudioEpisodes extends Component {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  changeLink = (item, index) => {
    const { changeLinkAudio, player, changeCurrentItemPlay } = this.props;
    changeCurrentItemPlay(
      index,
      player.paused,
      player.repeatNumber,
      player.isRandom
    );
    // changeLinkAudio({
    //   submitted: true,
    //   linkAudio: item.link,
    //   audioName: item.name,
    //   currentItemPlay: index,
    //   paused: false,
    //   duration: 0.0,
    //   currentTime: 0.0,
    //   isCurrentLive: false
    // });
  };

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item, index }) => {
    let actors = "";
    const {
      currentTime,
      player,
      id,
      submitted,
      currentItemPlay,
      paused
    } = this.props;
    if (item.actors && item.actors != "") {
      if (typeof item.actors === "string") {
        actors = item.actors;
      } else {
        let arrActors = [];
        item.actors.map(function(data, value) {
          arrActors.push(data.name);
        });
        actors = arrActors.join(", ");
      }
    }
    return (
      <View key={item.id} style={styles.column}>
        <TouchableOpacity
          key={index}
          onPress={() => this.changeLink(item, index)}
          style={[styles.row, styles.wrapperRelated]}
        >
          {!submitted
            ? id == item.id
              ? <View style={{ marginRight: 30, width: 35 }}>
                  {currentTime == 0 || player.paused
                    ? <Image
                        source={Config.ICON_CURRENT_PAUSE}
                        resizeMode="contain"
                        style={[styles.iconCurrentPlay]}
                      />
                    : <Image
                        source={Config.ICON_CURRENT_PLAY}
                        resizeMode="contain"
                        style={[styles.iconCurrentPlay]}
                      />}
                </View>
              : <View style={styles.wrapperTextCount}>
                  <Text style={styles.textCount}>
                    {parseInt(index) + 1}
                  </Text>
                </View>
            : currentItemPlay == index
              ? <View style={{ marginRight: 30, width: 35 }}>
                  {currentTime == 0 || player.paused
                    ? <Image
                        source={Config.ICON_CURRENT_PAUSE}
                        resizeMode="contain"
                        style={[styles.iconCurrentPlay]}
                      />
                    : <Image
                        source={Config.ICON_CURRENT_PLAY}
                        resizeMode="contain"
                        style={[styles.iconCurrentPlay]}
                      />}
                </View>
              : <View style={styles.wrapperTextCount}>
                  <Text style={styles.textCount}>
                    {parseInt(index) + 1}
                  </Text>
                </View>}
          <View style={[{ justifyContent: "center", flex: 1 }]}>
            {item.name
              ? <Text
                  style={[styles.titleAudio, { lineHeight: 32 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              : null}
            <Text
              style={[styles.subTitleAudio]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {actors || "Unknown Artist"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { payload, currentItemPlay, currentTime, player } = this.props;
    let data = payload.listAudio.episodes;
    return (
      payload.listAudio.episodes &&
      <View>
        <View style={styles.sectionTitleAudioWrapper}>
          <Text style={styles.sectionTitleAudio}>ALBUM</Text>
        </View>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          currentItemPlay={currentItemPlay}
          currentTime={currentTime}
          paused={player.paused}
        />
      </View>
    );
  }
}
