import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import styles from "../styles/Style";
import { CachedImage } from "react-native-img-cache";
import { Config } from "../common/config";

let { width, height } = Dimensions.get("window");
let top = width / 16 * 9 + 50;

export default (RowContentPlaylist = props => {
  let arrActors = [];
  let actors = "";
  props.item.actors.map(function(data, value) {
    arrActors.push(data.name);
  });
  actors = arrActors.join(", ");

  return (
    <View style={styles.wrapperPlaylist} key={props.rowID}>
      <TouchableOpacity
        onPress={() =>
          props.listAudio({
            showAudio: true,
            idChild: props.item.id,
            isPlaylist: true,
            contents: props.dataContent,
            currentItemPlay: props.rowID,
            paused: true,
            playlistId: props.playlistId
          })}
        style={[styles.row, { marginLeft: 7, flex: 1 }]}
      >
        <View
          style={[
            styles.wrapperTextCountContentPlaylist,
            { justifyContent: "center" }
          ]}
        >
          <Text style={styles.textCountPlaylist}>
            {parseInt(props.rowID) + 1}
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <CachedImage
            source={{ uri: props.item.image }}
            style={{ width: 30, height: 30, marginRight: 15, borderRadius: 5 }}
            mutate
          />
        </View>
        <View style={[{ justifyContent: "center", flex: 1, flexWrap: "wrap" }]}>
          <Text style={[styles.titleAudioPlaylist, { lineHeight: 22 }]}>
            {props.item.name}
          </Text>
          <Text style={[styles.subTitleAudio]}>
            {actors || "Unknown Artist"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});
