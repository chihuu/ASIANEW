"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  InteractionManager,
  Modal,
  TextInput
} from "react-native";
import styles from "../styles/Style";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as viewsActions from "../../common/redux/actions/playlist";

const { width, height } = Dimensions.get("window");

export default class ListAllContentPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { receivePlaylist, userInfo, mode, modalVisible } = this.props;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: true, mode: mode });
    });
  }

  addPlaylist(playlistId, contentId) {
    const { receivePlaylistAddContent, userInfo } = this.props;

    if (playlistId > 0 && contentId > 0) {
      receivePlaylistAddContent(userInfo.accessToken, playlistId, contentId);
    }
  }

  displayRowItems = (playlist, index) => {
    const { contentId } = this.props;

    return (
      //playlist.id: id of playlist,
      <TouchableOpacity
        onPress={() =>
          this.addPlaylist(parseInt(playlist.playlist_id), parseInt(contentId))}
        key={index}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={[{ width: 40, height: 40, marginRight: 7 }]}
            source={require("../../../common/images/common/playlistPlay.png")}
          />
          <Text>
            {playlist.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  showMessageAddContent = () => {
    const { modalVisible, onPress, destroyPlaylist } = this.props;
    onPress(modalVisible);

    this.timeout = setTimeout(() => {
      destroyPlaylist();
    }, 4000);
  };

  render() {
    const { listPlaylist, list } = this.props.data;
    const { addContentPlaylist } = list;
    const { loading } = this.state;

    return (
      <View style={{ height: "80%", flexDirection: "row", flex: 1 }}>
        {listPlaylist && listPlaylist.playlists
          ? <ScrollView showsVerticalScrollIndicator={false}>
              {listPlaylist.playlists.length > 0
                ? listPlaylist.playlists.map(this.displayRowItems)
                : null}
            </ScrollView>
          : <View
              style={[
                styles.container,
                styles.waiting,
                { justifyContent: "center", alignItems: "flex-start" }
              ]}
            >
              <ActivityIndicator size="small" color="#000000" />
            </View>}
        {//Show Message Add Content Playlist
        addContentPlaylist &&
          addContentPlaylist.message &&
          this.showMessageAddContent()}
      </View>
    );
  }
}
