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
  state = {
    selected: (new Map(): Map<string, boolean>)
  };

  changeLink = (content, index) => {
    const { changeLinkAudio, player } = this.props;

    changeLinkAudio({
      submitted: true,
      linkAudio: content.link,
      audioName: content.name,
      currentItemPlay: index,
      paused: false,
      duration: 0.0,
      currentTime: 0.0,
      isCurrentLive: false
    });
  };

  _keyExtractor = (item, index) => item.objectID;

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
    const { currentItemPlay, currentTime, player, id, submitted } = this.props;
    let rowID = index;
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
          key={rowID}
          onPress={() => {
            console.log(index);
          }}
          style={[styles.row, styles.wrapperRelated]}
        >
          {!submitted
            ? id == item.id
              ? <View style={{ marginRight: 30, width: 35 }}>
                  {console.log(currentTime)}
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
                    {parseInt(rowID) + 1}
                  </Text>
                </View>
            : currentItemPlay == rowID
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
                    {parseInt(rowID) + 1}
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
    const { payload, dataItems } = this.props;
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
        />
      </View>
    );
  }
}
